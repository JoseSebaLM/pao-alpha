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
 * Verifica el token de reCAPTCHA v3 con el backend
 */
export async function verifyRecaptchaToken(token: string): Promise<{ success: boolean; score: number }> {
  try {
    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    // En caso de error, permitir el envío pero loggear
    return { success: true, score: 0.5 };
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
