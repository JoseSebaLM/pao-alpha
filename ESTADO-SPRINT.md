# ESTADO DEL SPRINT — pao-alpha (traspaso)

> Documento de traspaso para la próxima sesión (que arranca **sin** el contexto
> de las anteriores). Fuente de verdad del plan: `BRIEF-CLAUDE-CODE.md` (v2) +
> `AUDITORIA-V2.md`. Última actualización: 16 jul 2026.

## Cómo trabajar en este repo (imprescindible)

- **Deploy:** push a `main` → build automático en Cloudflare Workers (OpenNext).
- **Tres checks antes de cada push**, siempre limpios:
  1. `npm run lint` (baseline actual: **0 errores** + 3 warnings preexistentes;
     ver más abajo — nada de eso es nuestro).
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
| `88ccd42` | Evento `Lead` (b2c/b2b) en el éxito de ambos formularios + banner de consentimiento (Ley 21.719, carga diferida del Pixel tras "Aceptar") + este `ESTADO-SPRINT.md`. |
| `72d7166` | Evento `InitiateCheckout` en `PayButtons.handlePay()` (`priceCLP` baja por props desde PriceBlock y el CTA de cierre). |
| `ef4affc` | Fase 1.2: `lib/mercadopago.ts` (fetch a la API REST) + `app/api/checkout/[slug]/route.ts` + `PaymentErrorNotice` (`?pago=error`). |
| `e43b945` | Fase 1.3: webhook con la validación oficial de firma de MP + email de pago aprobado a Paola vía Resend; elimina `scripts/test-hmac.js`. |

## Qué está en producción (funcionando)

- **Fase 0 completa:** bugs corregidos, formularios con envío real (a la espera de
  `RESEND_API_KEY`; hoy responden 503 sin simular éxito).
- **Fase 1.1 + 1.4 + 1.5:** nav B2C, índice /servicios, 3 landings, página /gracias.
- **PayButtons en modo WhatsApp:** como no hay `MP_ACCESS_TOKEN` y mentoring/tarot
  tienen `priceCLP: 0`, el CTA primario es "Consultar por WhatsApp". El botón de
  pago MP está implementado pero **no se renderiza** (`paymentEnabled === false`).
- **Fase 1.2 + 1.3:** checkout MP y webhook implementados pero **dormidos** (sin
  credenciales responden 503; ver tabla más abajo). No cambian nada visible hoy.
- **Fase 2.1 (parcial):** Pixel base env-gated + consentimiento + eventos
  `ViewContent` (landings), `InitiateCheckout` (PayButtons), `Purchase` (/gracias),
  `Lead` (formularios). Los 5 eventos del brief están implementados.
- **Fase 2.3:** sitemap + robots.

## Qué falta EXACTAMENTE

### Fase 1 — COMPLETA en código, dormida sin credenciales
El funnel de pago está implementado de punta a punta. Lo único que falta para
activarlo son las credenciales (ver TODO(operador)). Estados sin ellas:

| Situación | Respuesta |
|---|---|
| Sin `MP_ACCESS_TOKEN` o sin `NEXT_PUBLIC_SITE_URL` | `/api/checkout/[slug]` → 503 |
| Servicio con `priceCLP: 0` (mentoring/tarot) | `/api/checkout/[slug]` → 409 |
| Sin `MP_WEBHOOK_SECRET` | `/api/webhooks/payment` → 503 (MP reintenta, no se pierde) |
| Sin `RESEND_API_KEY` | el webhook loggea el pago pero no manda el email |

**Lo que NO se pudo verificar sin credenciales** (queda para el QA de Fase 3):
que MP acepte la forma del payload de la preferencia, y una firma real emitida
por MP (la validación se probó con firmas generadas según el spec de la doc).

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
- Para activar pagos (el código ya está listo, solo faltan estas):
  - **`MP_ACCESS_TOKEN`** → sin ella el checkout responde 503 y la landing muestra
    "Consultar por WhatsApp".
  - **`NEXT_PUBLIC_SITE_URL`** → obligatoria junto al token: las `back_urls` de la
    preferencia deben ser absolutas.
  - **`MP_WEBHOOK_SECRET`** → clave secreta de Tus integraciones > Webhooks. Además
    hay que **registrar la URL** `<sitio>/api/webhooks/payment` y activar el tópico
    `payment` en el panel de MP; ahí mismo se genera el secreto.
  - Opcional: `NEXT_PUBLIC_GLOBAL66_LINK`.
  - Ojo: aunque llegue `MP_ACCESS_TOKEN`, mentoring y tarot seguirán en 409 hasta
    que tengan precio (`priceCLP > 0`). Solo el workshop cobra.
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
- **MP vía fetch a la API REST, no el SDK** (`lib/mercadopago.ts`): son dos llamadas
  simples con Bearer token y el SDK arrastra dependencias de Node poco fiables en
  Workers. Decisión ya prevista en el brief §1.2.
- **`NEXT_PUBLIC_SITE_URL` es condición de 503 del checkout**, igual que el token:
  las `back_urls` deben ser absolutas o MP rechaza la preferencia con `auto_return`.
  Mejor fallar temprano con log claro que mandar una preferencia inválida.
- **`InitiateCheckout` se dispara al inicio de `handlePay`**, no pegado al
  `window.location.href`: el beacon del Pixel se pierde si la navegación descarga la
  página antes de que salga; el round-trip del POST le da margen.
- **Banner `?pago=error` como client component dentro de `<Suspense>`**: leer el
  query param en el servidor volvería dinámicas las 3 landings, que hoy son SSG.
- **Manifest de la firma de MP verificado contra la doc oficial**, no contra el brief:
  `id:<data.id>;request-id:<x-request-id>;ts:<ts>;` con `;` final; `data.id` sale de
  los **query params** (no del body) y va en minúsculas; los segmentos ausentes se
  remueven completos.
- **Sin tolerancia de `ts` en el webhook**: la doc la marca opcional. Una ventana
  estricta arriesga rechazar reintentos legítimos de MP (perder el aviso de una venta
  real) contra un replay cuyo único efecto sería reenviar el email de un pago ya
  aprobado. La asimetría no la justifica.

## Estado de lint (baseline, NO tocar)

- **0 errores.** El error de `scripts/test-hmac.js` desapareció al eliminar el script
  en la Fase 1.3 (probaba el esquema HMAC viejo, que ya no existe).
- 3 warnings: `WHATSAPP_CONFIG` sin usar en 2 páginas B2B + `<img>` en `ConceptCard.tsx`.
- Todo eso es **preexistente**; nuestro código no agrega issues.
