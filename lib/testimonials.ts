/**
 * Testimonios - fuente única (extraídos de components/b2c/Testimonials.tsx).
 * Cada landing muestra exactamente 2, distintos entre páginas.
 */

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Paola Rioseco es una de las mujeres más asombrosas que conozco. Paola tiene una capacidad única de poder extraer el talento de las personas, enseñarselo y potenciarlo. El mensaje de Paola está fundido en paz, amor y esperanza; y puedo dar fe que mi vida tuvo un antes y un después desde que compartió su sabiduría conmigo.",
    author: "Iván Aravena",
    role: "Agile Project Management",
  },
  {
    quote:
      "Paola, tu gran labor despertó en mí el potencial creativo humano, transformando mayor conciencia en aumento de mi vitalidad y una conexión espiritual profunda. Mueves energías y las potencias en herramientas poderosas para el autoconocimiento. Gracias!",
    author: "José Antonio Villalobos",
    role: "Empresario",
  },
  {
    quote:
      "Paola Rioseco's gifts of empathy, insight and wisdom are perfectly suited to her role as a spiritual coach and I would recommend her to everyone. I don't feel there is anyone living today that wouldn't benefit from sitting down with Paola for an hour or two. You will leave much happier and lighter and tooled up to take on life's challenges.",
    author: "Lisa Archibald",
    role: "Hospitality & Wellness professional",
  },
  {
    quote:
      "Paola ha sido un pilar y un apoyo fundamental en mi vida. Me ha llevado por las partes más oscuras de mi alma y también las más luminosas, y el reconocerlas me ha permitido tomar real conciencia de quién soy y el para qué de muchas situaciones complicadas en mi vida. Junto a Paola el camino se hace más llevadero, ella es sin duda un ser de luz enviado a ayudarnos. Eternamente agradecida de haberla encontrado.",
    author: "Jenny Ossandón",
    role: "Traductora e Intérprete",
  },
  {
    quote:
      "Paola has a huge heart and offers herself in dedicated service to the world. She is a wise and deeply spiritual teacher. She is an effective healer on many levels. Warning: Only engage Paola if you are truly willing to experience change in your life! :)",
    author: "Tina Thrussell",
    role: "Mindfulness & Sound Wellness",
  },
];

// Pares de testimonios por servicio (índices en TESTIMONIALS), distintos entre páginas.
const BY_SLUG: Record<string, [number, number]> = {
  "workshop-vida-consciente": [0, 1],
  mentoring: [3, 0],
  tarot: [2, 4],
};

/** Devuelve exactamente 2 testimonios para un servicio. */
export function getTestimonials(slug: string): Testimonial[] {
  const [a, b] = BY_SLUG[slug] ?? [0, 1];
  return [TESTIMONIALS[a], TESTIMONIALS[b]];
}
