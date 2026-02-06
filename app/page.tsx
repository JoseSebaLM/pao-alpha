import TriacomaNav from "@/components/layout/TriacomaNav";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero - Copy aprobado por Gemini */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <span className="text-micro text-primary block mb-6 tracking-widest">
          ARCHIVO DE CONCIENCIA
        </span>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1] mb-8">
          Consciencia y Coherencia.
          <br />
          <span className="text-primary italic">Tu hoja de ruta</span> para una 
          <br />
          vida en equilibrio.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted max-w-3xl mx-auto font-sans leading-relaxed">
          Accede a la metodología para recuperar tu esencia y crear tu realidad.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/biblioteca" 
            className="px-8 py-4 bg-primary text-white rounded-full font-sans font-medium hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Explorar Biblioteca
          </a>
          <a 
            href="/servicios" 
            className="px-8 py-4 border border-ink/20 text-ink rounded-full font-sans font-medium hover:border-primary hover:text-primary transition-colors"
          >
            Workshop Feb 26
          </a>
        </div>
      </section>

      <TriacomaNav />
      
      {/* WhatsApp */}
      <a
        href="https://wa.me/56999396166"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </main>
  );
}