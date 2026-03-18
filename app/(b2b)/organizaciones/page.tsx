import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_CONFIG } from "@/lib/config";
import CorporateForm from "@/components/b2b/CorporateForm";
import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";
import Testimonials from "@/components/b2c/Testimonials";

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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Título Principal - Más prominente */}
              <h1 className="font-serif text-4xl md:text-[2.5rem] text-ink mb-6 leading-[1.15]">
                Gestión Emocional, Claridad Estratégica y Resiliencia ante la incertidumbre.
              </h1>
              
              {/* Bajada / Subtítulo */}
              <p className="text-lg text-muted leading-relaxed">
                Desactivamos los bloqueos frente a la incertidumbre y el error. Dotamos a líderes y equipos de herramientas de regulación interna para optimizar la toma de decisiones, consolidando la seguridad psicológica y transformando los desafíos en resiliencia operativa.
              </p>

              {/* Badge de Autoridad - Firma horizontal */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shrink-0">
                  <Image
                    src="/pao-1.png"
                    alt="Paola Rioseco"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-[center_15%]"
                    priority
                  />
                </div>
                <div>
                  <p className="text-primary font-bold font-serif text-xl">Paola Rioseco</p>
                  <p className="text-base text-muted">Consultora en Desarrollo Humano y Gestión Emocional</p>
                </div>
              </div>
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
                Eliminamos el miedo al error para fortalecer la cohesión y la claridad mental, permitiendo que el equipo tome decisiones estratégicas con total confianza.
              </p>
              <a
                href="/contacto"
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
                Transformamos la presión en un motor de bienestar mediante la regulación emocional, asegurando un alto rendimiento sostenido incluso bajo condiciones de máxima exigencia.
              </p>
              <a
                href="/contacto"
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
                Mitigamos la sobrecarga y el desgaste para prevenir conflictos internos, protegiendo el clima laboral y transformando el estrés en una productividad sana y sostenible.
              </p>
              <a
                href="/contacto"
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
                  href="/contacto"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar por este formato →
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
                  href="/contacto"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar por este formato →
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
                  href="/contacto"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  Consultar por este formato →
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
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-sans font-medium hover:bg-primary/80 transition-colors"
          >
            Iniciar Conversación
          </a>
          <p className="text-sm text-stone-500 mt-4">
            Atención directa de Paola. Solo mensajes de texto, no se atienden llamadas de números desconocidos.
          </p>
        </div>
      </section>

      <Testimonials />

      <FloatingWhatsApp context="b2b" />
    </main>
  );
}
