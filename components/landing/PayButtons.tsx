"use client";

import { useState } from "react";
import { WHATSAPP_CONFIG } from "@/lib/config";
import type { ServiceSlug } from "@/lib/services";
import { track } from "@/components/analytics/MetaPixel";

type WhatsappContext = "workshop" | "mentoring" | "tarot";

interface PayButtonsProps {
  slug: ServiceSlug;
  /** true solo cuando hay MP_ACCESS_TOKEN y priceCLP > 0 (se resuelve en el servidor). */
  paymentEnabled: boolean;
  priceCLP: number;
  whatsappContext: WhatsappContext;
  /** Clases de color completas del botón (Tailwind no admite clases dinámicas). */
  buttonClass: string;
}

export default function PayButtons({
  slug,
  paymentEnabled,
  priceCLP,
  whatsappContext,
  buttonClass,
}: PayButtonsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const whatsappHref = WHATSAPP_CONFIG.getLinkWithText(whatsappContext);
  const baseClass = `inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-white font-sans font-medium rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${buttonClass}`;

  // Modo WhatsApp: mientras no exista MP_ACCESS_TOKEN o el servicio no tenga
  // precio publicado. El flujo de pago (abajo) queda implementado pero no se
  // renderiza hasta que el operador active Mercado Pago.
  if (!paymentEnabled) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        Consultar por WhatsApp
      </a>
    );
  }

  // --- Modo pago Mercado Pago (se activa cuando paymentEnabled === true) ---
  const handlePay = async () => {
    setLoading(true);
    setError(false);

    // Se dispara al inicio, no junto al redirect: el beacon del Pixel necesita
    // alcanzar a salir antes de que la navegación descargue la página, y el
    // round-trip del POST le da ese margen.
    track("InitiateCheckout", {
      content_ids: [slug],
      content_type: "product",
      value: priceCLP,
      currency: "CLP",
    });

    try {
      const res = await fetch(`/api/checkout/${slug}`, { method: "POST" });
      if (!res.ok) throw new Error("checkout-failed");
      const { initPoint } = await res.json();
      if (!initPoint) throw new Error("no-init-point");
      window.location.href = initPoint;
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className={baseClass}
      >
        {loading ? "Redirigiendo…" : "Pagar y agendar"}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">
          No pudimos iniciar el pago. Intenta de nuevo o{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            escríbenos por WhatsApp
          </a>
          .
        </p>
      )}
    </div>
  );
}
