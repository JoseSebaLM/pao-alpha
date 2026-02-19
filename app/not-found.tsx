import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 border border-ink/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="font-serif text-2xl text-ink">404</span>
        </div>
        
        <h1 className="font-serif text-2xl text-ink mb-4">
          Te has desviado del camino.
        </h1>
        
        <p className="text-muted font-sans leading-relaxed mb-8">
          No hay respuestas mágicas aquí, pero puedes volver al inicio para retomar el orden.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-sans font-medium hover:bg-opacity-90 transition-all"
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
