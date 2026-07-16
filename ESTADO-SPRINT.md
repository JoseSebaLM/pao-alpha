# ESTADO DEL SPRINT — pao-alpha (traspaso)

> Documento de traspaso para la próxima sesión (que arranca **sin** el contexto
> de las anteriores). Fuente de verdad del plan: `BRIEF-CLAUDE-CODE.md` (v2) +
> `AUDITORIA-V2.md`. Última actualización: 16 jul 2026.

## Cómo trabajar en este repo (imprescindible)

- **Deploy:** push a `main` → build automático en Cloudflare Workers (OpenNext).
- **Tres checks antes de cada push**, siempre limpios:
  1. `npm run lint` (baseline: **1 error preexistente** en `scripts/test-hmac.js`
     + 3 warnings preexistentes; ver más abajo — nada de eso es nuestro).
  2. `npm run build`.
  3. `npx opennextjs-cloudflare build` (es lo que corre Cloudflare; puede fallar
     donde `next build` no).
- **Lock de OneDrive:** a veces `.next` da `EPERM: unlink`. Solución: `rm -rf .next .open-next`
  y reintentar. No es un error de código.
- Convenciones: UI/contenido en español, código en inglés. Server components por
  defecto; `"use client"` solo con interactividad. Commits `feat/fix(fase-N): ...`.
  Nunca commitear secretos.

## Commits del sprint (orden cronológico)

| Commit | Qué hizo |
|---|---|
| `d4f30a5` | `lib/services.ts`: fuente única de servicios (workshop/mentoring/tarot) + `getService`/`ALL_SERVICES`. |
| `adee028` | Fix 5 bugs 0.3: header/main (root layout solo body; Header+main a `(b2c)`; not-found monta Header), elimina `quien-soy/layout.tsx` (FloatingWhatsApp duplicado), quita link roto y fecha vencida en /servicios, agrega Servicios al nav. |
| `f1110d9` | Formularios reales con Resend: `lib/resend.ts`, `app/api/contact/route.ts` (honeypot + reCAPTCHA server-side, 503 sin `RESEND_API_KEY`), ContactForm/CorporateForm con fetch real + fallback WhatsApp, `.env.example`. |
| `4a8e82f` | `calLink` de mentoring/tarot a `null` (Cal.com no existe aún) + crea `BACKLOG.md`. |
| `1a7fd2c` | Nav B2C definitiva (Inicio\|Servicios\|Personas\|Quién soy, CTA "Agendar"→/servicios) + reescritura del índice /servicios (hero + 3 tarjetas desde SERVICES + "Para quién NO es esto" 2 líneas) + eslint ignora `.open-next`. |
| `9ca994f` | 3 landings `/servicios/[slug]` (hero, qué incluye, precio+PayButtons, 2 testimonios, FAQ, cierre) + componentes `landing/*` + `lib/testimonials.ts`. PayButtons en modo WhatsApp. |
| `bc26ed0` | Meta Pixel base env-gated + `track()` + `ViewContentTracker` en landings. |
| `e50d4f0` | Página `/gracias/[slug]` (cupo reservado / `?estado=pendiente`, noindex, PurchaseTracker con guard sessionStorage) + `CalEmbed` (iframe, detrás de `calLink!==null`). |
| `eb2694d` | `app/sitemap.ts` + `app/robots.ts` (disallow `/gracias`). |
| _(hoy)_ | Evento `Lead` (b2c/b2b) en el éxito de ambos formularios + banner de consentimiento (Ley 21.719, carga diferida del Pixel tras "Aceptar") + este `ESTADO-SPRINT.md`. |

## Qué está en producción (funcionando)

- **Fase 0 completa:** bugs corregidos, formularios con envío real (a la espera de
  `RESEND_API_KEY`; hoy responden 503 sin simular éxito).
- **Fase 1.1 + 1.4 + 1.5:** nav B2C, índice /servicios, 3 landings, página /gracias.
- **PayButtons en modo WhatsApp:** como no hay `MP_ACCESS_TOKEN` y mentoring/tarot
  tienen `priceCLP: 0`, el CTA primario es "Consultar por WhatsApp". El botón de
  pago MP está implementado pero **no se renderiza** (`paymentEnabled === false`).
- **Fase 2.1 (parcial):** Pixel base env-gated + consentimiento + eventos
  `ViewContent` (landings), `Purchase` (/gracias), `Lead` (formularios).
- **Fase 2.3:** sitemap + robots.

## Qué falta EXACTAMENTE

### Fase 1.2 — Checkout Mercado Pago (NO empezado)
- Crear `app/api/checkout/[slug]/route.ts` (POST). Valida slug contra `SERVICES`;
  rechaza si `priceCLP === 0` (409). Crea preferencia y responde `{ initPoint }`.
- **Decisión ya tomada en el brief:** usar **fetch directo a la API REST de MP**
  (`POST https://api.mercadopago.com/checkout/preferences` con Bearer
  `MP_ACCESS_TOKEN`), NO el SDK — para evitar problemas de compatibilidad en el
  runtime de Workers. Payload (items CLP, back_urls a `/gracias/[slug]`,
  `auto_return: "approved"`, `external_reference`, `notification_url`) está
  especificado en `BRIEF-CLAUDE-CODE.md` §1.2.
- `PayButtons` YA hace `POST /api/checkout/${slug}` y redirige a `initPoint`; solo
  falta crear el endpoint. Se activa solo cuando exista `MP_ACCESS_TOKEN` y
  `priceCLP > 0` (lógica `paymentEnabled` ya está en la landing).

### Fase 1.3 — Webhook MP (NO empezado)
- Adaptar `app/api/webhooks/payment/route.ts` (hoy tiene HMAC genérico que NO
  corresponde a MP). Reemplazar por validación oficial de MP: header `x-signature`
  (`ts=...,v1=...`) + `x-request-id`; manifest `id:...;request-id:...;ts:...` con
  HMAC-SHA256 y `MP_WEBHOOK_SECRET`. **Consultar doc oficial de MP para el string
  exacto del manifest.** Usar `timingSafeEqual`; nunca loggear payload completo.
  Al recibir `payment` aprobado, consultar `GET /v1/payments/{id}` y enviar email a
  Paola vía Resend. `scripts/test-hmac.js` queda obsoleto tras esto (ver BACKLOG).

### InitiateCheckout — PENDIENTE (precisión pedida)
- **NO está implementado.** `PayButtons.handlePay()` hace el POST y el
  `window.location.href = initPoint`, pero **no llama `track("InitiateCheckout", ...)`**
  antes del redirect. Falta agregarlo en `handlePay` (params: `content_ids:[slug]`,
  `content_type:"product"`, `value:priceCLP`, `currency:"CLP"`). Como el botón MP
  no se renderiza aún, no es urgente, pero está pendiente.

### Otros pendientes de fases posteriores
- Fase 2.2: dieta de contenido en /personas y /quien-soy; optimizar `pao-1.png`
  (1,7 MB) a WebP/JPEG ≤250 KB; incorporar `paola.jpg` en /quien-soy.
- Fase 2.3: falta OG global + OG por landing; metadata única en /personas.
- Fase 3: QA end-to-end (compra real, `wrangler tail`, Test Events).

## TODO(operador) vigentes

Todos en `lib/services.ts` salvo Resend/Pixel:
- **Precios** de mentoring y tarot (hoy `priceCLP: 0` + `"Consultar"`).
- **Fecha del workshop** (campo `nextDate`, hoy `undefined`).
- **calLinks** de los 3 servicios (hoy `null`; la cuenta Cal.com no existe).
- **`RESEND_API_KEY`** (+ `RESEND_FROM_EMAIL` con dominio verificado) → sin ella,
  `/api/contact` responde 503.
- **`NEXT_PUBLIC_META_PIXEL_ID`** → sin ella el Pixel/banner no renderizan.
- Para activar pagos: **`MP_ACCESS_TOKEN`**, **`MP_WEBHOOK_SECRET`**,
  **`NEXT_PUBLIC_SITE_URL`**, opcional `NEXT_PUBLIC_GLOBAL66_LINK`.
- Aprobación final de copy de las landings (recortes actuales son base provisional).

## Decisiones técnicas tomadas

- **Token de color `espiritu` SIN acento** (`--color-espiritu` en globals.css). El
  brief escribía `"espíritu"` con acento, que genera clases Tailwind rotas. El tipo
  `Service.color` y las clases usan `espiritu`.
- **Cal.com vía iframe** (`components/booking/CalEmbed.tsx`), no `@calcom/embed-react`,
  para no sumar dependencia pesada al Worker. Migrable a embed JS inline si hace falta.
- **`.open-next/**` agregado a los ignores de ESLint** (`eslint.config.mjs`): el
  bundle generado por el adaptador de Cloudflare no debe lintearse (si no, `npm run lint`
  reporta miles de falsos positivos tras correr `opennextjs-cloudflare build`).
- **Fallback 503 en `/api/contact`**: sin `RESEND_API_KEY` se responde 503 y se
  loggea advertencia; nunca se simula éxito.
- **reCAPTCHA server-side** en un solo POST; si `RECAPTCHA_SECRET_KEY` es el
  placeholder, la verificación se omite (solo dev).
- **Consentimiento del Pixel por carga diferida** (no `fbq('consent')`): el snippet
  solo se inyecta tras "Aceptar".

## Estado de lint (baseline, NO tocar)

- 1 error: `scripts/test-hmac.js` (`require()` prohibido) — obsoleto, se elimina con
  Fase 1.3 (anotado en `BACKLOG.md`).
- 3 warnings: `WHATSAPP_CONFIG` sin usar en 2 páginas B2B + `<img>` en `ConceptCard.tsx`.
- Todo eso es **preexistente**; nuestro código no agrega issues.
