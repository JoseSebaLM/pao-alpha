# AGENTS.md - Paola Rioseco | Vida Consciente

> Este archivo contiene información esencial para que agentes de IA comprendan y trabajen eficientemente en este proyecto.
> **Proyecto:** Plataforma de "Conocimiento de Vida" para Paola Rioseco - mentora de autoconocimiento y transformación personal.
> **Última actualización:** 2026-02-27

---

## 1. Visión General del Proyecto

**Paola Rioseco | Vida Consciente** es una plataforma web que funciona como biblioteca viva y academia de transformación personal. No es un sitio de terapia, sino un espacio de conocimiento estructurado.

- **Arquitectura:** Knowledge-First Platform
- **UX Driver:** Claridad Mental, Estructura, "Cero Ruido"
- **Lenguaje Visual:** Editorial (Serif moderna + Sans geométrica)
- **Metodología:** SINT Stack (Glass Box Architecture)

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
| Tailwind CSS | 4.x | Estilos (nuevo sistema `@theme`) |

### UI/UX
- **Framer Motion** - Micro-interacciones y animaciones
- **Lucide React** - Iconografía consistente
- **Google Fonts** - Inter (sans) y Lora (serif)

### Gestión de Contenidos
- **gray-matter** - Parseo de frontmatter en Markdown
- **remark + remark-html** - Procesamiento de Markdown a HTML
- Contenido estático en `/content` (sin CMS headless aún)

### Seguridad
- **reCAPTCHA v3** - Protección anti-spam en formularios
- **HMAC-SHA256** - Validación de webhooks de pago
- **Honeypot fields** - Protección adicional contra bots

---

## 3. Estructura de Directorios

```
pao-alpha/
├── app/                          # Next.js App Router
│   ├── (b2b)/                   # Route Group: B2B Corporativo
│   │   ├── layout.tsx           # Layout con HeaderB2B + FooterB2B
│   │   ├── organizaciones/
│   │   │   └── page.tsx         # Landing Gestión del Miedo Corporativo
│   │   └── recursos/            # Biblioteca corporativa (feature flag)
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (b2c)/                   # Route Group: B2C Personal
│   │   ├── layout.tsx           # Layout con FooterB2C + FloatingWhatsApp
│   │   ├── personas/
│   │   │   ├── page.tsx         # Landing Acompañamiento Personal
│   │   │   └── biblioteca/      # Biblioteca personal
│   │   │       ├── page.tsx     # Grid de artículos
│   │   │       └── [slug]/      # Vista de artículo individual
│   │   ├── servicios/
│   │   └── sobre-mi/
│   ├── api/                     # API Routes
│   │   ├── verify-recaptcha/    # Validación reCAPTCHA v3
│   │   └── webhooks/payment/    # Webhook con HMAC validation
│   ├── globals.css              # Tailwind v4 config (@theme)
│   ├── layout.tsx               # Root layout + fuentes
│   ├── page.tsx                 # Home (Portal de Acceso - Silo Cero)
│   └── not-found.tsx
├── components/
│   ├── b2b/                     # Componentes B2B
│   │   ├── CorporateForm.tsx    # Formulario con reCAPTCHA
│   │   ├── HeaderB2B.tsx
│   │   └── FooterB2B.tsx
│   ├── b2c/                     # Componentes B2C
│   │   ├── ContactForm.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingWhatsApp.tsx # Widget flotante
│   │   └── FooterB2C.tsx
│   ├── content/
│   │   └── ConceptCard.tsx      # Tarjeta de artículo reutilizable
│   └── layout/
│       ├── Header.tsx           # Navegación scroll-aware
│       └── TriacomaNav.tsx      # Navegación 3 pilares
├── content/                     # Contenido Markdown
│   ├── biblioteca-personal/     # Artículos B2C
│   └── biblioteca-corporativa/  # Artículos B2B
├── lib/                         # Utilidades
│   ├── config.ts                # Single Source of Truth (contacto, flags, privacy)
│   └── recaptcha.ts             # Helpers de reCAPTCHA v3
├── public/                      # Assets estáticos
│   ├── logo.png
│   ├── isotipo.png
│   └── paola.jpg
└── scripts/                     # Scripts de utilidad
    └── test-hmac.js             # Test de validación HMAC
```

---

## 4. Sistema de Diseño

### Paleta de Colores
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

### Clases de Utilidad
```css
.text-micro        /* Texto pequeño uppercase para etiquetas */
.font-sans         /* Inter */
.font-serif        /* Lora */
.bg-paper          /* Fondo crema */
.text-ink          /* Texto oscuro */
```

---

## 5. Comandos de Desarrollo

```bash
# Instalación de dependencias
npm install

# Desarrollo local (Turbopack)
npm run dev
# http://localhost:3000

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

---

## 6. Variables de Entorno

Crear archivo `.env.local` en la raíz:

```env
# Feature Flags
NEXT_PUBLIC_ENABLE_B2B=true              # Activa sección B2B
NEXT_PUBLIC_ENABLE_B2B_LIBRARY=false     # Activa biblioteca corporativa

# Seguridad - Webhooks
PAYMENT_WEBHOOK_SECRET=tu_secreto_aqui

# reCAPTCHA v3 (PRIV-002)
# Obtener claves en: https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
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
3. El slug se genera automáticamente desde el nombre del archivo
4. No requiere reiniciar el servidor (hot reload)

---

## 9. Seguridad

### reCAPTCHA v3 (PRIV-002)
- Implementación invisible (sin checkbox)
- Score mínimo: 0.5
- Acciones específicas por formulario:
  - `submit_contact_b2c`
  - `submit_contact_b2b`

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
- Configuración centralizada en `WHATSAPP_CONFIG`
- Mensajes predefinidos por contexto (default, b2b, mentoring, etc.)
- Botón flotante en todas las páginas B2C
- **Nota importante:** Solo mensajes de texto, no se atienden llamadas

### Cal.com
- Integración para agendamiento de sesiones
- URL: `https://cal.com/paola-rioseco/intro`

### reCAPTCHA
- Script cargado dinámicamente vía `loadRecaptchaScript()`
- Token verificado en `/api/verify-recaptcha`

---

## 12. Checklist para Nuevos Features

Antes de implementar un nuevo feature:

- [ ] ¿Está alineado con la filosofía "Cero Ruido"?
- [ ] ¿Usa el sistema de diseño existente (colores, tipografía)?
- [ ] ¿Los formularios incluyen protección reCAPTCHA?
- [ ] ¿Los formularios respetan Ley 21.719 (checkbox privacidad desmarcado)?
- [ ] ¿Se manejan estados de loading y error?
- [ ] ¿Funciona en mobile (diseño responsive)?
- [ ] ¿No hay hardcodeo de textos que deberían estar en config?

---

## 13. Contacto y Referencias

- **WhatsApp:** +569 99396166
- **Email:** paorioseco@gmail.com
- **YouTube:** @paolarioseco
- **LinkedIn:** linkedin.com/in/paolarioseco
- **Desarrollado por:** sint.cl

### Recursos Externos
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)

---

## 14. Notas para Agentes de IA

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
3. Checkbox de privacidad desmarcado por defecto
4. Estados de loading y feedback visual

### Debugging Común
```bash
# Si hay problemas con Tailwind v4
rm -rf .next && npm run dev

# Si los cambios en content no se reflejan
# Reiniciar servidor (gray-matter lee en build time)
```
