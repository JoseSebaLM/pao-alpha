/**
 * Cliente de email (Resend) + templates de contacto - Paola Rioseco
 *
 * El envío real de los formularios (B2C contacto / B2B corporativo) pasa por
 * aquí. Si `RESEND_API_KEY` no está definida, `isResendConfigured()` devuelve
 * false y el endpoint responde 503 (nunca se simula éxito).
 */

import { Resend } from "resend";
import { EMAIL_CONFIG } from "./config";

export type ContactType = "b2c" | "b2b";

export interface ContactData {
  nombre: string;
  email: string;
  telefono?: string;
  cargo?: string;
  empresa?: string;
  mensaje?: string;
}

/** true si hay API key de Resend disponible en el entorno. */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Remitente. Con dominio sin verificar, Resend solo permite el sandbox
 * `onboarding@resend.dev` (que envía únicamente al email de la cuenta).
 * TODO(operador): definir RESEND_FROM_EMAIL con un dominio verificado
 * (ej: "Paola Rioseco <no-reply@paolarioseco.com>").
 */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Paola Rioseco <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;color:#1C1917;vertical-align:top;">${escapeHtml(
      label
    )}</td>
    <td style="padding:6px 12px;color:#44403c;">${escapeHtml(value)}</td>
  </tr>`;
}

function renderTemplate(type: ContactType, data: ContactData): string {
  const title =
    type === "b2b"
      ? "Nueva solicitud de diagnóstico corporativo"
      : "Nuevo mensaje de contacto";

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#FDFCF8;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <h1 style="font-size:18px;color:#C01D65;margin:0 0 16px;">${escapeHtml(
        title
      )}</h1>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #eee;border-radius:8px;">
        ${row("Nombre", data.nombre)}
        ${row("Email", data.email)}
        ${row("Teléfono", data.telefono)}
        ${row("Cargo", data.cargo)}
        ${row("Empresa", data.empresa)}
        ${row("Mensaje", data.mensaje)}
      </table>
      <p style="font-size:12px;color:#a8a29e;margin-top:16px;">
        Enviado desde el formulario de paolarioseco.com — puedes responder
        directamente a este correo para contactar a la persona.
      </p>
    </div>
  </body>
</html>`;
}

/**
 * Envía el email de contacto a la casilla configurada en EMAIL_CONFIG,
 * con reply-to del remitente para poder responder directo.
 * Lanza si Resend no está configurado o si la API devuelve error.
 */
export async function sendContactEmail({
  type,
  data,
}: {
  type: ContactType;
  data: ContactData;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const resend = new Resend(apiKey);
  const subject =
    type === "b2b"
      ? `Solicitud corporativa · ${data.empresa || data.nombre}`
      : `Contacto web · ${data.nombre}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: EMAIL_CONFIG[type],
    replyTo: data.email,
    subject,
    html: renderTemplate(type, data),
  });

  if (error) {
    throw new Error(error.message || "Error enviando el email");
  }
}

export interface PaymentNotification {
  serviceName: string;
  amountLabel: string;
  payerName: string;
  payerEmail?: string;
  externalReference: string;
  paymentId: string;
}

/**
 * Avisa a Paola de un pago aprobado (lo dispara el webhook de Mercado Pago).
 * Lanza si Resend no está configurado o si la API devuelve error.
 */
export async function sendPaymentApprovedEmail(
  payment: PaymentNotification
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const resend = new Resend(apiKey);

  const html = `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#FDFCF8;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <h1 style="font-size:18px;color:#C01D65;margin:0 0 16px;">Pago aprobado</h1>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #eee;border-radius:8px;">
        ${row("Servicio", payment.serviceName)}
        ${row("Monto", payment.amountLabel)}
        ${row("Pagador", payment.payerName)}
        ${row("Email", payment.payerEmail)}
        ${row("Referencia", payment.externalReference)}
        ${row("ID de pago", payment.paymentId)}
      </table>
      <p style="font-size:12px;color:#a8a29e;margin-top:16px;">
        Notificación automática de Mercado Pago recibida en paolarioseco.com.
      </p>
    </div>
  </body>
</html>`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: EMAIL_CONFIG.b2c,
    subject: `Pago aprobado · ${payment.serviceName} · ${payment.amountLabel}`,
    html,
  });

  if (error) {
    throw new Error(error.message || "Error enviando el email de pago");
  }
}
