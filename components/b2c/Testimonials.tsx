import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

interface TestimonialsProps {
  items?: Testimonial[];
}

export default function Testimonials({ items = TESTIMONIALS }: TestimonialsProps) {
  const TESTIMONIALS_DATA = items;
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
