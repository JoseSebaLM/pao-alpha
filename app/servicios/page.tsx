import Link from "next/link";
import { Calendar, Users, Check, Sparkles, ArrowRight } from "lucide-react";

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-4">
          Servicios
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-sans">
          Acompañamiento para tu transformación
        </p>
      </section>

      {/* Section 1 - Workshop Destacado */}
      <section className="py-20 px-4 md:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-primary/10">
            {/* Label */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full">
                <Calendar className="w-4 h-4" />
                Próximo evento · 26 Febrero 2026
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cuerpo/10 text-cuerpo text-xs font-medium rounded-full">
                <Users className="w-3 h-3" />
                Cupo limitado
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Vida Consciente: Un día a la vez
            </h2>

            {/* Description */}
            <p className="text-ink/70 text-lg leading-relaxed mb-8 max-w-2xl">
              Workshop de 60 minutos. No estamos viviendo una crisis personal, 
              sino un cambio de ciclo colectivo. Eje transversal: autoconciencia, 
              límites, ciclos y coherencia interna.
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="font-serif text-3xl text-primary font-semibold">
                $20.000 CLP
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/56999396166?text=Hola%20Paola,%20quiero%20reservar%20mi%20lugar%20para%20el%20workshop%20Vida%20Consciente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-sans font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Reservar mi lugar
              </Link>
              <Link
                href="/biblioteca/workshop-vida-consciente"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-ink/20 text-ink font-sans font-medium rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                Ver programa detallado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Mentoring 1:1 */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">
                Mentoring Individual
              </h2>
              <p className="text-primary font-medium mb-6">
                Para quienes buscan verdad, no consuelo
              </p>
              <p className="text-ink/70 text-lg leading-relaxed mb-8">
                Sesiones de clarificación profunda donde vamos a la raíz. 
                Limpieza del disco duro emocional, recuperación de autonomía 
                y herramientas concretas.
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {[
                  "Autoconocimiento profundo",
                  "Recuperar poder emocional",
                  "Libertad interna",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-ink/80"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mente/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-mente" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="https://wa.me/56999396166?text=Hola%20Paola,%20quiero%20agendar%20una%20sesión%20de%20mentoring"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mente text-white font-sans font-medium rounded-full hover:bg-mente/90 transition-colors"
              >
                Agendar sesión
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-stone-100 rounded-2xl aspect-square md:aspect-[4/5] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-mente/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-mente" />
                </div>
                <p className="font-serif text-xl text-ink/60">
                  "El encuentro contigo mismo es el inicio de todo cambio"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Tarot Consciente */}
      <section className="py-20 px-4 md:px-8 bg-espíritu/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-espíritu/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-espíritu" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Tarot como herramienta de orden
          </h2>

          <p className="text-ink/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Enfoque en autoconocimiento y clarificación, no adivinación 
            sin antecedentes. Una herramienta para ordenar lo que parece caos 
            y encontrar claridad en tu camino.
          </p>

          <Link
            href="https://wa.me/56999396166?text=Hola%20Paola,%20quiero%20consultar%20disponibilidad%20para%20tarot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-espíritu text-white font-sans font-medium rounded-full hover:bg-espíritu/90 transition-colors"
          >
            Consultar disponibilidad
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
