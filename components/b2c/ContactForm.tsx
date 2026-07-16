"use client";

import { useState, useEffect } from "react";
import { RECAPTCHA_CONFIG, WHATSAPP_CONFIG } from "@/lib/config";
import { getRecaptchaToken, loadRecaptchaScript } from "@/lib/recaptcha";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Cargar reCAPTCHA v3 al montar (PRIV-002)
  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);

    // reCAPTCHA v3 - Obtener token (la verificación ocurre en el servidor)
    const recaptchaToken = await getRecaptchaToken(RECAPTCHA_CONFIG.actions.contactB2C);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "b2c",
          nombre: formData.get("nombre"),
          email: formData.get("email"),
          telefono: formData.get("telefono"),
          website: formData.get("website"), // honeypot, validado en el servidor
          recaptchaToken,
        }),
      });

      const result = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !result.ok) {
        throw new Error("send-failed");
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "No pudimos enviar tu mensaje. Escríbenos por WhatsApp e intentamos por ahí."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-ink mb-2">Mensaje enviado</h3>
        <p className="text-muted text-sm">Me pondré en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo Honeypot - oculto para humanos, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-ink mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="tu@email.com"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-ink mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="+569 XXXX XXXX"
        />
      </div>

      {/* Error de envío */}
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">
            {submitError}{" "}
            <a
              href={WHATSAPP_CONFIG.getLinkWithText("default")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-red-700"
            >
              Abrir WhatsApp
            </a>
          </p>
        </div>
      )}

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-ink text-white font-sans font-medium rounded-xl hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>

      {/* Disclaimer Ley 21.719 */}
      <p className="text-xs text-muted/60 text-center">
        Al enviar, aceptas el tratamiento de tus datos conforme a la Ley 21.719 de Protección de Datos Personales.
      </p>
    </form>
  );
}
