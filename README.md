# Paola Rioseco | Vida Consciente
## Project Alpha - Rediseño Web 2026

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F)](https://sanity.io/)

**Live Preview:** `http://localhost:3000` (local)  
**Prod:** Pendiente deploy  
**Design System:** SINT Stack (Glass Box Architecture)

---

## 🎯 Sobre el Proyecto

Plataforma de "Conocimiento de Vida" para Paola Rioseco - mentora de autoconocimiento y transformación personal. 

**No es un sitio de terapia, es una biblioteca viva y academia.**

- **Arquitectura:** Knowledge-First Platform
- **UX Driver:** Claridad Mental, Estructura, "Cero Ruido"
- **Visual Language:** Editorial (Serif moderna + Sans geométrica)

---

## 🎨 Sistema de Diseño

**Colores de Marca:**
```css
Primary (CTAs):    #C01D65 (Magenta)
Mente:             #273DA0 (Azul)  
Cuerpo:            #FB4C00 (Naranja)
Espíritu:          #9B18B9 (Violeta)
Paper (Fondo):     #FDFCF8
Ink (Texto):       #1C1917

## 🏗️ Estructura del Proyecto

/app
  ├── page.tsx              # Home (Hero + Triacoma)
  ├── layout.tsx            # Root layout + fuentes
  ├── globals.css           # Tailwind v4 config
  ├── /biblioteca           
  │   ├── page.tsx          # Grid artículos + filtros
  │   └── [slug]/page.tsx   # Vista lectura artículo
  ├── /servicios            # Workshop Feb 26 + Mentoring
  └── /sobre-mi             # Bio Paola
  
/components
  ├── /layout
  │   ├── Header.tsx        # Navegación scroll-aware
  │   ├── Footer.tsx        # CTA final + links
  │   └── TriacomaNav.tsx   # Navegación 3 pilares
  └── /content
      └── ConceptCard.tsx   # Tarjeta artículo reutilizable

/public
  ├── logo.png              # Logo Paola Rioseco
  └── paola.jpg             # Foto corporativa

🚀 Stack Tecnológico
Frontend:

    Next.js 16 (App Router + Turbopack)
    React 19 + TypeScript
    Tailwind CSS v4 (nuevo sistema @theme)
    Framer Motion (micro-interacciones)
    Lucide React (iconografía)

Backend (Pendiente):

    Sanity.io v3 (CMS Headless)
    Portable Text (rich content)
    GraphQL API

Deploy:

    Cloudflare Pages (frontend)
    Sanity Cloud (CMS)

👥 Equipo & Roles (SINT Methodology)
Table
Copy
Rol	Responsable	Motor IA
Lead Architect	Gemini 3 Pro	Estrategia, UX Governance, Data Schema
Frontend Dev	José Seba	Kimi Code (Moonshot) - Vibe Coding
Backend Dev	Chuchu	Claude Code (Anthropic) - Sanity CMS
Filosofía: K.I.S.S. (Keep It Simple, Stupid) - Glass Box - Precision Delivery
🛠️ Setup para Developers
1. Instalación
bash
Copy

git clone https://github.com/JoseSebaLM/pao-alpha.git
cd pao-alpha
npm install

2. Variables de Entorno (para Backend)
Crear .env.local:
env
Copy

NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_token

3. Run Dev
bash
Copy

npm run dev
# http://localhost:3000

📋 Checklist Backend (Chuchu)

    [ ] Crear proyecto Sanity (free tier)
    [ ] Definir schemas: post, workshop, collection
    [ ] Migrar 3 artículos iniciales desde .docx
    [ ] Configurar API endpoints (GraphQL)
    [ ] Conectar frontend (reemplazar datos estáticos)
    [ ] Test deploy integrado

Documentación técnica detallada: Ver comentarios en app/biblioteca/page.tsx y schemas en /sanity (cuando se creen).
📅 Deadline Crítico
Workshop Vida Consciente: 26 Febrero 2026
Deploy producción: 20 Febrero 2026 (6 días antes para testing)
📞 Contacto & Links

    WhatsApp: +569 99396166
    YouTube: @paolarioseco
    Methodology: SINT Agency - Single Source of Truth




