export const dynamic = 'force-static';

import Link from "next/link";
import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Biblioteca | Archivo de Conciencia",
  description: "Artículos sobre consciencia, coherencia y bienestar.",
};

export default async function BibliotecaPage() {
  const articles = await getAllArticles("biblioteca-personal");
  
  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <header className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
          Archivo de Conciencia
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
          Biblioteca
        </h1>
        <p className="text-muted text-lg font-sans max-w-2xl">
          Reflexiones, herramientas y recursos para tu camino hacia una vida consciente y coherente.
        </p>
      </header>

      {/* Grid de artículos */}
      <section className="px-4 md:px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/personas/biblioteca/${article.slug}`}
              className="group block p-6 border border-ink/10 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white"
            >
              {/* Categoría y tiempo */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-muted/60">
                  {article.readTime}
                </span>
              </div>
              
              {/* Título */}
              <h2 className="font-serif text-xl text-ink mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              
              {/* Extracto */}
              <p className="text-sm text-muted font-sans leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              {/* Fecha */}
              <time className="text-xs text-muted/50">
                {new Date(article.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          ))}
        </div>
      </section>

      {/* Botón volver */}
      <div className="px-4 md:px-8 pb-12 max-w-5xl mx-auto">
        <Link
          href="/personas"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-sans text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a Acompañamiento
        </Link>
      </div>
    </main>
  );
}
