/**
 * API Route: envío real de formularios de contacto (B2C y B2B).
 *
 * Un solo POST por formulario, con el token de reCAPTCHA incluido:
 *  1. Honeypot server-side (campo `website`): si viene lleno -> spam.
 *  2. Verificación de reCAPTCHA v3 en el servidor (lib/recaptcha).
 *  3. Envío del email vía Resend (lib/resend).
 *
 * Si RESEND_API_KEY no está configurada, responde 503 (nunca simula éxito).
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaServer } from "@/lib/recaptcha";
import {
  isResendConfigured,
  sendContactEmail,
  type ContactData,
  type ContactType,
} from "@/lib/resend";

interface ContactPayload extends ContactData {
  type: ContactType;
  website?: string;
  recaptchaToken?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  const { type, website, recaptchaToken, ...data } = payload;

  // 1. Honeypot: si el campo oculto viene lleno, es un bot.
  //    Respondemos 200 sin enviar nada para no revelar la trampa.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Validación mínima.
  if (type !== "b2c" && type !== "b2b") {
    return NextResponse.json(
      { ok: false, error: "Tipo de formulario inválido." },
      { status: 400 }
    );
  }
  if (!data.nombre || !data.email) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos requeridos." },
      { status: 400 }
    );
  }

  // 2. reCAPTCHA server-side.
  const recaptcha = await verifyRecaptchaServer(recaptchaToken ?? "");
  if (!recaptcha.success) {
    return NextResponse.json(
      { ok: false, error: "No pudimos validar tu envío. Intenta de nuevo." },
      { status: 400 }
    );
  }

  // 3. Sin RESEND_API_KEY: no simular éxito, responder 503.
  if (!isResendConfigured()) {
    console.warn(
      "[Contact] RESEND_API_KEY no configurada; email no enviado (fallback 503)."
    );
    return NextResponse.json(
      { ok: false, error: "El servicio de correo no está disponible ahora." },
      { status: 503 }
    );
  }

  try {
    await sendContactEmail({ type, data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Contact] Error enviando el email:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar tu mensaje." },
      { status: 500 }
    );
  }
}
