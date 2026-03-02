import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_CONFIG } from "@/lib/config";
import CorporateForm from "@/components/b2b/CorporateForm";
import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";

export default function OrganizacionesPage() {
  const isB2BEnabled = process.env.NEXT_PUBLIC_ENABLE_B2B === 'true';

  // Vista "Apagada" - Feature Flag desactivado
  if (!isB2BEnabled) {
    return (
      <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg 
              className="w-8 h-8 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
              />
            </svg>
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Soluciones para Organizaciones
          </h1>
          
          <p className="text-muted text-lg font-sans mb-8">
            Área institucional en etapa de despliegue.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 text-ink rounded-full font-sans font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  // Vista "Encendida" - Landing Gestión del Miedo Corporativo
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Foto de Paola - Rectangular con esquinas redondeadas */}
              <div className="mb-6">
                <div className="w-28 h-36 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/paola.jpg"
                    alt="Paola Rioseco"
                    width={112}
                    height={144}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Nombre y cargo compacto */}
              <p className="font-serif text-primary font-semibold text-lg mb-1">Paola Rioseco</p>
              <p className="text-sm text-muted mb-6">Consultora en Desarrollo Humano y Gestión Emocional</p>
              
              {/* Título Principal - Más prominente */}
              <h1 className="font-serif text-4xl md:text-[2.5rem] text-ink mb-6 leading-[1.15]">
                Gestión del Miedo Corporativo:<br className="hidden md:block" /> Claridad Estratégica y Resiliencia bajo Alta Exigencia
              </h1>
              
              {/* Bajada / Subtítulo */}
              <p className="text-lg text-muted leading-relaxed">
                Desactivamos los bloqueos frente a la incertidumbre y el error. Dotamos a líderes y equipos de herramientas de regulación interna para optimizar la toma de decisiones, consolidando la seguridad psicológica y transformando los desafíos en resiliencia operativa.
              </p>
            </div>
            <div id="contacto" className="bg-white rounded-2xl p-8 border border-ink/10 shadow-sm scroll-mt-24">
              <CorporateForm />
            </div>
          </div>
        </div>
      </section>

      {/* Tarjetas de Concepto - El costo invisible */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              El costo invisible de la incertidumbre organizacional
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-ink/10 flex flex-col">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-serif text-xl text-ink mb-3">Seguridad Psicológica</h3>
              <p className="text-muted text-sm leading-relaxed flex-grow">
                Consolida un entorno donde los colaboradores operen libres del miedo al error, fortaleciendo la cohesión de equipos y la claridad mental para una óptima toma de decisiones.
              </p>
              <a
                href={WHATSAPP_CONFIG.getLinkWithText("b2b")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Consultar por Seguridad Psicológica
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-ink/10 flex flex-col">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-serif text-xl text-ink mb-3">Resiliencia Operativa</h3>
              <p className="text-muted text-sm leading-relaxed flex-grow">
                Dota a tu organización de la capacidad para sostener el rendimiento ante contextos de alta exigencia. Mediante la regulación emocional, la presión se transforma en un motor para el bienestar organizacional.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hola Paola, quiero desarrollar Resiliencia Operativa en mi equipo para sostener el rendimiento ante la alta exigencia. ¿Podemos conversar sobre una intervención a medida?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Consultar por Resiliencia Operativa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-ink/10 flex flex-col">
              <div className="text-3xl mb-4">⚠️</div>
              <h3 className="font-serif text-xl text-ink mb-3">Riesgo Psicosocial</h3>
              <p className="text-muted text-sm leading-relaxed flex-grow">
                Mitiga la sobrecarga y los automatismos emocionales que desgastan a líderes y equipos. Una adecuada gestión de riesgo psicosocial previene los conflictos interpersonales y asegura un clima laboral productivo.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hola Paola, necesito evaluar y mitigar los Riesgos Psicosociales en mi organización. Me interesa conocer cómo puede ayudarme a cumplir con la normativa y proteger a mi equipo.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Consultar por Riesgos Psicosociales
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología de Intervención */}
      <section className="py-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
              Metodología
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
              Metodología de Intervención: Claridad Estratégica y Gestión Emocional
            </h2>
            <p className="text-muted leading-relaxed max-w-3xl mx-auto">
              Aplico aprendizaje experiencial para reinterpretar desafíos y restaurar el orden mental. En 4 fases, transformo percepciones rápidamente para que los equipos operen con éxito bajo presión.
            </p>
          </div>

          {/* Las 4 Fases */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="flex gap-4 p-6 bg-white rounded-xl border border-ink/10">
              <span className="text-3xl font-serif text-primary/30">01</span>
              <div>
                <h4 className="font-medium text-ink mb-2">Diagnóstico de Automatismos</h4>
                <p className="text-sm text-muted">Identificamos bloqueos y desgaste ante la incertidumbre, eliminando las barreras invisibles que frenan la productividad y el bienestar del capital humano.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-ink/10">
              <span className="text-3xl font-serif text-primary/30">02</span>
              <div>
                <h4 className="font-medium text-ink mb-2">Traducción y Claridad Mental</h4>
                <p className="text-sm text-muted">Desactivamos el estado de alerta para simplificar lo complejo, permitiendo que el equipo lidere con estrategia en lugar de reaccionar bajo presión.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-ink/10">
              <span className="text-3xl font-serif text-primary/30">03</span>
              <div>
                <h4 className="font-medium text-ink mb-2">Responsabilidad Radical</h4>
                <p className="text-sm text-muted">Erradicamos la queja y la evasión mediante la ley de causa y efecto, empoderando a cada colaborador para que sea dueño absoluto de sus resultados.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-ink/10">
              <span className="text-3xl font-serif text-primary/30">04</span>
              <div>
                <h4 className="font-medium text-ink mb-2">Consolidación Operativa</h4>
                <p className="text-sm text-muted">Instalamos hábitos de autorregulación para blindar la seguridad psicológica, garantizando equipos cohesionados y de alto rendimiento en el largo plazo.</p>
              </div>
            </div>
          </div>

          {/* Formatos de Implementación */}
          <div className="bg-white rounded-2xl p-8 border border-ink/10">
            <h3 className="font-serif text-2xl text-ink mb-8 text-center">Formatos de Implementación</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-ink mb-2">Programas Organizacionales</h4>
                <p className="text-sm text-muted mb-4">Talleres y charlas enfocados en la gestión emocional y comunicación consciente para equipos corporativos.</p>
                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hola Paola, me interesan los Programas Organizacionales para mi equipo. Quiero conocer más sobre los talleres de gestión emocional y comunicación consciente.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar por Programas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-medium text-ink mb-2">Soporte a Instituciones Educativas</h4>
                <p className="text-sm text-muted mb-4">Programas de apoyo socioemocional para docentes y equipos directivos, orientados a la convivencia escolar.</p>
                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hola Paola, represento a una institución educativa y necesito apoyo socioemocional para docentes. Me interesa fortalecer la convivencia escolar y el bienestar de nuestro equipo.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar para Instituciones Educativas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-medium text-ink mb-2">Consultoría Estratégica</h4>
                <p className="text-sm text-muted mb-4">Intervenciones profundas de acompañamiento para líderes en procesos de cambio institucional y alta exigencia.</p>
                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hola Paola, soy líder en mi organización y necesito Consultoría Estratégica para navegar un proceso de cambio institucional. Busco acompañamiento personalizado de alto nivel.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar por Consultoría Estratégica
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Inicie el cambio en su organización
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Conversemos sobre los desafíos de su equipo. Diseñaremos una intervención a la medida 
            para desactivar bloqueos, fortalecer la comunicación y restaurar la seguridad psicológica 
            en su entorno de trabajo.
          </p>
          <a
            href={WHATSAPP_CONFIG.getLinkWithText('b2b')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-sans font-medium hover:bg-[#128C7E] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Iniciar Conversación
          </a>
          <p className="text-sm text-stone-500 mt-4">
            Atención directa de Paola. Solo mensajes de texto, no se atienden llamadas de números desconocidos.
          </p>
        </div>
      </section>

      <FloatingWhatsApp context="b2b" />
    </main>
  );
}
