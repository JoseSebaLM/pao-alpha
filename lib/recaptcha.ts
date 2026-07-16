/**
 * reCAPTCHA v3 Integration - Paola Rioseco V2.1
 * Implementación invisible para protección anti-spam (PRIV-002)
 */

import { RECAPTCHA_CONFIG } from "./config";

// Type definitions for global grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Verifica un token de reCAPTCHA v3 en el SERVIDOR contra la API de Google.
 *
 * Se ejecuta dentro del POST del formulario (`/api/contact`), no en un
 * endpoint aparte: el cliente ya NO llama a `/api/verify-recaptcha` por su
 * cuenta (un solo POST con el token incluido).
 *
 * Si `RECAPTCHA_SECRET_KEY` no está configurada (o quedó con el placeholder
 * por defecto), la verificación se OMITE con una advertencia para no bloquear
 * el desarrollo local. En producción, con la clave real, la validación es
 * estricta (score mínimo).
 */
const RECAPTCHA_SECRET_PLACEHOLDER = "your_recaptcha_secret_key_here";

export async function verifyRecaptchaServer(
  token: string
): Promise<{ success: boolean; score: number; skipped?: boolean }> {
  const secret = RECAPTCHA_CONFIG.secretKey;

  if (!secret || secret === RECAPTCHA_SECRET_PLACEHOLDER) {
    console.warn(
      "[reCAPTCHA] RECAPTCHA_SECRET_KEY no configurada; se omite la verificación (solo apto para desarrollo)."
    );
    return { success: true, score: 0, skipped: true };
  }

  if (!token) {
    return { success: false, score: 0 };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });

    const data: { success: boolean; score?: number } = await response.json();
    const score = data.score ?? 0;

    return {
      success: data.success === true && score >= RECAPTCHA_CONFIG.minScore,
      score,
    };
  } catch (error) {
    console.error("[reCAPTCHA] Error verificando el token:", error);
    return { success: false, score: 0 };
  }
}

/**
 * Obtiene el token de reCAPTCHA v3
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded");
      resolve(null);
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(RECAPTCHA_CONFIG.siteKey, { action });
        resolve(token);
      } catch (error) {
        console.error("reCAPTCHA execute error:", error);
        resolve(null);
      }
    });
  });
}

/**
 * Script loader para reCAPTCHA v3
 */
export function loadRecaptchaScript(): void {
  if (typeof document === "undefined") return;
  
  // Evitar duplicados
  if (document.querySelector('script[src*="recaptcha/api.js"]')) return;

  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_CONFIG.siteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
