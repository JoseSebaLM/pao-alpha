/**
 * Cliente de Mercado Pago (API REST) - Paola Rioseco
 *
 * Se usa `fetch` directo contra la API REST en vez del SDK oficial: son dos
 * llamadas simples con Bearer token y el SDK arrastra dependencias de Node que
 * no son fiables en el runtime de Workers.
 *
 * Sin `MP_ACCESS_TOKEN` el funnel de pago queda dormido: la landing no
 * renderiza el botón (`paymentEnabled`) y el endpoint responde 503.
 */

import type { Service } from "./services";

const MP_API_BASE = "https://api.mercadopago.com";

/** true si hay access token de Mercado Pago disponible en el entorno. */
export function isMercadoPagoConfigured(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

function accessToken(): string {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    throw new Error("MP_ACCESS_TOKEN no configurada");
  }
  return token;
}

interface PreferenceResponse {
  id: string;
  init_point?: string;
  sandbox_init_point?: string;
}

/**
 * Crea una preferencia de Checkout Pro y devuelve el punto de inicio.
 *
 * `init_point` es el checkout real; con credenciales de prueba MP puede
 * entregar solo `sandbox_init_point`, por eso el fallback (necesario para el
 * QA en sandbox de la Fase 3).
 */
export async function createPreference({
  service,
  baseUrl,
  externalReference,
}: {
  service: Service;
  baseUrl: string;
  externalReference: string;
}): Promise<{ initPoint: string; preferenceId: string }> {
  const payload = {
    items: [
      {
        id: service.slug,
        title: service.name,
        quantity: 1,
        unit_price: service.priceCLP,
        currency_id: "CLP",
      },
    ],
    back_urls: {
      success: `${baseUrl}/gracias/${service.slug}`,
      failure: `${baseUrl}/servicios/${service.slug}?pago=error`,
      pending: `${baseUrl}/gracias/${service.slug}?estado=pendiente`,
    },
    auto_return: "approved",
    external_reference: externalReference,
    notification_url: `${baseUrl}/api/webhooks/payment`,
    statement_descriptor: "PAOLA RIOSECO",
  };

  const res = await fetch(`${MP_API_BASE}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // El cuerpo de error de MP trae el motivo (ej: back_urls inválidas) y no
    // contiene datos del pagador: es seguro y útil loggearlo.
    const detail = await res.text();
    throw new Error(
      `Mercado Pago respondió ${res.status} al crear la preferencia: ${detail}`
    );
  }

  const preference = (await res.json()) as PreferenceResponse;
  const initPoint = preference.init_point || preference.sandbox_init_point;

  if (!initPoint) {
    throw new Error("La preferencia de Mercado Pago no trae init_point");
  }

  return { initPoint, preferenceId: preference.id };
}

export interface MercadoPagoPayment {
  id: number;
  status: string;
  external_reference?: string | null;
  transaction_amount?: number;
  payer?: {
    email?: string;
    first_name?: string | null;
    last_name?: string | null;
  };
}

/**
 * Consulta un pago por id. El webhook solo recibe el id en la notificación:
 * el estado real siempre se confirma contra la API, nunca se confía en el body.
 */
export async function getPayment(
  paymentId: string
): Promise<MercadoPagoPayment> {
  const res = await fetch(`${MP_API_BASE}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
  });

  if (!res.ok) {
    throw new Error(`Mercado Pago respondió ${res.status} al consultar el pago`);
  }

  return (await res.json()) as MercadoPagoPayment;
}
