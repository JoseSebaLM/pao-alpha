"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Honeypot check - si el campo website está lleno, es spam
    if (formData.get("website")) {
      return;
    }

    // Simular envío (aquí se integraría con el servicio de email)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
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

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-ink text-white font-sans font-medium rounded-xl hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>

    </form>
  );
}
