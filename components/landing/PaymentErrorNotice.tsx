"use client";

import { useSearchParams } from "next/navigation";

/**
 * Banner discreto cuando Mercado Pago devuelve al usuario con `?pago=error`
 * (back_urls.failure de la preferencia).
 *
 * Es client component a propósito: leer el query param en el servidor volvería
 * dinámicas las 3 landings, que hoy se prerenderizan (SSG). Debe montarse
 * dentro de un <Suspense> para que la página siga siendo estática.
 */
export default function PaymentErrorNotice() {
  const searchParams = useSearchParams();

  if (searchParams.get("pago") !== "error") return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6">
      <p
        role="status"
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
      >
        El pago no se completó. Puedes intentarlo de nuevo.
      </p>
    </div>
  );
}
