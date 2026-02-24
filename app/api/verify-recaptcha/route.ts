/**
 * API Route: Verify reCAPTCHA v3 Token
 * PRIV-002: Protección anti-spam para formularios
 */

import { NextRequest, NextResponse } from "next/server";
import { RECAPTCHA_CONFIG } from "@/lib/config";

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token requerido" },
        { status: 400 }
      );
    }

    // Verificar con Google reCAPTCHA API
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_CONFIG.secretKey,
        response: token,
      }),
    });

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "Token inválido", codes: data["error-codes"] },
        { status: 400 }
      );
    }

    // Validar score mínimo
    if (data.score < RECAPTCHA_CONFIG.minScore) {
      return NextResponse.json(
        { success: false, error: "Score demasiado bajo", score: data.score },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      score: data.score,
      action: data.action,
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      { success: false, error: "Error de verificación" },
      { status: 500 }
    );
  }
}
