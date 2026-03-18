# AGENTS.md - Paola Rioseco | Vida Consciente

> Este archivo contiene información esencial para que agentes de IA comprendan y trabajen eficientemente en este proyecto.
> **Proyecto:** Plataforma de "Conocimiento de Vida" para Paola Rioseco - mentora de autoconocimiento y transformación personal.
> **Idioma principal:** Español para UI/contenido, Inglés para código
> **Metodología:** SINT Stack (Glass Box Architecture)

---

## 1. Visión General del Proyecto

**Paola Rioseco | Vida Consciente** es una plataforma web que funciona como biblioteca viva y academia de transformación personal. No es un sitio de terapia, sino un espacio de conocimiento estructurado.

- **Arquitectura:** Knowledge-First Platform con división B2B (organizaciones) y B2C (personas)
- **UX Driver:** Claridad Mental, Estructura, "Cero Ruido"
- **Lenguaje Visual:** Editorial (Serif moderna + Sans geométrica)

### Filosofía de Desarrollo
- **K.I.S.S.** (Keep It Simple, Stupid)
- **Glass Box** - Código transparente y mantenible
- **Precision Delivery** - Entregas enfocadas y mínimas

---

## 2. Stack Tecnológico

### Core
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.1.6 | Framework principal con App Router |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos (sistema `@theme` en `globals.css`) |

### UI/UX
- **Framer Motion** ^12.33.0 - Micro-interacciones y animaciones
- **Lucide React** ^0.563.0 - Iconografía consistente
- **Google Fonts** - Inter (sans) y Lora (serif) via `next/font`

### Gestión de Contenidos
- **gray-matter** ^4.0.3 - Parseo de frontmatter en Markdown
- **remark** ^15.0.1 + **remark-html** ^16.0.1 - Procesamiento de Markdown a HTML
- Contenido estático en `/content` (sin CMS headless)

### Seguridad
- **reCAPTCHA v3** - Protección anti-spam en formularios
- **HMAC-SHA256** (Node.js crypto) - Validación de webhooks de pago
- **Honeypot fields** - Protección adicional contra bots

### Deploy (Cloudflare)
- **@opennextjs/cloudflare** ^1.17.1 - Adaptador para Cloudflare Workers
- **wrangler** ^4.69.0 - CLI de Cloudflare

---

## 3. Estructura de Directorios

```
pao-alpha/
├── app/                          # Next.js App Router
│   ├── (b2b)/                   # Route Group: B2B Corporativo
│   │   ├── layout.tsx           # Layout con HeaderB2B + FooterB2B
│   │   ├── organizaciones/
│   │   │   └── page.tsx         # Landing Gestión del Miedo Corporativo
│   │   └── recursos/            # Biblioteca corporativa
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (b2c)/                   # Route Group: B2C Personal
│   │   ├── layout.tsx           # Layout con FooterB2C + FloatingWhatsApp
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── personas/
│   │   │   ├── page.tsx         # Landing Acompañamiento Personal
│   │   │   └── biblioteca/      # Biblioteca personal
│   │   │       ├── page.tsx     # Grid de artículos
│   │   │       └── [slug]/      # Vista de artículo individual
│   │   ├── servicios/
│   │   │   └── page.tsx
│   │   └── quien-soy/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── api/                     # API Routes
│   │   ├── verify-recaptcha/    # Validación reCAPTCHA v3
│   │   │   └── route.ts
│   │   └── webhooks/payment/    # Webhook con HMAC validation
│   │       └── route.ts
│   ├── globals.css              # Tailwind v4 config (@theme)
│   ├── layout.tsx               # Root layout + fuentes
│   ├── page.tsx                 # Home (Portal de Acceso - Silo Cero)
│   └── not-found.tsx            # Página 404 personalizada
├── components/
│   ├── b2b/                     # Componentes B2B
│   │   ├── CorporateForm.tsx    # Formulario con reCAPTCHA
│   │   ├── FooterB2B.tsx
│   │   └── HeaderB2B.tsx
│   ├── b2c/                     # Componentes B2C
│   │   ├── ContactForm.tsx      # Formulario con reCAPTCHA
│   │   ├── ContactSection.tsx
│   │   ├── FloatingWhatsApp.tsx # Widget flotante con advertencia
│   │   ├── FooterB2C.tsx
│   │   └── Testimonials.tsx
│   ├── content/
│   │   ├── ConceptCard.tsx      # Tarjeta de artículo reutilizable
│   │   └── YouTubeEmbed.tsx     # Embed de videos de YouTube
│   └── layout/
│       ├── Header.tsx           # Navegación scroll-aware
│       └── TriacomaNav.tsx      # Navegación 3 pilares
├── content/                     # Contenido Markdown
│   ├── biblioteca-personal/     # Artículos B2C (6 artículos)
│   └── biblioteca-corporativa/  # Artículos B2B (6 artículos)
├── lib/                         # Utilidades
│   ├── config.ts                # Single Source of Truth (contacto, flags, privacy)
│   ├── mdx.ts                   # Helpers para leer/procesar Markdown
│   └── recaptcha.ts             # Helpers de reCAPTCHA v3
├── public/                      # Assets estáticos
│   ├── logo.png
│   ├── isotipo.png
│   └── paola.jpg
└── scripts/                     # Scripts de utilidad
    └── test-hmac.js             # Test de validación HMAC
```

---

## 4. Comandos de Desarrollo

```bash
# Instalación de dependencias
npm install

# Desarrollo local (Turbopack habilitado por defecto en Next.js 16)
npm run dev
# http://localhost:3000

# Build de producción (Next.js)
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint

# Cloudflare (OpenNext)
npm run preview      # Build + preview local
npm run deploy       # Build + deploy a Cloudflare
npm run upload       # Build + upload
npm run cf-typegen   # Generar tipos de Cloudflare
```

---

## 5. Variables de Entorno

Crear archivo `.env.local` en la raíz:

```env
# Feature Flags
NEXT_PUBLIC_ENABLE_B2B=true              # Activa sección B2B
NEXT_PUBLIC_ENABLE_B2B_LIBRARY=true      # Activa biblioteca corporativa

# Seguridad - Webhooks
PAYMENT_WEBHOOK_SECRET=tu_secreto_aqui

# reCAPTCHA v3 (PRIV-002)
# Obtener claves en: https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

**Nota:** Las variables `NEXT_PUBLIC_*` también se configuran en `wrangler.jsonc` para deploy en Cloudflare.

---

## 6. Sistema de Diseño

### Paleta de Colores (CSS Variables)
```css
--color-primary:   #C01D65   /* Magenta - CTAs principal */
--color-mente:     #273DA0   /* Azul */
--color-cuerpo:    #FB4C00   /* Naranja */
--color-espiritu:  #9B18B9   /* Violeta */
--color-paper:     #FDFCF8   /* Fondo crema */
--color-ink:       #1C1917   /* Texto principal */
--color-muted:     #78716C   /* Texto secundario */
```

### Tipografía
- **Sans:** Inter (variable) - UI, navegación, cuerpo de texto
- **Serif:** Lora (variable) - Títulos, énfasis editorial

### Clases de Utilidad (Tailwind v4)
```css
.text-micro        /* Texto pequeño uppercase para etiquetas */
.font-sans         /* Inter */
.font-serif        /* Lora */
.bg-paper          /* Fondo crema */
.text-ink          /* Texto oscuro */
```

---

## 7. Convenciones de Código

### Estilo General
- **Idioma:** Español para UI y contenido, Inglés para código
- **Comillas:** Dobles en JSX y TypeScript
- **Indentación:** 2 espacios
- **Punto y coma:** Requerido

### Estructura de Componentes
```tsx
// 1. Imports (React primero, luego Next, luego terceros, luego locales)
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "@/lib/config";

// 2. Types/Interfaces (si son específicos del componente)
interface Props {
  title: string;
}

// 3. Componente
export default function ComponentName({ title }: Props) {
  // hooks primero
  const [state, setState] = useState();
  
  // handlers
  const handleClick = () => {};
  
  // render
  return <div>{title}</div>;
}
```

### Nomenclatura de Archivos
- Componentes: `PascalCase.tsx` (ej: `CorporateForm.tsx`)
- Páginas: `page.tsx` (Next.js convención)
- Layouts: `layout.tsx`
- Hooks: `useNombreHook.ts`
- Utilidades: `nombreUtilidad.ts`

### Organización de Imports
1. React/Next.js
2. Librerías de terceros
3. Componentes locales (`@/components/...`)
4. Utilidades (`@/lib/...`)
5. Estilos

---

## 8. Gestión de Contenido

Los artículos se gestionan como archivos Markdown en `/content/`.

### Estructura de un Artículo
```markdown
---
title: "Título del Artículo"
date: "2026-01-25"
excerpt: "Extracto corto para previews"
category: "Desarrollo Personal"
author: "Paola Rioseco"
readTime: "4 min"
---

# Contenido en Markdown

Texto del artículo aquí...
```

### Proceso para Agregar Contenido
1. Crear archivo `.md` en `content/biblioteca-personal/` o `content/biblioteca-corporativa/`
2. Incluir frontmatter con todos los campos requeridos
3. Agregar el slug a la lista correspondiente en `lib/mdx.ts`:
   - `BIBLIOTECA_PERSONAL_SLUGS` para B2C
   - `BIBLIOTECA_CORPORATIVA_SLUGS` para B2B
4. Requiere reiniciar el servidor para ver cambios (lectura en build time)

### Funciones Utilitarias (lib/mdx.ts)
- `getAllArticles(silo)` - Lista todos los artículos de un silo
- `getArticleBySlug(silo, slug)` - Obtiene un artículo con contenido HTML
- `generateArticleParams(silo)` - Genera parámetros para rutas estáticas
- `articleExists(silo, slug)` - Verifica existencia de artículo

---

## 9. Seguridad

### reCAPTCHA v3 (PRIV-002)
- Implementación invisible (sin checkbox)
- Score mínimo: 0.5
- Acciones específicas por formulario:
  - `submit_contact_b2c`
  - `submit_contact_b2b`
- Implementación en `lib/recaptcha.ts`

### Honeypot Fields
- Campo oculto `name="website"` en formularios
- Si contiene valor = spam (rechazo silencioso)

### Protección de Datos (Ley 21.719)
- Checkbox de privacidad SIEMPRE desmarcado por defecto
- Texto obligatorio en `PRIVACY_CONFIG.fullNotice`
- Disclaimer en todos los formularios corporativos

### Webhooks (SEC-001, SEC-002)
- Validación HMAC-SHA256 obligatoria
- Sanitización de logs: NUNCA loggear payload completo
- Comparación timing-safe para prevenir timing attacks

### Script de Testing HMAC
```bash
node scripts/test-hmac.js
```

---

## 10. Feature Flags

El proyecto usa feature flags basados en variables de entorno:

```tsx
// En componentes/páginas
const isB2BEnabled = process.env.NEXT_PUBLIC_ENABLE_B2B === 'true';

// En lib/config.ts
export const FEATURE_FLAGS = {
  b2bEnabled: process.env.NEXT_PUBLIC_ENABLE_B2B === "true",
  b2bLibraryEnabled: process.env.NEXT_PUBLIC_ENABLE_B2B_LIBRARY === "true",
};
```

**Regla:** Cuando un flag está desactivado, mostrar vista "Apagada" con mensaje profesional y CTA de retorno.

---

## 11. Integraciones

### WhatsApp Business
- Configuración centralizada en `WHATSAPP_CONFIG` (`lib/config.ts`)
- Mensajes predefinidos por contexto: `default`, `b2b`, `mentoring`, `tarot`, `workshop`
- Botón flotante en todas las páginas B2C (`FloatingWhatsApp.tsx`)
- **Nota importante:** Solo mensajes de texto, no se atienden llamadas

### Cal.com
- Integración para agendamiento de sesiones
- URL: `https://cal.com/paola-rioseco/intro`

### reCAPTCHA
- Script cargado dinámicamente vía `loadRecaptchaScript()`
- Token verificado en `/api/verify-recaptcha`

---

## 12. Testing

**Nota:** El proyecto actualmente no tiene framework de testing configurado.

Para implementar tests, se recomienda:
- **Unit tests:** Vitest o Jest
- **E2E tests:** Playwright
- **Component tests:** Testing Library + Vitest

### Script de Prueba de Seguridad
Existe `scripts/test-hmac.js` para probar la validación HMAC de webhooks:
```bash
node scripts/test-hmac.js
```

---

## 13. Despliegue

### Plataforma: Cloudflare Pages (con OpenNext)

La aplicación usa `@opennextjs/cloudflare` para ejecutarse en Cloudflare Workers.

### Configuración (`wrangler.jsonc`)
```json
{
  "name": "pao-alpha",
  "compatibility_date": "2025-09-27",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    "NEXT_PUBLIC_ENABLE_B2B": "true",
    "NEXT_PUBLIC_ENABLE_B2B_LIBRARY": "true"
  }
}
```

### Preparación para Deploy
1. Configurar variables de entorno en `wrangler.jsonc`
2. Ejecutar build local para verificar: `npm run build`
3. Revisar que no haya errores de lint: `npm run lint`
4. Deploy: `npm run deploy`

---

## 14. Checklist para Nuevos Features

Antes de implementar un nuevo feature:

- [ ] ¿Está alineado con la filosofía "Cero Ruido"?
- [ ] ¿Usa el sistema de diseño existente (colores, tipografía)?
- [ ] ¿Los formularios incluyen protección reCAPTCHA?
- [ ] ¿Los formularios respetan Ley 21.719 (checkbox privacidad desmarcado)?
- [ ] ¿Se manejan estados de loading y error?
- [ ] ¿Funciona en mobile (diseño responsive)?
- [ ] ¿No hay hardcodeo de textos que deberían estar en `lib/config.ts`?
- [ ] ¿Las páginas nuevas usan metadata para SEO?

---

## 15. Troubleshooting Común

### Problemas con Tailwind v4
```bash
rm -rf .next && npm run dev
```

### Cambios en content no se reflejan
Los archivos Markdown se leen en build time. Reiniciar el servidor:
```bash
# Detener y volver a iniciar
npm run dev
```

### Error de reCAPTCHA
- Verificar que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` esté configurado
- Verificar dominio en consola de Google reCAPTCHA

### Error de fuentes
Las fuentes se cargan via `next/font` en `app/layout.tsx`. No requieren configuración adicional.

### Error de Cloudflare/OpenNext
- Verificar que `wrangler.jsonc` tenga `nodejs_compat` en flags
- Ejecutar `npm run cf-typegen` para regenerar tipos

---

## 16. Contacto y Referencias

- **WhatsApp:** +569 99396166
- **Email:** paorioseco@gmail.com
- **YouTube:** @paolarioseco
- **LinkedIn:** linkedin.com/in/paolarioseco
- **Cal.com:** https://cal.com/paola-rioseco/intro
- **Desarrollado por:** sint.cl

### Recursos Externos
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)

---

## 17. Notas para Agentes de IA

### Al Modificar Código
1. **Mantén consistencia:** Siempre verifica el estilo existente en archivos cercanos
2. **No rompas el contrato:** Los objetos en `lib/config.ts` son Single Source of Truth
3. **Responsive first:** Todas las modificaciones deben funcionar en mobile
4. **Accesibilidad:** Usa etiquetas ARIA donde sea necesario

### Al Crear Nuevas Páginas
1. Usa los route groups `(b2b)` o `(b2c)` según corresponda
2. Importa los layouts correctos
3. Incluye metadata para SEO
4. Reutiliza componentes existentes antes de crear nuevos

### Al Trabajar con Formularios
1. Siempre incluye validación de reCAPTCHA v3
2. Agrega campo honeypot `name="website"`
3. Checkbox de privacidad desmarcado por defecto (Ley 21.719)
4. Estados de loading y feedback visual

### Al Agregar Contenido
1. Usar guiones en nombres de archivo (kebab-case)
2. Fecha en formato ISO: `YYYY-MM-DD`
3. Incluir todos los campos del frontmatter
4. Agregar el slug a la lista correspondiente en `lib/mdx.ts`
5. Testear el renderizado antes de finalizar
