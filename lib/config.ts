/**
 * Configuración Centralizada - Paola Rioseco V2.1
 * Single Source of Truth para datos contacto y mensajes obligatorios
 */

// WhatsApp Configuration (PRIV-002 / BRAND-003)
export const WHATSAPP_CONFIG = {
  number: "56999396166",
  get link() {
    return `https://wa.me/${this.number}`;
  },
  // Texto OBLIGATORIO de advertencia (no modificar)
  warningText: "Atención directa de Paola. Solo mensajes de texto, no se atienden llamadas de números desconocidos.",
  // Mensajes predefinidos por contexto
  messages: {
    default: encodeURIComponent("Hola Paola, estuve revisando tu página y me gustaría consultar sobre las Clases de Vida Consciente."),
    b2b: encodeURIComponent("Hola Paola, escribo en representación de mi organización. Me interesa conocer más sobre el programa de Gestión del Miedo..."),
    mentoring: encodeURIComponent("Hola Paola, quiero agendar una sesión de mentoring"),
    tarot: encodeURIComponent("Hola Paola, quiero consultar disponibilidad para tarot"),
    workshop: encodeURIComponent("Hola Paola, quiero reservar mi lugar para el workshop Vida Consciente"),
  },
  getLinkWithText(context: keyof typeof WHATSAPP_CONFIG.messages = 'default'): string {
    return `${this.link}?text=${WHATSAPP_CONFIG.messages[context]}`;
  },
} as const;

// Email Configuration
export const EMAIL_CONFIG = {
  b2c: "paorioseco@gmail.com",
  b2b: "paorioseco@gmail.com",
} as const;

// reCAPTCHA v3 Configuration (PRIV-002)
export const RECAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
  // Score mínimo para considerar humano (0.0 - 1.0)
  minScore: 0.5,
  // Acciones específicas para análisis
  actions: {
    contactB2C: "submit_contact_b2c",
    contactB2B: "submit_contact_b2b",
  },
} as const;

// Ley 21.719 - Protección de Datos Personales
export const PRIVACY_CONFIG = {
  lawReference: "Ley 21.719",
  disclaimerB2B: "Todos los datos son tratados conforme a la Ley 21.719 de Protección de Datos Personales.",
  disclaimerB2C: "© 2026 Paola Rioseco. Conocimiento para la transformación personal.",
  fullNotice: "Autorizo el tratamiento de mis datos personales conforme a la Ley 21.719 y declaro que he leído la política de privacidad. Entiendo que estos datos serán utilizados exclusivamente para coordinar la evaluación diagnóstica de riesgo psicosocial.",
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  b2bEnabled: process.env.NEXT_PUBLIC_ENABLE_B2B === "true",
  b2bLibraryEnabled: process.env.NEXT_PUBLIC_ENABLE_B2B_LIBRARY === "true",
} as const;
