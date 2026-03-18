import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { WHATSAPP_CONFIG } from "@/lib/config";
import { getArticleBySlug, generateArticleParams, ArticleWithContent } from "@/lib/mdx";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<ArticleWithContent | null> {
  return getArticleBySlug("biblioteca-corporativa", slug);
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: `${article.title} | Biblioteca Corporativa`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return generateArticleParams("biblioteca-corporativa");
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-paper">
      {/* Header del artículo */}
      <header className="pt-24 pb-12 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-muted/60">
            {article.readTime} de lectura
          </span>
        </div>
        
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink mb-4 leading-tight">
          {article.title}
        </h1>
        
        <time className="text-sm text-muted/60">
          {new Date(article.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      {/* Contenido del artículo - Estilos inline forzados via style prop */}
      <article className="px-4 md:px-8 pb-24 max-w-3xl mx-auto">
        <div 
          className="article-content text-muted font-sans leading-7"
          style={{
            ['--h2-mt' as string]: '3.5rem',
            ['--h2-mb' as string]: '1.5rem',
            ['--h3-mt' as string]: '2.5rem',
            ['--h3-mb' as string]: '1rem',
            ['--p-mb' as string]: '1.5rem',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ 
            __html: `
              <style>
                .article-content h2 {
                  margin-top: 3.5rem !important;
                  margin-bottom: 1.5rem !important;
                  padding-bottom: 0.75rem !important;
                  border-bottom: 1px solid rgba(28, 25, 23, 0.1) !important;
                  font-size: 1.5rem !important;
                  font-weight: 600 !important;
                  color: #1C1917 !important;
                  font-family: var(--font-lora), Lora, serif !important;
                }
                .article-content h3 {
                  margin-top: 2.5rem !important;
                  margin-bottom: 1rem !important;
                  font-size: 1.25rem !important;
                  font-weight: 600 !important;
                  color: rgba(28, 25, 23, 0.9) !important;
                  font-family: var(--font-lora), Lora, serif !important;
                }
                .article-content p {
                  margin-bottom: 1.5rem !important;
                  line-height: 1.75 !important;
                  color: #78716C !important;
                }
                .article-content h2 + p,
                .article-content h3 + p {
                  margin-top: 1rem !important;
                }
                .article-content ul,
                .article-content ol {
                  margin-top: 1rem !important;
                  margin-bottom: 1.5rem !important;
                  padding-left: 1.5rem !important;
                }
                .article-content li {
                  margin-bottom: 0.75rem !important;
                  line-height: 1.75 !important;
                }
                .article-content ul {
                  list-style-type: disc !important;
                }
                .article-content ol {
                  list-style-type: decimal !important;
                }
                .article-content strong {
                  color: #1C1917 !important;
                  font-weight: 600 !important;
                }
                .article-content a {
                  color: #C01D65 !important;
                  text-decoration: underline !important;
                  text-underline-offset: 4px !important;
                }
                .article-content blockquote {
                  border-left: 4px solid #C01D65 !important;
                  padding-left: 1.5rem !important;
                  margin: 2rem 0 !important;
                  font-style: italic !important;
                }
                .article-content hr {
                  margin: 3rem 0 !important;
                  border-color: rgba(28, 25, 23, 0.1) !important;
                }
              </style>
              ${article.contentHtml}
            ` 
          }}
        />
      </article>

      {/* CTA WhatsApp - Solicitar diagnóstico */}
      <section className="py-16 px-4 md:px-8 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4">
            ¿Necesita aplicar estos conocimientos en su organización?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Solicite un diagnóstico inicial personalizado para identificar las oportunidades de mejora en su equipo.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-sans font-medium hover:bg-primary/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Solicitar diagnóstico inicial
          </a>
          <p className="text-sm text-stone-500 mt-4">
            Atención directa de Paola. Solo mensajes de texto.
          </p>
        </div>
      </section>

      {/* Navegación */}
      <nav className="px-4 md:px-8 py-8 max-w-3xl mx-auto">
        <Link
          href="/recursos"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-sans text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la biblioteca
        </Link>
      </nav>
    </main>
  );
}
