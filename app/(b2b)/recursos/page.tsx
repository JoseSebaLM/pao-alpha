import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/config";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Recursos Corporativos | Gestión del Riesgo Psicosocial",
  description: "Artículos sobre seguridad psicológica, resiliencia operativa y gestión del riesgo psicosocial en organizaciones.",
};

export default function RecursosCorporativosPage() {
  // Feature Flag para biblioteca B2B
  if (!FEATURE_FLAGS.b2bLibraryEnabled) {
    notFound();
  }

  const articles = getAllArticles("biblioteca-corporativa");
  
  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <header className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <span className="text-micro text-primary block mb-4 tracking-widest uppercase">
          Conocimiento Institucional
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
          Recursos Corporativos
        </h1>
        <p className="text-muted text-lg font-sans max-w-2xl">
          Publicaciones especializadas en seguridad psicológica, resiliencia operativa y gestión del riesgo psicosocial.
        </p>
      </header>

      {/* Grid de artículos */}
      <section className="px-4 md:px-8 pb-24 max-w-5xl mx-auto">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border border-ink/10">
            <p className="text-muted font-sans">No hay publicaciones disponibles en este momento.</p>
            <p className="text-sm text-muted/60 mt-2">Próximamente contenido especializado.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/recursos/${article.slug}`}
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
        )}
      </section>

      {/* CTA a diagnóstico */}
      <section className="px-4 md:px-8 pb-12 max-w-5xl mx-auto">
        <div className="bg-stone-100 rounded-2xl p-8 text-center">
          <h3 className="font-serif text-2xl text-ink mb-4">
            ¿Necesita una evaluación personalizada?
          </h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Nuestro equipo puede realizar un diagnóstico específico de riesgo psicosocial para su organización.
          </p>
          <Link
            href="/empresas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-sans font-medium hover:bg-ink/90 transition-colors"
          >
            Solicitar evaluación diagnóstica
          </Link>
        </div>
      </section>
    </main>
  );
}
