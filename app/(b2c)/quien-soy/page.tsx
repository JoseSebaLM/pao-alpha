import Image from "next/image";
import { Metadata } from "next";
import YouTubeEmbed from "@/components/content/YouTubeEmbed";
import Testimonials from "@/components/b2c/Testimonials";

export const metadata: Metadata = {
  title: "Quien Soy | Paola Rioseco",
  description: "Conoce a Paola Rioseco, especialista en transformación emocional y claridad interna. Descubre su metodología para transitar hacia una vida consciente.",
};

// Datos de apariciones en medios
const VIDEOS_DATA = [
  {
    videoId: "G8XEcK105uk",
    title: "Conferencia sobre el Miedo. Calgary, Canadá",
    description: "Exploración profunda sobre cómo el miedo paraliza y las herramientas prácticas para transformarlo en un motor de cambio."
  },
  {
    videoId: "Cdh8udDZ9X4",
    title: "La importancia del verbo",
    description: "El impacto de nuestras palabras en la creación de nuestra realidad y cómo aprender a comunicarnos desde la consciencia."
  },
  {
    videoId: "hPkA8HfAXto",
    title: "7 Principios del Universo",
    description: "Un recorrido por las leyes universales que rigen nuestra existencia y cómo alinearnos con ellas para fluir en coherencia."
  },
  {
    videoId: "132owakqDE0",
    title: "Cómo enfrentar los conflictos desde la serenidad",
    description: "Estrategias de regulación emocional para abordar los desafíos interpersonales diarios sin perder nuestro centro de paz."
  }
];

export default function SobreMiPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
          Conoce a tu guía
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink">
          Quien Soy
        </h1>
      </section>

      {/* Bio Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Foto */}
            <div className="order-1">
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

            {/* Contenido Biográfico con clases prose */}
            <div className="order-2">
              <span className="text-micro text-primary block mb-4">
                TU GUÍA EN ESTE CAMINO
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Paola Rioseco
              </h2>

              <div className="prose prose-lg max-w-none
                prose-p:text-muted prose-p:font-sans prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-ink prose-strong:font-medium
                prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/30 hover:prose-a:decoration-primary">
                <p>
                  Soy Consultora en Desarrollo Humano y Gestión Emocional, escritora y conferencista.
                </p>

                <p>
                  Mi propósito es acompañar a personas, líderes y organizaciones a transitar desde la reacción automática hacia una verdadera eficiencia consciente.
                </p>

                <p>
                  A través de mis programas y el Método Expansivo de Autoconocimiento, facilito resultados sostenibles en el menor tiempo posible. Te acompaño a desenmascarar bloqueos y potenciar tus talentos a partir de procesos prácticos, fundamentados en cinco pilares innegociables: auto-respeto, auto-cuidado, auto-valoración, auto-conocimiento y auto-liderazgo.
                </p>

                <p>
                  Mi compromiso es entregar verdad, no consuelo. Al desactivar los patrones de desgaste emocional, mis clientes experimentan una clarificación profunda que les permite erradicar el victimismo, fortalecer la toma de decisiones y recuperar, de manera definitiva, su soberanía consciente y su seguridad psicológica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <hr className="border-ink/10 my-12" />
      </div>

      {/* Apariciones en Medios */}
      <section className="py-12 px-4 md:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
            En los medios
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Apariciones Destacadas
          </h2>
          <p className="text-muted font-sans mb-10 max-w-2xl">
            Entrevistas y conversaciones donde comparto herramientas prácticas
            sobre gestión emocional, claridad mental y transformación personal.
          </p>

          {/* Grilla responsive de videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEOS_DATA.map((video, index) => (
              <div key={index} className="group">
                <YouTubeEmbed videoId={video.videoId} title={video.title} />
                <h3 className="font-serif text-xl font-bold text-ink mt-5 mb-2">
                  {video.title}
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  {video.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <Testimonials />
    </main>
  );
}
