import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, Handshake, MessageCircle, ArrowRight } from "lucide-react";

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

              <div className="space-y-4 text-ink/70 text-lg leading-relaxed">
                <p>
                  Soy una persona natural, no me siento especial. Prefiero conectar 
                  desde la naturalidad, con simpleza y cercanía. Mi don es la 
                  percepción: entiendo el real origen del conflicto.
                </p>

                <p>
                  No trabajo desde la complicación. Vamos a la raíz, sacamos el 
                  tapón y empieza a fluir lo demás. Limpieza del disco duro emocional, 
                  orden, y herramientas concretas.
                </p>

                <p className="font-medium text-ink">
                  No prometo soluciones mágicas. Prometo claridad, estructura y verdad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Enfoque Section */}
      <section className="py-20 px-4 md:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Ingeniería Social y Consciencia
            </h2>
            <p className="text-ink/70 text-lg max-w-2xl mx-auto">
              Decodificamos la programación social que nos limita para recuperar 
              nuestra esencia natural.
            </p>
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

      {/* CTA Final */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
            ¿Comenzamos?
          </h2>

          <p className="text-ink/70 text-lg mb-8">
            Un primer paso es todo lo que necesitas para empezar a transformar tu vida.
          </p>

          <Link
            href="https://wa.me/56999396166?text=Hola%20Paola,%20quiero%20conocer%20más%20sobre%20tu%20acompañamiento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-sans font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-lg"
          >
            Escríbeme por WhatsApp
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
