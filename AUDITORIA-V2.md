# AUDITORÍA V2 — pao-alpha (verificada contra código fuente)

> Fecha: 15 julio 2026, noche. Reemplaza los hallazgos de la auditoría v1 (hecha desde chat, solo repo remoto).
> Método: revisión directa de la carpeta local `PAO/pao-alpha` + comparación con GitHub.

## 1. Estado del repositorio

- Local `main` = `origin/main` = commit `cec6c66` (25 marzo 2026). Working tree limpio. **La carpeta está correctamente vinculada y al día con GitHub.** No hay que re-clonar ni re-vincular.
- Deploy: push a `main` → build automático en Cloudflare Workers (confirmado por el operador).
- `push-to-github.bat`: script obsoleto (apunta a repo antiguo `paolarioseco`), sin secretos. Ignorar; borrar en backlog.
- `.env.local` existe con claves reCAPTCHA y un `PAYMENT_WEBHOOK_SECRET` genérico. Correctamente fuera de git.
- Stack confirmado: Next.js 16.1.6, React 19.2.3, Tailwind 4, @opennextjs/cloudflare, framer-motion, lucide-react. Sin SDK de pagos ni de email instalados.

## 2. Hallazgos v1 CONFIRMADOS en código

| # | Hallazgo | Evidencia |
|---|---|---|
| C1 | Doble header en `/organizaciones` | Root `app/layout.tsx` monta `<Header />` global; `(b2b)/layout.tsx` monta `HeaderB2B` |
| C2 | Link roto "Ver programa detallado" | `servicios/page.tsx:63` → `/biblioteca/workshop-vida-consciente` (ruta real sería `/personas/biblioteca/[slug]` y el slug no existe) → 404 |
| C3 | Fecha vencida | `servicios/page.tsx:25` "Próximo evento · 26 Febrero 2026" hardcodeada |
| C4 | Formularios simulados | `ContactForm.tsx:47` y `CorporateForm.tsx:76` con comentario "Simular envío"; ningún fetch de envío real |
| C5 | Webhook inservible para MP | `api/webhooks/payment/route.ts` valida HMAC hex del body completo; Mercado Pago firma un manifest `id:...;request-id:...;ts:...` con header `x-signature` formato `ts=,v1=` |
| C6 | Imagen pesada | `public/pao-1.png` = 1,7 MB |
| C7 | reCAPTCHA en dos pasos | El cliente llama a `/api/verify-recaptcha` por separado (`lib/recaptcha.ts:23`); la verificación debe moverse al POST único del formulario |
| C8 | Sin precios de mentoring/tarot | `servicios/page.tsx` solo publica $20.000 CLP del workshop |

## 3. CORRECCIONES a la v1

| # | v1 decía | Realidad verificada |
|---|---|---|
| X1 | "Footer duplicado en home" | **Falso.** La home (`app/page.tsx`, "Silo Cero") tiene UN solo footer inline. No tocar. |
| X2 | — | La duplicación real está en `/quien-soy`: `FloatingWhatsApp` se monta dos veces (layout `(b2c)` + `quien-soy/layout.tsx` propio). Fix: eliminar `quien-soy/layout.tsx` completo. |

## 4. Hallazgos NUEVOS (no estaban en v1)

| # | Hallazgo | Impacto |
|---|---|---|
| N1 | **`/servicios` no está en la navegación.** El menú del Header es Organizaciones / Personas / Quien Soy / Inicio; la página de servicios es huérfana (solo alcanzable por links internos). | Crítico para ventas. Refuerza Fase 1.5 del brief. |
| N2 | **`<main>` anidado con doble padding.** Root layout envuelve children en `<main className="pt-20">`; `(b2b)/layout.tsx` agrega otro `<main className="pt-20">` (doble offset en B2B) y la home declara su propio `<main>` (HTML inválido). | El fix del doble header debe incluir sacar `<main>` del root layout, no solo el `<Header />`. |
| N3 | La home es un selector B2B/B2C ("Silo Cero"), client component con framer-motion, **no** una home editorial. La Fase 2.2 del brief v1 la describía mal. | Decisión tomada: se mantiene Silo Cero en este sprint; home B2C va a backlog. |
| N4 | El CTA del header apunta a `/contacto` y la tarjeta B2C de la home a `/personas`. Ningún camino natural lleva a `/servicios`. | Se corrige junto con N1 (nav nueva + CTA "Agendar" → /servicios). |

## 5. Contexto de negocio que condiciona el plan

- **Calendario real:** miércoles noche (~2 h, tope 1:30) + jueves AM (~3-4 h). El brief v1 asumía viernes→lunes. Recalibrado en PLAN-EJECUCION.md.
- **Pendientes de validación (reunión jueves PM con Marcelo y Paola):** servicios definitivos a vender, precios de mentoring/tarot, fecha del workshop, contenidos de landings ligados a campañas Meta. → Todo copy y precio entra como placeholder editable en `lib/services.ts`.
- **Credenciales disponibles hoy:** ninguna. Resend se puede crear de inmediato (~10 min si el DNS está en Cloudflare). MP requiere resolver cuenta empresa con Paola. Pixel ID pendiente.
- **Consecuencia:** esta noche y mañana AM se construye todo lo no bloqueado por credenciales/decisiones; los flujos de pago quedan implementados pero inactivos hasta tener credenciales, con fallback a WhatsApp (deep links ya existen en `lib/config.ts`).
