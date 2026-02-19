import Image from "next/image";
import { Heart, Eye, Handshake, MessageCircle } from "lucide-react";
import ContactSection from "@/components/b2c/ContactSection";

const valores = [
  {
    icono: Heart,
    titulo: "Honestidad",
    descripcion: "La verdad como punto de partida",
  },
  {
    icono: Eye,
    titulo: "Transparencia",
    descripcion: "Sin velos ni complicaciones",
  },
  {
    icono: Handshake,
    titulo: "Percepción",
    descripcion: "Ver más allá de lo evidente",
  },
  {
    icono: MessageCircle,
    titulo: "Cercanía",
    descripcion: "Conexión humana genuina",
  },
];

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink">
          Sobre mí
        </h1>
      </section>

      {/* Bio Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Foto */}
            <div className="order-1 md:order-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/paola.jpg"
                  alt="Paola Rioseco"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Contenido */}
            <div className="order-2 md:order-2">
              <span className="text-micro text-primary block mb-4">
                TU GUÍA EN ESTE CAMINO
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Paola Rioseco
              </h2>

              <div className="space-y-5 text-ink/80 text-lg leading-relaxed">
                <p>
                  Soy Paola Rioseco, especialista en transformación emocional y claridad interna. Mi propósito es ayudar a líderes, equipos y personas a transitar desde la sobrecarga y el agotamiento hacia una vida consciente. A través de metodologías directas, facilito el orden mental necesario para enfrentar la presión, mejorar la toma de decisiones y desenvolverse en contextos humanos de alta exigencia, traduciendo experiencias complejas en una comprensión simple y aplicable.
                </p>

                <p>
                  Mi enfoque se cimenta en la "Responsabilidad Radical" como motor para que recuperes tu soberanía consciente. Al asumir la innegable ley de causa y efecto y aplicar el principio de correspondencia (como es adentro, es el entorno), comprenderás que la verdadera resiliencia operativa y personal no depende de las circunstancias externas. Te acompaño a desactivar tus automatismos emocionales para que dejes de reaccionar frente al conflicto y comiences a dirigir tu realidad con seguridad y coherencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 px-4 md:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Principios de trabajo
            </h2>
          </div>

          {/* Valores Grid */}
          <div className="grid grid-cols-2 gap-6">
            {valores.map((valor) => {
              const Icono = valor.icono;
              return (
                <div
                  key={valor.titulo}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icono className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-1">
                    {valor.titulo}
                  </h3>
                  <p className="text-sm text-muted">{valor.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fricción Comercial (BRAND-002) */}
      <section className="py-16 px-4 md:px-8 bg-stone-100 border-y border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-stone-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center mt-1">
                <svg className="w-5 h-5 text-ink/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink mb-4">
                  Para quién NO es esto
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  Este espacio ofrece verdad, no consuelo. Mi trabajo no es para quienes buscan soluciones pasivas, operan desde la queja o el victimismo, ni para quienes esperan que su camino sea resuelto mediante la futurología o la adivinación. Este es un proceso diseñado estrictamente para quienes están dispuestos a abandonar las excusas y hacerse cargo del 100% de su propia evolución.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <ContactSection />
    </div>
  );
}
