const TESTIMONIALS_DATA = [
  {
    quote: "Paola Rioseco es una de las mujeres más asombrosas que conozco. Paola tiene una capacidad única de poder extraer el talento de las personas, enseñarselo y potenciarlo. El mensaje de Paola está fundido en paz, amor y esperanza; y puedo dar fe que mi vida tuvo un antes y un después desde que compartió su sabiduría conmigo.",
    author: "Iván Aravena",
    role: "Agile Project Management"
  },
  {
    quote: "Paola, tu gran labor despertó en mí el potencial creativo humano, transformando mayor conciencia en aumento de mi vitalidad y una conexión espiritual profunda. Mueves energías y las potencias en herramientas poderosas para el autoconocimiento. Gracias!",
    author: "José Antonio Villalobos",
    role: "Empresario"
  },
  {
    quote: "Paola Rioseco's gifts of empathy, insight and wisdom are perfectly suited to her role as a spiritual coach and I would recommend her to everyone. I don't feel there is anyone living today that wouldn't benefit from sitting down with Paola for an hour or two. You will leave much happier and lighter and tooled up to take on life's challenges.",
    author: "Lisa Archibald",
    role: "Hospitality & Wellness professional"
  },
  {
    quote: "Paola ha sido un pilar y un apoyo fundamental en mi vida. Me ha llevado por las partes más oscuras de mi alma y también las más luminosas, y el reconocerlas me ha permitido tomar real conciencia de quién soy y el para qué de muchas situaciones complicadas en mi vida. Junto a Paola el camino se hace más llevadero, ella es sin duda un ser de luz enviado a ayudarnos. Eternamente agradecida de haberla encontrado.",
    author: "Jenny Ossandón",
    role: "Traductora e Intérprete"
  },
  {
    quote: "Paola has a huge heart and offers herself in dedicated service to the world. She is a wise and deeply spiritual teacher. She is an effective healer on many levels. Warning: Only engage Paola if you are truly willing to experience change in your life! :)",
    author: "Tina Thrussell",
    role: "Mindfulness & Sound Wellness"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 md:px-8 bg-stone-100">
      <div className="max-w-6xl mx-auto">
        <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
          Testimonios
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-10">
          Lo que dicen mis clientes
        </h2>

        {/* Scroll Snap Horizontal */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide -mx-4 px-4 md:-mx-8 md:px-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-white rounded-2xl p-8 border border-ink/10 shadow-sm flex flex-col justify-between"
            >
              {/* Comilla decorativa */}
              <div className="text-primary/20 text-6xl font-serif leading-none mb-4">
                &ldquo;
              </div>
              
              {/* Cita */}
              <p className="font-serif italic text-ink text-lg leading-relaxed mb-6 flex-grow">
                {testimonial.quote}
              </p>

              {/* Autor */}
              <div className="pt-4 border-t border-ink/10">
                <p className="font-sans font-medium text-ink">
                  {testimonial.author}
                </p>
                <p className="font-sans text-sm text-muted">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de scroll (opcional visual) */}
        <p className="text-center text-sm text-muted mt-4 md:hidden">
          Desliza para ver más testimonios
        </p>
      </div>
    </section>
  );
}
