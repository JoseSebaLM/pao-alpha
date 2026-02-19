export default function SiloCero() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <span className="text-micro text-muted block mb-4 tracking-widest uppercase">
          Portal de Acceso
        </span>
        
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-4">
          ¿Cómo puedo acompañarte?
        </h1>
        
        <p className="text-muted text-lg mb-12 font-sans">
          Elige el camino que corresponda a tu situación.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Opción Organizaciones */}
          <a
            href="/empresas"
            className="group p-8 border border-ink/10 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-ink mb-3">
              Soluciones para Organizaciones
            </h2>
            <p className="text-sm text-muted font-sans leading-relaxed">
              Programas de bienestar, talleres y consultoría para equipos y empresas.
            </p>
          </a>

          {/* Opción Personal */}
          <a
            href="/sobre-mi"
            className="group p-8 border border-ink/10 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-ink mb-3">
              Acompañamiento Personal
            </h2>
            <p className="text-sm text-muted font-sans leading-relaxed">
              Sesiones individuales, mentorías y recursos para tu crecimiento.
            </p>
          </a>

          {/* Módulo Innovación: IA + Consciencia */}
          <a
            href="/ia-consciencia"
            className="group p-8 border border-ink/10 rounded-2xl hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 bg-white relative overflow-hidden"
          >
            {/* Badge de próximamente */}
            <span className="absolute top-3 right-3 text-[10px] font-medium bg-violet-100 text-violet-700 px-2 py-1 rounded-full uppercase tracking-wider">
              Próximamente
            </span>
            
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-violet-200 transition-colors">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-ink mb-3">
              IA + Consciencia
            </h2>
            <p className="text-sm text-muted font-sans leading-relaxed">
              Explorando la intersección entre inteligencia artificial y desarrollo humano.
            </p>
          </a>
        </div>

        <p className="mt-12 text-xs text-muted/60 font-sans">
          Todos los caminos conducen al mismo propósito: consciencia y coherencia.
        </p>
      </div>
    </main>
  );
}
