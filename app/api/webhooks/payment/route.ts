import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPayment, isMercadoPagoConfigured } from "@/lib/mercadopago";
import { ALL_SERVICES } from "@/lib/services";
import { isResendConfigured, sendPaymentApprovedEmail } from "@/lib/resend";

/**
 * Webhook de notificaciones de Mercado Pago.
 *
 * Mandato SEC-001: validación de firma obligatoria (HMAC-SHA256, timing-safe).
 * Mandato SEC-002: nunca loggear el payload completo ni datos personales.
 *
 * Validación de origen según la doc oficial de MP (Tus integraciones >
 * Notificaciones > Webhooks > "Validar origen de una notificación"):
 *
 *  - Header `x-signature`: `ts=<millis>,v1=<hmac-hex>`.
 *  - Manifest firmado: `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`
 *    (con punto y coma final).
 *  - `data.id` sale de los QUERY PARAMS de la URL, no del body.
 *  - Si `data.id` viene alfanumérico en mayúsculas, va en minúsculas.
 *  - Si falta `data.id` o `x-request-id`, se remueve ese segmento del manifest.
 *  - HMAC-SHA256 en hexadecimal, con MP_WEBHOOK_SECRET como clave.
 *
 * MP espera 200/201 dentro de 22s y reintenta ante cualquier otra respuesta.
 */

interface MercadoPagoNotification {
  type?: string;
  action?: string;
  data?: { id?: string };
}

/** Extrae ts y v1 del header `x-signature` (`ts=...,v1=...`). */
function parseSignature(header: string): { ts?: string; v1?: string } {
  const parts: { ts?: string; v1?: string } = {};
  for (const chunk of header.split(",")) {
    const [rawKey, ...rest] = chunk.split("=");
    const key = rawKey?.trim();
    const value = rest.join("=").trim();
    if (key === "ts") parts.ts = value;
    if (key === "v1") parts.v1 = value;
  }
  return parts;
}

/**
 * Arma el manifest tal como lo firma MP. Cada segmento lleva su propio `;`, y
 * los ausentes se omiten completos (no se dejan vacíos): firmar un segmento que
 * MP no firmó haría fallar la comparación.
 */
function buildManifest({
  dataId,
  requestId,
  ts,
}: {
  dataId?: string;
  requestId?: string;
  ts: string;
}): string {
  let manifest = "";
  if (dataId) manifest += `id:${dataId};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;
  return manifest;
}

/** Compara en tiempo constante dos firmas hex del mismo largo. */
function signatureMatches(expected: string, received: string): boolean {
  // timingSafeEqual lanza si los largos difieren: se descarta antes de comparar.
  // El largo de una firma no es un secreto, así que no filtra nada útil.
  if (expected.length !== received.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(received, "hex")
    );
  } catch {
    // `received` no era hexadecimal válido.
    return false;
  }
}

/** Recupera el servicio a partir del external_reference (`<slug>-<uuid>`). */
function serviceFromExternalReference(externalReference: string) {
  return ALL_SERVICES.find((service) =>
    externalReference.startsWith(`${service.slug}-`)
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const signatureHeader = request.headers.get("x-signature");

  if (!signatureHeader) {
    // SEC-002: solo el estado de validación, nunca el payload.
    console.log("[Webhook Payment] Firma inválida: header x-signature ausente");
    return NextResponse.json({ error: "Firma no proporcionada" }, { status: 401 });
  }

  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    console.warn(
      "[Webhook Payment] MP_WEBHOOK_SECRET no configurada; notificación no procesada (fallback 503)."
    );
    // 503 y no 500: MP reintenta, así que la notificación se recupera sola
    // cuando el operador cargue el secreto.
    return NextResponse.json(
      { error: "Webhook no disponible" },
      { status: 503 }
    );
  }

  const { ts, v1 } = parseSignature(signatureHeader);
  if (!ts || !v1) {
    console.log("[Webhook Payment] Firma inválida: x-signature mal formado");
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  // data.id viene en los query params; MP lo firma en minúsculas cuando es
  // alfanumérico (ej: ORD01... -> ord01...). Para ids numéricos es un no-op.
  const dataId =
    request.nextUrl.searchParams.get("data.id")?.toLowerCase() || undefined;
  const requestId = request.headers.get("x-request-id") || undefined;

  const manifest = buildManifest({ dataId, requestId, ts });
  const expected = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  if (!signatureMatches(expected, v1)) {
    console.log("[Webhook Payment] Firma inválida: verificación HMAC fallida");
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  // Firma válida a partir de aquí. Todo lo que siga responde 200: MP reintenta
  // ante no-200 y no queremos reintentos por errores nuestros de proceso.
  let notification: MercadoPagoNotification;
  try {
    notification = (await request.json()) as MercadoPagoNotification;
  } catch {
    console.log("[Webhook Payment] Firma válida pero body ilegible");
    return NextResponse.json({ received: true });
  }

  const isPayment =
    notification.type === "payment" ||
    notification.action?.startsWith("payment.");

  if (!isPayment) {
    console.log(`[Webhook Payment] Notificación ignorada (type=${notification.type})`);
    return NextResponse.json({ received: true });
  }

  const paymentId = notification.data?.id || dataId;
  if (!paymentId) {
    console.log("[Webhook Payment] Notificación de pago sin id");
    return NextResponse.json({ received: true });
  }

  if (!isMercadoPagoConfigured()) {
    console.warn(
      "[Webhook Payment] MP_ACCESS_TOKEN no configurada; no se pudo consultar el pago."
    );
    return NextResponse.json({ received: true });
  }

  try {
    // El estado real se confirma contra la API: el body de la notificación solo
    // trae el id y no es fuente de verdad del status.
    const payment = await getPayment(String(paymentId));

    if (payment.status !== "approved") {
      console.log(`[Payment] ${payment.status} ${payment.external_reference ?? "sin-referencia"}`);
      return NextResponse.json({ received: true });
    }

    const externalReference = payment.external_reference ?? "";
    console.log(`[Payment] approved ${externalReference || "sin-referencia"}`);

    if (!isResendConfigured()) {
      console.warn(
        "[Webhook Payment] RESEND_API_KEY no configurada; aviso de pago no enviado."
      );
      return NextResponse.json({ received: true });
    }

    const service = serviceFromExternalReference(externalReference);
    const payerName =
      [payment.payer?.first_name, payment.payer?.last_name]
        .filter(Boolean)
        .join(" ") || "No informado";

    await sendPaymentApprovedEmail({
      serviceName: service?.name ?? externalReference ?? "Servicio no identificado",
      amountLabel:
        payment.transaction_amount != null
          ? `$${payment.transaction_amount.toLocaleString("es-CL")} CLP`
          : "No informado",
      payerName,
      payerEmail: payment.payer?.email,
      externalReference: externalReference || "sin-referencia",
      paymentId: String(payment.id),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    // SEC-002: solo el tipo de error, nunca datos del pago ni del pagador.
    console.error(
      "[Webhook Payment] Error procesando el pago:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    // 200 igual: la firma era válida y un reintento de MP repetiría el fallo.
    return NextResponse.json({ received: true });
  }
}

/**
 * Manejador para métodos no soportados
 */
export async function GET() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
}
