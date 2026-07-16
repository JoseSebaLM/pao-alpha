/**
 * API Route: crea la preferencia de Mercado Pago de un servicio (Checkout Pro).
 *
 * `PayButtons` hace POST aquí y redirige al `initPoint` que devuelve.
 *
 * Estados de "dormido" (el funnel se activa solo con credenciales):
 *  - Sin MP_ACCESS_TOKEN o sin NEXT_PUBLIC_SITE_URL -> 503.
 *  - Servicio sin precio publicado (priceCLP === 0)  -> 409.
 *  - Slug inexistente                                -> 404.
 */

import { NextResponse } from "next/server";
import { getService } from "@/lib/services";
import { createPreference, isMercadoPagoConfigured } from "@/lib/mercadopago";

interface CheckoutRouteProps {
  params: Promise<{ slug: string }>;
}

export async function POST(
  _request: Request,
  { params }: CheckoutRouteProps
): Promise<NextResponse> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return NextResponse.json(
      { error: "Servicio no encontrado." },
      { status: 404 }
    );
  }

  // Mentoring y tarot siguen en priceCLP: 0 ("Consultar") hasta que el operador
  // confirme precios: no se puede cobrar un servicio sin precio publicado.
  if (service.priceCLP <= 0) {
    return NextResponse.json(
      { error: "Este servicio todavía no tiene precio publicado." },
      { status: 409 }
    );
  }

  if (!isMercadoPagoConfigured()) {
    console.warn(
      "[Checkout] MP_ACCESS_TOKEN no configurada; preferencia no creada (fallback 503)."
    );
    return NextResponse.json(
      { error: "El pago no está disponible ahora." },
      { status: 503 }
    );
  }

  // Las back_urls y notification_url deben ser absolutas: sin base no tiene
  // sentido crear la preferencia (MP la rechazaría con auto_return).
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    console.warn(
      "[Checkout] NEXT_PUBLIC_SITE_URL no configurada; preferencia no creada (fallback 503)."
    );
    return NextResponse.json(
      { error: "El pago no está disponible ahora." },
      { status: 503 }
    );
  }

  const externalReference = `${service.slug}-${crypto.randomUUID()}`;

  try {
    const { initPoint } = await createPreference({
      service,
      baseUrl,
      externalReference,
    });

    console.log(`[Checkout] Preferencia creada ${externalReference}`);
    return NextResponse.json({ initPoint });
  } catch (error) {
    console.error(
      "[Checkout] Error creando la preferencia:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return NextResponse.json(
      { error: "No pudimos iniciar el pago." },
      { status: 502 }
    );
  }
}
