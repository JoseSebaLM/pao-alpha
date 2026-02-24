import Image from "next/image";

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
          Conoce a tu guía
        </span>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink">
          Sobre mí
        </h1>
      </section>

      {/* Bio Section - Placeholder */}
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

            {/* Contenido Biográfico - Placeholder */}
            <div className="order-2 md:order-2">
              <span className="text-micro text-primary block mb-4">
                TU GUÍA EN ESTE CAMINO
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Paola Rioseco
              </h2>

              <div className="space-y-5 text-ink/80 text-lg leading-relaxed">
                <p>
                  Especialista en transformación emocional y claridad interna. 
                  Mi propósito es ayudar a personas a transitar desde la sobrecarga 
                  y el agotamiento hacia una vida consciente.
                </p>
                
                <p>
                  A través de metodologías directas, facilito el orden mental necesario 
                  para enfrentar la presión, mejorar la toma de decisiones y desenvolverse 
                  en contextos humanos de alta exigencia.
                </p>

                <p className="text-muted italic">
                  Esta sección está en desarrollo. Pronto encontrarás aquí 
                  mi historia completa, mi formación y los principios que 
                  guían mi trabajo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
