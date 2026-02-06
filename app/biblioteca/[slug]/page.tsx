"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

const articles = [
  {
    title: "Manual de Límites y Auto-Respeto",
    excerpt:
      "El ser humano está condicionado a favorecer a los demás, sin cautelar lo que es su propio bienestar...",
    category: "cuerpo" as const,
    slug: "manual-limites",
    date: "Enero 2026",
    readTime: "8 min",
    imageUrl: "",
    content: `
      <p>El ser humano está condicionado a favorecer a los demás, sin cautelar lo que es su propio bienestar. Esta tendencia, aunque aparentemente altruista, nos lleva a un estado de agotamiento y resentimiento gradual.</p>
      
      <h2>El costo de no tener límites</h2>
      
      <p>Cuando decimos "sí" a todo y a todos, estamos diciendo "no" a nosotros mismos. No a nuestro descanso, no a nuestras prioridades, no a nuestra salud mental y física.</p>
      
      <blockquote>
        "El límite no es una pared, es un puente hacia relaciones más sanas y hacia una versión más auténtica de ti mismo."
      </blockquote>
      
      <p>Los límites saludables nos permiten:</p>
      
      <ul>
        <li>Preservar nuestra energía para lo que realmente importa</li>
        <li>Construir relaciones basadas en el respeto mutuo</li>
        <li>Desarrollar una identidad sólida y autónoma</li>
        <li>Prevenir el agotamiento emocional y físico</li>
      </ul>
      
      <h2>Prácticas para establecer límites</h2>
      
      <p>Comenzar a establecer límites puede sentirse incómodo al principio, especialmente si hemos pasado años priorizando a otros sobre nosotros mismos. Sin embargo, cada pequeño paso cuenta.</p>
      
      <p>La clave está en la consistencia y en recordar que establecer un límite es un acto de amor propio, no de egoísmo.</p>
    `,
  },
  {
    title: "Vivir un Día a la Vez",
    excerpt:
      "Vivimos en un mundo donde las proyecciones están sustentadas en los proyectos de vida a los que estamos anclados...",
    category: "mente" as const,
    slug: "guia-dia-a-dia",
    date: "Enero 2026",
    readTime: "6 min",
    imageUrl: "",
    content: `
      <p>Vivimos en un mundo donde las proyecciones están sustentadas en los proyectos de vida a los que estamos anclados. Planificamos años adelante, nos preocupamos por el futuro y nos arrepentimos del pasado.</p>
      
      <h2>La trampa del tiempo</h2>
      
      <p>Nuestra mente está constantemente viajando entre el ayer y el mañana, olvidando que la única realidad tangible es el momento presente.</p>
      
      <blockquote>
        "El presente es el único momento donde la vida realmente sucede. Todo lo demás son proyecciones mentales."
      </blockquote>
      
      <p>Vivir un día a la vez no significa irresponsabilidad, sino compromiso total con el ahora. Es dar lo mejor de nosotros hoy, confiando que el mañana se construye con los ladrillos que ponemos ahora.</p>
      
      <h2>Ejercicios de presencia</h2>
      
      <p>La práctica de la atención plena nos reconecta con la simplicidad del momento presente. Cada respiración consciente es un ancla a la realidad.</p>
      
      <p>Comienza por observar sin juzgar. Siente, escucha, mira. Sin etiquetar, sin analizar, simplemente siendo.</p>
    `,
  },
  {
    title: "Vida Consciente - Workshop",
    excerpt:
      "No estamos viviendo 'una crisis personal', sino un cambio de ciclo colectivo que exige mayor conciencia individual...",
    category: "espiritu" as const,
    slug: "workshop-vida-consciente",
    date: "26 Feb 2026",
    readTime: "10 min",
    imageUrl: "",
    content: `
      <p>No estamos viviendo "una crisis personal", sino un cambio de ciclo colectivo que exige mayor conciencia individual. Los viejos paradigmas ya no sostienen lo que viene, y nuestra alma lo sabe.</p>
      
      <h2>El llamado de la transformación</h2>
      
      <p>Este no es un momento de ruptura, sino de revelación. Lo que se desarma son las estructuras que ya no sirven a nuestra evolución. Lo que emerge es una versión más auténtica de nosotros mismos.</p>
      
      <blockquote>
        "La consciencia no es un estado que alcanzamos, es una práctica que cultivamos cada día."
      </blockquote>
      
      <p>El workshop "Vida Consciente" nace de esta necesidad: crear espacios donde podamos explorar, cuestionar y reconstruir nuestra relación con nosotros mismos y con el mundo.</p>
      
      <h2>Temas que exploraremos</h2>
      
      <ul>
        <li>Reconectar con el propósito de vida</li>
        <li>Herramientas para la auto-observación</li>
        <li>Integración mente-cuerpo-espíritu</li>
        <li>Prácticas de presencia y meditación</li>
      </ul>
      
      <p>Te invito a ser parte de esta experiencia transformadora. Juntos crearemos un espacio seguro para el crecimiento y la expansión consciente.</p>
    `,
  },
];

const categoryStyles = {
  mente: {
    bg: "bg-mente/10",
    text: "text-mente",
    label: "Mente",
  },
  cuerpo: {
    bg: "bg-cuerpo/10",
    text: "text-cuerpo",
    label: "Cuerpo",
  },
  espiritu: {
    bg: "bg-espíritu/10",
    text: "text-espíritu",
    label: "Espíritu",
  },
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [progress, setProgress] = useState(0);

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-4xl text-ink mb-4">Artículo no encontrado</h1>
        <p className="text-muted mb-8">
          El contenido que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/biblioteca"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Biblioteca
        </Link>
      </div>
    );
  }

  const styles = categoryStyles[article.category];

  return (
    <article className="min-h-screen bg-paper">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/10 z-50">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Biblioteca
          </Link>

          {/* Category Badge */}
          <span
            className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full mb-6 ${styles.bg} ${styles.text}`}
          >
            {styles.label}
          </span>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} de lectura
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 md:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Article Body */}
          <div
            className="prose prose-lg prose-stone max-w-none
              prose-headings:font-serif prose-headings:text-ink prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-ink/80 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-li:text-ink/80 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:font-serif
              prose-blockquote:text-ink/70 prose-blockquote:bg-primary/5
              prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
              prose-strong:text-ink prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-ink/10">
            <Link
              href="/biblioteca"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Biblioteca
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
}
