# BRIEF DE DIRECCIÓN — Refactorización paolarioseco.com (Sprint de ventas)

> **Para:** Claude Opus en Claude Code
> **Repo:** JoseSebaLM/pao-alpha (Next.js 16.1.6 · React 19 · Tailwind 4 · TypeScript · Cloudflare Workers vía @opennextjs/cloudflare)
> **Fecha del sprint (v2, recalibrado):** miércoles 15 noche (tope 1:30) + jueves 16 AM. Objetivo inmediato: avances visibles desplegados en paolarioseco.com antes de la reunión del jueves PM. El funnel de pago se construye pero se activa cuando lleguen credenciales (post-reunión).
> **Director:** Seba (operador). Este documento es la fuente de verdad del sprint. Ante ambigüedad, preguntar al operador antes de improvisar.
> **v2 (15-jul):** hallazgos verificados contra código fuente; correcciones marcadas [v2]. Ver AUDITORIA-V2.md y PLAN-EJECUCION.md en esta carpeta.
> **Deploy:** push a `main` → build automático en Cloudflare. Deployar = commit + push.

---

## 0. Objetivo y principios

**Objetivo único:** transformar el sitio de biblioteca editorial a máquina de ventas mínima viable: landing por servicio → pago con Mercado Pago Checkout Pro → página de gracias con agendamiento Cal.com → eventos de Meta Pixel medibles.

**Principios de ejecución:**

1. **No refactorizar lo que no bloquea ventas.** El código B2B, la biblioteca y su arquitectura de rutas NO se tocan en este sprint, salvo los bugs listados en Fase 0.
2. **Reutilizar antes de crear.** El repo ya tiene `lib/config.ts`, componentes de formulario, webhook HMAC esbozado y sistema de diseño Tailwind (tokens `paper`, `ink`, `muted`, `primary`, `mente`, `cuerpo`, `espíritu`). Extender, no reemplazar.
3. **Convenciones existentes:** UI y contenido en español, código en inglés (ver AGENTS.md del repo). Componentes server por defecto; `"use client"` solo donde hay interactividad.
4. **Commits por tarea, no por fase.** Formato: `feat(fase-N): descripción corta`. Nunca commitear secretos.
5. **Mobile-first estricto.** El tráfico de Meta llegará >90% desde móvil. Toda landing se diseña primero a 390px de ancho.
6. **Al terminar cada fase:** `npm run lint` y `npm run build` deben pasar limpios antes de continuar.

---

## 1. Arquitectura objetivo de rutas (delta)

```
app/
├── (b2c)/
│   ├── servicios/
│   │   ├── page.tsx                  # REESCRIBIR: índice de 3 tarjetas
│   │   └── [slug]/page.tsx           # NUEVO: landing por servicio
│   ├── gracias/
│   │   └── [slug]/page.tsx           # NUEVO: post-pago + Cal.com
│   ├── contacto/page.tsx             # se mantiene
│   ├── personas/...                  # solo dieta de texto (Fase 2)
│   └── quien-soy/page.tsx            # solo dieta de texto (Fase 2)
├── api/
│   ├── contact/route.ts              # NUEVO: envío real vía Resend
│   ├── checkout/[slug]/route.ts      # NUEVO: crea preferencia MP
│   └── webhooks/payment/route.ts     # ADAPTAR: firma de Mercado Pago
├── sitemap.ts                        # NUEVO
└── robots.ts                         # NUEVO
lib/
├── services.ts                       # NUEVO: fuente única de servicios
├── resend.ts                         # NUEVO: cliente + templates
└── mercadopago.ts                    # NUEVO: cliente + helpers
components/
├── analytics/MetaPixel.tsx           # NUEVO
├── landing/                          # NUEVO: piezas de landing
│   ├── LandingHero.tsx
│   ├── PriceBlock.tsx
│   ├── FaqAccordion.tsx
│   └── PayButtons.tsx
└── booking/CalEmbed.tsx              # NUEVO
```

---

## 2. FASE 0 — Detener fugas (bloqueante, hacer primero)

### 0.1 `lib/services.ts` — fuente única de verdad

Crear ANTES que cualquier landing. Contrato:

```typescript
export type ServiceSlug = "workshop-vida-consciente" | "mentoring" | "tarot";

export interface Service {
  slug: ServiceSlug;
  name: string;               // "Vida Consciente: Un día a la vez"
  shortName: string;          // "Workshop"
  tagline: string;            // promesa en 1 línea
  description: string;        // máx 3 frases
  includes: string[];         // 3-5 bullets
  priceCLP: number;           // 20000 (workshop). Mentoring/tarot: PENDIENTE del operador
  priceLabel: string;         // "$20.000 CLP"
  durationLabel: string;      // "60 minutos"
  modality: string;           // "Online en vivo" / "Online 1:1"
  calLink: string | null;     // ej: "paolarioseco/mentoring". null = sin agenda (workshop usa confirmación de cupo)
  color: "primary" | "mente" | "espíritu";  // token Tailwind existente
  faq: { q: string; a: string }[];          // exactamente 3
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: Record<ServiceSlug, Service> = { /* ... */ };
export const getService = (slug: string): Service | undefined => ...;
```

Los textos base salen de la actual `app/(b2c)/servicios/page.tsx`, RECORTADOS: tagline ≤ 12 palabras, description ≤ 3 frases, sin jerga repetida ("soberanía consciente" máx 1 vez por servicio). Precios de mentoring y tarot: usar `0` + `priceLabel: "Consultar"` como placeholder y marcar `// TODO(operador)` — el operador los confirmará el sábado AM.

### 0.2 Formularios reales con Resend

- `npm install resend`.
- `lib/resend.ts`: cliente inicializado con `process.env.RESEND_API_KEY`; función `sendContactEmail({ type: "b2c" | "b2b", data })` que envía a `EMAIL_CONFIG` de `lib/config.ts` con reply-to del remitente. Template HTML simple inline (sin librería de templates).
- `app/api/contact/route.ts` (POST): valida honeypot server-side, verifica token reCAPTCHA reutilizando `lib/recaptcha.ts` (mover la verificación al servidor: el cliente NO debe llamar a `/api/verify-recaptcha` por separado; un solo POST con token incluido), llama a `sendContactEmail`, responde `{ ok: true }` o error 4xx/5xx con mensaje genérico.
- Modificar `ContactForm.tsx` y `CorporateForm.tsx`: eliminar el bloque `// Simular envío` y hacer `fetch("/api/contact")`. Mantener estados de UI existentes. Agregar manejo de error visible ("No pudimos enviar tu mensaje, escríbenos por WhatsApp").
- Si `RESEND_API_KEY` no está definida: el endpoint responde 503 y loggea advertencia; nunca simular éxito.

### 0.3 Bugs visibles

1. **Doble header en `/organizaciones` [v2 ampliado]:** el root `app/layout.tsx` monta `<Header />` global y el layout `(b2b)` monta `HeaderB2B`. Además el root envuelve children en `<main className="pt-20">` mientras `(b2b)/layout.tsx` agrega OTRO `<main className="pt-20">` (doble padding) y la home declara su propio `<main>` (HTML inválido por anidamiento). Solución: el root layout queda solo con fonts y `<body>` (sin Header ni main); mover `<Header />` y `<main className="pt-20">` al layout `(b2c)`; la home (fuera del grupo) conserva su propio `<main>` y NO lleva Header (es Silo Cero de pantalla completa). Verificar que `not-found.tsx` y `/contacto` sigan teniendo header.
2. **[v2 CORREGIDO] La home NO tiene footer duplicado — no tocarla.** La duplicación real: `/quien-soy` monta `FloatingWhatsApp` dos veces (layout `(b2c)` + `app/(b2c)/quien-soy/layout.tsx`). Fix: eliminar `quien-soy/layout.tsx` completo.
3. **Link roto** `/biblioteca/workshop-vida-consciente` en servicios: eliminar el botón "Ver programa detallado" (la landing nueva lo reemplaza).
4. **Fecha vencida** "26 Febrero 2026": eliminar toda fecha hardcodeada. Si el operador entrega fecha nueva, va en `services.ts` como campo opcional `nextDate?: string`.
5. **[v2 nuevo] `/servicios` huérfana:** no aparece en ningún menú del Header (nav actual: Organizaciones/Personas/Quien Soy/Inicio). El fix definitivo es la Fase 1.5; si la Fase 1.5 se posterga, agregar al menos el link "Servicios" al nav en esta fase.

**Criterio de aceptación Fase 0:** enviar ambos formularios en local llega un email real; `/organizaciones` muestra un solo header; build limpio.

---

## 3. FASE 1 — Motor de ventas

### 1.1 Landing por servicio: `app/(b2c)/servicios/[slug]/page.tsx`

Server component. `generateStaticParams` desde `SERVICES`. `generateMetadata` desde el servicio. 404 con `notFound()` si el slug no existe.

**Estructura vertical fija (mobile-first, una columna, máx ~2 pantallas de scroll en móvil):**

1. `LandingHero`: foto (usar `pao-2.jpeg` o `pao-3.jpeg` vía `next/image`, `priority`), `shortName` como kicker, `name` como H1, `tagline` como subtítulo. Nada más.
2. Bloque "Qué incluye": los `includes` como lista con check (Lucide `Check`), + `durationLabel` y `modality` como badges.
3. `PriceBlock`: precio grande + `PayButtons`.
4. `PayButtons` (client component):
   - Botón primario "Pagar y agendar" → POST a `/api/checkout/[slug]`, recibe `{ initPoint }`, dispara `track("InitiateCheckout", {...})` y redirige con `window.location.href`.
   - Estado de carga en el botón; en error, mostrar fallback: "Intenta de nuevo o escríbenos por WhatsApp" con el link contextual de `WHATSAPP_CONFIG`.
   - Link secundario discreto "¿Pagas desde fuera de Chile?" → `process.env.NEXT_PUBLIC_GLOBAL66_LINK` (link de cobro que entrega el operador). Si la variable no existe, no renderizar el link.
5. Dos testimonios (tomar 2 del array existente en `Testimonials.tsx`; extraer los datos a `lib/testimonials.ts` y que el componente los reciba por props).
6. `FaqAccordion`: 3 preguntas del servicio (client component, un `useState`).
7. Cierre: micro-CTA repetido (mismo botón de pago) + nota de WhatsApp como último recurso con `warningText` de config.

**Prohibido en la landing:** navegación a biblioteca, párrafos > 3 frases, más de 1 CTA primario distinto, emojis como íconos.

### 1.2 Checkout: `app/api/checkout/[slug]/route.ts`

- `npm install mercadopago` (SDK oficial v2+).
- `lib/mercadopago.ts`: cliente con `MP_ACCESS_TOKEN`.
- POST handler: valida slug contra `SERVICES`; rechaza si `priceCLP === 0` (servicio sin precio publicado → 409 con mensaje). Crea preferencia:

```typescript
{
  items: [{
    id: service.slug,
    title: service.name,
    quantity: 1,
    unit_price: service.priceCLP,
    currency_id: "CLP",
  }],
  back_urls: {
    success: `${BASE_URL}/gracias/${slug}`,
    failure: `${BASE_URL}/servicios/${slug}?pago=error`,
    pending: `${BASE_URL}/gracias/${slug}?estado=pendiente`,
  },
  auto_return: "approved",
  external_reference: `${slug}-${crypto.randomUUID()}`,
  notification_url: `${BASE_URL}/api/webhooks/payment`,
  statement_descriptor: "PAOLA RIOSECO",
}
```

- Responde `{ initPoint: preference.init_point }`. `BASE_URL` desde `NEXT_PUBLIC_SITE_URL`.
- En la landing, si llega `?pago=error`, mostrar banner discreto "El pago no se completó. Puedes intentarlo de nuevo."
- Verificar compatibilidad del SDK con el runtime de Cloudflare Workers (nodejs_compat está activo en wrangler.jsonc). Si el SDK falla en Workers, degradar a `fetch` directo contra `https://api.mercadopago.com/checkout/preferences` con el mismo payload — es un POST simple con Bearer token, no requiere SDK.

### 1.3 Webhook: adaptar `app/api/webhooks/payment/route.ts`

El esqueleto HMAC genérico actual NO corresponde al esquema de Mercado Pago. Reemplazar por validación oficial de MP:

- MP envía header `x-signature` con formato `ts=...,v1=...` y header `x-request-id`. El manifest a firmar es `id:[data.id];request-id:[x-request-id];ts:[ts];` con HMAC-SHA256 usando `MP_WEBHOOK_SECRET`. Consultar la doc oficial de MP para el formato exacto del manifest al implementar (buscar "mercado pago webhooks validar origen") — no confiar solo en este brief para el string exacto.
- Mantener los principios ya presentes en el archivo: `timingSafeEqual`, nunca loggear payload completo (SEC-002).
- Al recibir notificación tipo `payment`: consultar `GET /v1/payments/{id}` con el access token; si `status === "approved"`, enviar email a Paola vía Resend con servicio (desde `external_reference`), monto y nombre del pagador, y loggear `[Payment] approved {external_reference}`.
- Responder 200 rápido siempre que la firma sea válida (MP reintenta ante no-200).

### 1.4 Página de gracias: `app/(b2c)/gracias/[slug]/page.tsx`

- H1: "Pago recibido. Último paso: agenda tu sesión" (o "Tu cupo está reservado" si `calLink === null`).
- Si `calLink` existe: `CalEmbed` (client component) con el embed inline oficial de Cal.com (`@calcom/embed-react` o script embed; preferir script embed para no sumar dependencia pesada — evaluar peso y decidir, documentando la decisión en el commit).
- Si `?estado=pendiente`: mensaje "Tu pago está en proceso; te confirmaremos por email" y NO mostrar agenda todavía.
- `<meta name="robots" content="noindex">` vía metadata.
- Esta página dispara `Purchase` (ver Fase 2); dejar el hook `track()` llamado desde un client component `PurchaseTracker` montado en la página, con guard de doble disparo vía `sessionStorage`.

### 1.5 Índice `/servicios` y navegación

- Reescribir `app/(b2c)/servicios/page.tsx`: hero corto + 3 tarjetas generadas desde `SERVICES` (foto/color, nombre, tagline, precio, botón "Ver más" → landing). Eliminar todo el contenido largo actual (las landings lo absorben). Conservar el bloque "Para quién NO es esto" en versión de 2 líneas al final.
- `components/layout/Header.tsx`: nueva estructura de nav B2C: `Inicio | Servicios | Personas | Quién soy` (en ese orden; "Inicio" primero, no último). El CTA del header pasa de "/contacto" a "/servicios" con label "Agendar". Mantener acceso a Organizaciones como link secundario en el footer B2C y en la home (no en el nav principal B2C: el tráfico de Meta es B2C y el nav debe ser mínimo).
- Agregar link a `/servicios` desde el hero de la home (CTA primario de la home apunta a servicios, no a contacto).

**Criterio de aceptación Fase 1:** flujo completo en sandbox de MP (credenciales de prueba): landing → checkout → pago de prueba → redirección a /gracias → webhook loggea approved → email a Paola. Las 3 landings renderizan y el build es estático donde corresponde.

---

## 4. FASE 2 — Meta Pixel, dieta de contenido, SEO

### 2.1 Meta Pixel

- `components/analytics/MetaPixel.tsx` (client): inyecta el snippet base con `NEXT_PUBLIC_META_PIXEL_ID` usando `next/script` strategy `afterInteractive`; expone helper `track(event, params)` (module-level, con guard `typeof window.fbq === "function"`). Montar en root layout. Si la env var no existe, no renderizar nada.
- Eventos:

| Evento | Dónde | Params |
|---|---|---|
| `PageView` | automático (snippet base) | — |
| `ViewContent` | mount de cada landing (client tracker) | `content_ids: [slug]`, `content_type: "product"`, `value: priceCLP`, `currency: "CLP"` |
| `InitiateCheckout` | click en PayButtons antes del redirect | ídem |
| `Purchase` | `/gracias/[slug]` con guard sessionStorage | ídem |
| `Lead` | éxito de formularios contacto | `content_category: "b2c" \| "b2b"` |

- Consentimiento: banner mínimo fijo inferior (client component, estado en `localStorage`): texto de 2 líneas citando Ley 21.719, botones "Aceptar" / "Solo esenciales". El Pixel solo se inicializa tras aceptar (`fbq('consent', 'grant')` o carga diferida del snippet — implementar carga diferida, es más simple y más limpia).
- **Advertencia conocida:** el `Purchase` desde `back_urls` es aproximado (el usuario puede cerrar antes de volver). Es aceptable para el arranque; la Conversions API server-side queda en backlog documentado en el commit final.

### 2.2 Dieta de contenido (home, /personas, /quien-soy)

Reglas mecánicas, aplicar sin excepción:

- Ningún párrafo > 3 frases; ninguna sección con > 1 párrafo + 1 lista.
- Testimonios: extraer a `lib/testimonials.ts`; cada página muestra exactamente 2, distintos entre páginas.
- Jerga: "soberanía consciente" y "responsabilidad radical" máximo 1 aparición por página.
- **[v2 CORREGIDO] Home: NO tocar.** La home real es un selector B2B/B2C ("Silo Cero"), no una home editorial. Decisión del operador: se mantiene en este sprint. Único cambio permitido: en la tarjeta B2C ("Acompañamiento Personal"), el href puede pasar de `/personas` a `/servicios` SOLO si el operador lo aprueba en checkpoint. Home B2C completa → BACKLOG.md.
- Imágenes: optimizar `pao-1.png` (convertir a WebP/JPEG ≤ 250 KB con sharp o squoosh-cli en el repo, mantener original fuera de /public) e incorporar `paola.jpg` optimizada en /quien-soy. Todas vía `next/image` con `sizes` correctos.

### 2.3 SEO mínimo viable

- `generateMetadata` o `metadata` export en TODAS las páginas B2C (hoy /personas y /servicios heredan la genérica): title único ≤ 60 caracteres, description ≤ 155.
- Open Graph global en root layout (siteName, locale es_CL, imagen por defecto 1200×630 creada desde `pao-3.jpeg` con recorte) + OG específico por landing.
- `app/sitemap.ts` (rutas estáticas + landings + artículos de biblioteca desde `lib/mdx.ts`) y `app/robots.ts` (allow all, disallow `/gracias`, apuntar sitemap).

**Criterio de aceptación Fase 2:** los 5 eventos visibles en Meta Events Manager → Test Events; Lighthouse móvil ≥ 85 en performance en las 3 landings; ninguna página con title duplicado.

---

## 5. FASE 3 — QA (dirigido por el operador, asistir)

Checklist técnico a soportar: compra real end-to-end por servicio, verificación de webhook en producción (logs de Cloudflare via `wrangler tail`), eventos en Test Events, formularios en producción, revisión responsive 390px/768px/1440px, prueba del link Global66, `?pago=error` y `?estado=pendiente` renderizan correctamente.

---

## 6. Variables de entorno

| Variable | Ámbito | Fuente |
|---|---|---|
| `RESEND_API_KEY` | server | operador (cuenta Resend) |
| `MP_ACCESS_TOKEN` | server | credenciales producción MP de Paola |
| `MP_WEBHOOK_SECRET` | server | panel de webhooks MP |
| `NEXT_PUBLIC_SITE_URL` | pública | `https://paolarioseco.com` |
| `NEXT_PUBLIC_META_PIXEL_ID` | pública | Business Manager de Paola |
| `NEXT_PUBLIC_GLOBAL66_LINK` | pública | app Global66 de Paola |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | pública | ya existe |
| `RECAPTCHA_SECRET_KEY` | server | ya existe |

Secretos de producción vía `wrangler secret put`; nunca en `wrangler.jsonc` ni en el repo. Crear `.env.example` actualizado.

---

## 7. Fuera de alcance (NO hacer aunque parezca buena idea)

Conversions API de Meta; refactor de rutas B2B o biblioteca; checkout embebido (Bricks); CMS; tests automatizados; i18n; rediseño del sistema visual; tocar `push-to-github.bat` o flags B2B (backlog). Si durante el trabajo aparece un bug fuera de alcance, documentarlo en `BACKLOG.md` y seguir.

---

## 8. Orden de ejecución y puntos de control [v2 recalibrado]

**Sesión 1 — miércoles noche (~2 h):**
1. Verificar base: `npm run lint` + `npm run build` limpios antes de tocar nada.
2. Fase 0 completa (services.ts con placeholders TODO(operador), bugs 0.3, formularios con Resend; si `RESEND_API_KEY` aún no existe, el endpoint queda con fallback 503 y se prueba después).
3. Commit + push por tarea → **checkpoint con el operador** → fin de la noche.

**Sesión 2 — jueves AM (~3-4 h), prioridad = demo visible en producción antes de la reunión PM:**
1. Fase 1.1 + 1.5: índice /servicios + 3 landings + nav nueva. En `PayButtons`, mientras no haya credenciales MP, el botón primario renderiza "Consultar por WhatsApp" con el deep link contextual de `WHATSAPP_CONFIG` (mentoring/tarot/workshop ya existen en config). El botón de pago real se activa solo cuando `MP_ACCESS_TOKEN` esté definido y `priceCLP > 0`.
2. Fase 1.4: página de gracias (sin CalEmbed si aún no hay cuenta Cal.com; dejar el componente listo detrás de `calLink !== null`).
3. Si queda tiempo: Fase 1.2/1.3 (checkout + webhook, inactivos sin credenciales), MetaPixel env-gated, sitemap/robots.
4. Deploy (push) y revisión en celular real antes de la reunión.

**Post-reunión jueves PM (con decisiones y credenciales):** actualizar services.ts con precios/textos reales, cargar secrets vía wrangler, activar checkout, probar sandbox → Fases 2 y 3 según brief original.

**Prioridad de corte si falta tiempo:** bugs Fase 0 > landings+nav > formularios reales > checkout MP > pixel > dieta de texto > SEO.

Ante cualquier decisión no cubierta por este brief que afecte funnel, precios, textos de venta o datos personales: **detenerse y preguntar al operador.**
