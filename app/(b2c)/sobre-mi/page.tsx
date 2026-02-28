import Image from "next/image";
import { Metadata } from "next";
import YouTubeEmbed from "@/components/content/YouTubeEmbed";

export const metadata: Metadata = {
  title: "Sobre Mí | Paola Rioseco",
  description: "Conoce a Paola Rioseco, especialista en transformación emocional y claridad interna. Descubre su metodología para transitar hacia una vida consciente.",
};

// Datos de apariciones en medios (fácilmente extensible)
const mediaAppearances = [
  {
    videoId: "dQw4w9WgXcQ",
    title: "Entrevista: Transformación Emocional",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Gestión del Miedo en Contextos de Alta Exigencia",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "El Orden Mental como Herramienta de Vida",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Conversaciones sobre Consciencia y Coherencia",
  },
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
          Sobre mí
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
                  Soy Consultora en Desarrollo Humano, Especialista en Gestión Emocional, escritora y conferencista. Tras años de profundo estudio de la conducta humana y los procesos emocionales, mi propósito es acompañar a líderes empresariales, equipos de trabajo y personas a transitar del automatismo a la eficiencia consciente.
                </p>

                <p>
                  A través de mis programas y el Método Expansivo de Autoconocimiento, mi objetivo central es facilitar resultados sólidos y sostenibles en el menor tiempo posible. Acompaño a las personas a desenmascarar sus bloqueos y potenciar sus talentos innatos a partir de procesos prácticos, fundamentados en cinco pilares innegociables: auto-respeto, auto-cuidado, auto-valoración, auto-conocimiento y auto-liderazgo.
                </p>

                <p>
                  Durante este proceso, mis clientes y alumnos experimentan una clarificación profunda de las emociones, automatismos y creencias preestablecidas que han estancado su desarrollo. Al desactivar estos patrones de desgaste, se genera una comprensión auténtica de sí mismos, permitiéndoles erradicar el victimismo y recuperar, de manera definitiva, su soberanía consciente y su poder emocional.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaAppearances.map((video, index) => (
              <div key={index} className="group">
                <YouTubeEmbed videoId={video.videoId} title={video.title} />
                <h3 className="font-sans text-sm text-muted mt-3 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
