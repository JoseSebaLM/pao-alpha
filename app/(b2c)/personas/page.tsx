import Image from "next/image";
import ContactSection from "@/components/b2c/ContactSection";

// Fases del programa Clases de Vida Consciente
const fasesPrograma = [
  {
    numero: "01",
    titulo: "Contexto y Despertar",
    descripcion: "Reconocer el estado actual y la necesidad de cambio consciente.",
  },
  {
    numero: "02",
    titulo: "Autoobservación",
    subtitulo: "(causa y efecto)",
    descripcion: "Identificar patrones y comprender la relación directa entre tus acciones y resultados.",
  },
  {
    numero: "03",
    titulo: "Límites y Auto-respeto",
    descripcion: "Establecer fronteras saludables y valorar tu integridad personal.",
  },
  {
    numero: "04",
    titulo: "Relaciones Conscientes",
    subtitulo: "(principio de correspondencia)",
    descripcion: "Aplicar el 'como es adentro, es afuera' para transformar tus vínculos.",
  },
];

// Bullets de Fricción Comercial en Lenguaje Positivo (BRAND-002)
const fricciones = [
  {
    titulo: "Quienes buscan claridad y orden mental",
    descripcion: "Personas dispuestas a utilizar herramientas de diagnóstico para el autoconocimiento profundo y la toma de decisiones basada en la realidad, soltando la ilusión de predecir el futuro.",
  },
  {
    titulo: "Quienes asumen su Responsabilidad Radical",
    descripcion: "Personas listas para operar bajo la innegable Ley de Causa y Efecto, tomando las riendas de sus actos y reconociéndose como creadores activos de su realidad, lejos de la queja.",
  },
  {
    titulo: "Quienes eligen la soberanía consciente",
    descripcion: 'Personas comprometidas con recuperar su poder interno y total autonomía emocional. Este es un espacio donde se entrega "verdad, no consuelo" para impulsar tu independencia absoluta.',
  },
  {
    titulo: "Quienes están dispuestos al trabajo interno",
    descripcion: "Personas valientes, listas para salir de su zona conocida, observar sus áreas de mejora con honestidad y accionar de forma pragmática para crear una verdadera transformación.",
  },
];

export default function PersonasPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* ============================================
          HERO B2C - Acompañamiento Personal
          ============================================ */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <span className="text-micro text-primary block mb-6 tracking-widest uppercase">
          Transformación Emocional
        </span>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-6 leading-tight">
          Acompañamiento Personal
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed font-sans">
          Un espacio fundamentado en la <span className="text-ink font-medium">Responsabilidad Radical</span> para quienes buscan transformación emocional y claridad interna.
        </p>
      </section>

      {/* ============================================
          SECCIÓN 1: Clases de Vida Consciente
          ============================================ */}
      <section className="py-20 px-4 md:px-8 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contenido texto */}
            <div>
              <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
                Programa de Orden Mental
              </span>
              
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Clases de Vida Consciente
              </h2>
              
              <div className="space-y-4 text-ink/80 text-lg leading-relaxed">
                <p>
                  Las Clases de Vida Consciente no ofrecen consuelo ni fórmulas mágicas; ofrecen claridad y coherencia. Es un espacio diseñado para quienes están listos para abandonar las excusas y asumir una responsabilidad radical sobre su existencia.
                </p>
                <p>
                  Obtendrás el orden mental necesario para dejar de reaccionar ante el caos externo y comenzar a ejercer tu soberanía consciente.
                </p>
              </div>

              {/* CTA Agendar */}
              <div className="mt-8">
                <a
                  href="https://cal.com/paola-rioseco/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-sans font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Sesión
                </a>
              </div>
            </div>

            {/* Las 4 Fases */}
            <div className="space-y-4">
              {fasesPrograma.map((fase) => (
                <div 
                  key={fase.numero}
                  className="bg-white rounded-xl p-6 border border-ink/10 shadow-sm"
                >
                  <div className="flex gap-4">
                    <span className="text-2xl font-serif text-primary/30 font-bold">
                      {fase.numero}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-ink mb-1">
                        {fase.titulo}
                        {fase.subtitulo && (
                          <span className="text-muted text-sm ml-2">{fase.subtitulo}</span>
                        )}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {fase.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN 2: Lectura de Alma
          ============================================ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagen/Visual */}
            <div className="order-2 md:order-1">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-espíritu/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-espíritu/10 flex items-center justify-center">
                    <svg className="w-12 h-12 text-espíritu" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="font-serif text-xl text-ink/60 italic">
                    "Ver con claridad lo que otros no se atreven a mirar"
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido texto */}
            <div className="order-1 md:order-2">
              <span className="text-micro text-espíritu block mb-4 tracking-widest uppercase">
                Servicio de Clarificación
              </span>
              
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Lectura de Alma
              </h2>
              
              <div className="space-y-4 text-ink/80 text-lg leading-relaxed">
                <p>
                  Una radiografía profunda de tus automatismos y tu estado actual. Este servicio traduce tu confusión e incertidumbre en una comprensión directa y aplicable.
                </p>
                <p>
                  Te entrega la claridad operativa exacta para identificar dónde estás cediendo tu poder y cómo el principio de correspondencia está manifestando tus conflictos actuales.
                </p>
                <p className="text-ink font-medium italic">
                  No es un espacio para escuchar lo que quieres oír, sino un espejo para ver con lucidez lo que necesitas resolver.
                </p>
              </div>

              {/* CTA Agendar */}
              <div className="mt-8">
                <a
                  href="https://cal.com/paola-rioseco/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-sans font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MÓDULO FRICCIÓN COMERCIAL (BRAND-002)
          ============================================ */}
      <section className="py-20 px-4 md:px-8 bg-ink text-paper">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Para quién ES este espacio
            </h2>
            
            <p className="text-white/60 text-lg">
              Este trabajo es para quienes están listos para asumir su poder
            </p>
          </div>

          {/* Grid de fricciones */}
          <div className="grid md:grid-cols-2 gap-6">
            {fricciones.map((item, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-serif text-lg text-white mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  {item.titulo}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>

          {/* Nota de cierre */}
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm italic">
              "Si te resonates con estas palabras, estás listo para comenzar."
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECCIÓN DE CONTACTO
          ============================================ */}
      <ContactSection />
    </div>
  );
}
