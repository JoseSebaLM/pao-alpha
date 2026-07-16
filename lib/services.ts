/**
 * Fuente única de verdad de servicios B2C - Paola Rioseco
 *
 * Toda landing, checkout y página de gracias lee desde aquí.
 * Los textos base salen de la antigua `app/(b2c)/servicios/page.tsx`, recortados.
 *
 * Pendientes del operador (reunión jueves PM):
 *  - Precios reales de mentoring y tarot (hoy: 0 + "Consultar").
 *  - Fecha del próximo workshop (campo `nextDate`).
 *  - Slugs reales de Cal.com para mentoring y tarot.
 * Todos marcados con `// TODO(operador)`.
 */

export type ServiceSlug = "workshop-vida-consciente" | "mentoring" | "tarot";

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  includes: string[];
  priceCLP: number;
  priceLabel: string;
  durationLabel: string;
  modality: string;
  /** Slug de Cal.com (ej: "paola-rioseco/mentoring"). null = sin agenda online (workshop usa confirmación de cupo). */
  calLink: string | null;
  /**
   * Token de color del sistema de diseño (globals.css `@theme`).
   * Nota: el token es `espiritu` SIN acento (`--color-espiritu`), no "espíritu".
   */
  color: "primary" | "mente" | "espiritu";
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** Fecha del próximo evento en texto (opcional). Solo se usa si el operador la entrega. */
  nextDate?: string;
}

export const SERVICES: Record<ServiceSlug, Service> = {
  "workshop-vida-consciente": {
    slug: "workshop-vida-consciente",
    name: "Vida Consciente: Un día a la vez",
    shortName: "Workshop",
    tagline: "No es una crisis personal, es un cambio de ciclo colectivo.",
    description:
      "Workshop online en vivo de 60 minutos sobre autoconciencia, límites y coherencia interna. Herramientas concretas para sostener el día a día en tiempos de cambio.",
    includes: [
      "Sesión en vivo de 60 minutos",
      "Ejercicios prácticos de autoconciencia y límites",
      "Marco de ciclos y coherencia interna",
      "Espacio de preguntas al cierre",
    ],
    priceCLP: 20000,
    priceLabel: "$20.000 CLP",
    durationLabel: "60 minutos",
    modality: "Online en vivo",
    calLink: null,
    color: "primary",
    // TODO(operador): definir fecha del próximo workshop (ej: "26 de agosto 2026").
    nextDate: undefined,
    faq: [
      {
        q: "¿Es online o presencial?",
        a: "Es 100% online en vivo. Recibes el enlace de conexión por email tras confirmar tu cupo.",
      },
      {
        q: "¿Qué pasa si no puedo asistir en vivo?",
        a: "El cupo es para la sesión en vivo. Si surge un imprevisto, escríbenos por WhatsApp y coordinamos.",
      },
      {
        q: "¿Necesito conocimientos previos?",
        a: "No. El workshop está pensado para cualquier persona que quiera ordenar su día a día con más consciencia.",
      },
    ],
    metaTitle: "Workshop Vida Consciente | Paola Rioseco",
    metaDescription:
      "Workshop online en vivo de 60 minutos sobre autoconciencia, límites y coherencia interna. Cupo limitado.",
  },

  mentoring: {
    slug: "mentoring",
    name: "Mentoring Individual",
    shortName: "Mentoring",
    tagline: "Sesiones de Orden Mental para quienes buscan verdad, no consuelo.",
    description:
      "Acompañamiento 1:1 donde vamos a la raíz. Limpieza del disco duro emocional, recuperación de autonomía y herramientas concretas de Arquitectura de Comportamiento.",
    includes: [
      "Autoconocimiento profundo",
      "Recuperar poder emocional",
      "Herramientas concretas y accionables",
      "Libertad interna",
    ],
    // TODO(operador): confirmar precio real del mentoring.
    priceCLP: 0,
    priceLabel: "Consultar", // TODO(operador)
    durationLabel: "60 minutos",
    modality: "Online 1:1",
    // TODO(operador): la cuenta Cal.com aún no existe. Dejar en null hasta
    // tenerla; un slug estimado rompería el embed de /gracias.
    calLink: null,
    color: "mente",
    faq: [
      {
        q: "¿Para quién es el mentoring?",
        a: "Para quienes buscan ir a la raíz y trabajar con verdad, no consuelo pasivo ni respuestas mágicas.",
      },
      {
        q: "¿Cuántas sesiones necesito?",
        a: "Depende de cada proceso. En la primera sesión definimos juntos el camino según tu situación.",
      },
      {
        q: "¿Es terapia psicológica?",
        a: "No. Es un acompañamiento basado en Arquitectura de Comportamiento y Orden Mental, complementario a un proceso terapéutico.",
      },
    ],
    metaTitle: "Mentoring Individual | Paola Rioseco",
    metaDescription:
      "Acompañamiento 1:1 de Orden Mental: vamos a la raíz para recuperar autonomía y claridad. Sesiones online.",
  },

  tarot: {
    slug: "tarot",
    name: "Tarot como herramienta de orden",
    shortName: "Tarot",
    tagline: "Tarot para autoconocimiento y claridad, no predicción.",
    description:
      "Una herramienta para ordenar lo que parece caos mediante el espejo del inconsciente. El foco está en autoconocimiento y clarificación, no en predicción sin antecedentes.",
    includes: [
      "Lectura enfocada en autoconocimiento",
      "Claridad sobre tu situación actual",
      "El espejo del inconsciente como herramienta de orden",
    ],
    // TODO(operador): confirmar precio real del tarot.
    priceCLP: 0,
    priceLabel: "Consultar", // TODO(operador)
    durationLabel: "60 minutos",
    modality: "Online 1:1",
    // TODO(operador): la cuenta Cal.com aún no existe. Dejar en null hasta
    // tenerla; un slug estimado rompería el embed de /gracias.
    calLink: null,
    color: "espiritu",
    faq: [
      {
        q: "¿El tarot predice el futuro?",
        a: "No. Aquí el tarot es una herramienta de autoconocimiento y orden, no de predicción sin antecedentes.",
      },
      {
        q: "¿Cómo es una sesión?",
        a: "Es una conversación guiada por las cartas para ordenar lo que parece caos y encontrar claridad en tu camino.",
      },
      {
        q: "¿Es compatible con el mentoring?",
        a: "Sí. Muchas personas combinan ambos: el tarot abre la conversación y el mentoring profundiza el proceso.",
      },
    ],
    metaTitle: "Tarot Consciente | Paola Rioseco",
    metaDescription:
      "Tarot como herramienta de autoconocimiento y orden, no de predicción. Sesiones online 1:1 para encontrar claridad.",
  },
};

/**
 * Devuelve el servicio cuyo slug coincide, o `undefined` si no existe.
 */
export const getService = (slug: string): Service | undefined =>
  (SERVICES as Record<string, Service>)[slug];

/** Lista de todos los servicios, útil para índices y `generateStaticParams`. */
export const ALL_SERVICES: Service[] = Object.values(SERVICES);
