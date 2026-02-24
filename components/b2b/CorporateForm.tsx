"use client";

import { useState, useEffect } from "react";
import { RECAPTCHA_CONFIG, PRIVACY_CONFIG } from "@/lib/config";
import { getRecaptchaToken, loadRecaptchaScript, verifyRecaptchaToken } from "@/lib/recaptcha";

interface FormData {
  nombre: string;
  cargo: string;
  email: string;
  empresa: string;
  aceptaPrivacidad: boolean;
}

export default function CorporateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    cargo: "",
    email: "",
    empresa: "",
    aceptaPrivacidad: false,
  });

  // Cargar reCAPTCHA v3 al montar (PRIV-002)
  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecaptchaError(null);
    
    // Honeypot check - si el campo website está lleno, es spam
    const formElement = e.currentTarget;
    const honeypot = (formElement.querySelector('input[name="website"]') as HTMLInputElement)?.value;
    if (honeypot) {
      return; // Silenciosamente rechazar spam
    }
    
    if (!formData.aceptaPrivacidad) {
      alert("Debe aceptar la política de privacidad para continuar.");
      return;
    }

    setIsSubmitting(true);

    // reCAPTCHA v3 - Obtener token (PRIV-002)
    const recaptchaToken = await getRecaptchaToken(RECAPTCHA_CONFIG.actions.contactB2B);
    
    if (!recaptchaToken) {
      setRecaptchaError("Error de verificación de seguridad. Por favor, intenta de nuevo.");
      setIsSubmitting(false);
      return;
    }

    // Verificar token con backend
    const verification = await verifyRecaptchaToken(recaptchaToken);
    
    if (!verification.success) {
      setRecaptchaError("No se pudo verificar el envío. Por favor, intenta de nuevo.");
      setIsSubmitting(false);
      return;
    }
    
    // Simular envío a paorioseco@gmail.com
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-ink/10 shadow-sm">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-ink mb-2">Solicitud recibida</h3>
          <p className="text-muted text-sm">
            Nuestro equipo evaluará su solicitud y contactará a la brevedad para coordinar el diagnóstico inicial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-ink/10 shadow-sm space-y-5">
      {/* Honeypot - oculto para humanos, visible para bots */}
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
      
      <div className="text-center mb-6">
        <h3 className="font-serif text-xl text-ink mb-2">Solicitar evaluación diagnóstica</h3>
        <p className="text-sm text-muted">
          Complete el formulario para acceder al informe preliminar de riesgo psicosocial
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-ink mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-stone-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Ej: María González"
        />
      </div>

      {/* Cargo */}
      <div>
        <label htmlFor="cargo" className="block text-sm font-medium text-ink mb-2">
          Cargo
        </label>
        <input
          type="text"
          id="cargo"
          name="cargo"
          required
          value={formData.cargo}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-stone-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Ej: Gerente de Personas"
        />
      </div>

      {/* Email Corporativo */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
          Email corporativo
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-stone-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="nombre@empresa.com"
        />
      </div>

      {/* Nombre de Empresa */}
      <div>
        <label htmlFor="empresa" className="block text-sm font-medium text-ink mb-2">
          Nombre de empresa
        </label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          required
          value={formData.empresa}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-ink/10 rounded-xl bg-stone-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Ej: Empresa S.A."
        />
      </div>

      {/* Checkbox Privacidad - Desmarcado por defecto (Ley 21.719) */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="aceptaPrivacidad"
            checked={formData.aceptaPrivacidad}
            onChange={handleChange}
            className="w-5 h-5 mt-0.5 rounded border-ink/20 text-primary focus:ring-primary/20 cursor-pointer"
          />
          <span className="text-xs text-muted leading-relaxed">
            {PRIVACY_CONFIG.fullNotice}
          </span>
        </label>
      </div>

      {/* Error de reCAPTCHA */}
      {recaptchaError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{recaptchaError}</p>
        </div>
      )}

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.aceptaPrivacidad}
        className="w-full px-6 py-4 bg-ink text-white font-sans font-medium rounded-xl hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Procesando..." : "Solicitar diagnóstico inicial"}
      </button>

      <p className="text-xs text-muted/60 text-center">
        Los datos serán tratados con estricta confidencialidad según normativa vigente.
      </p>
    </form>
  );
}
