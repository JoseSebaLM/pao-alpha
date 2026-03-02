import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, generateArticleParams, ArticleWithContent } from "@/lib/mdx";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<ArticleWithContent | null> {
  return getArticleBySlug("biblioteca-personal", slug);
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${article.title} | Biblioteca`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return generateArticleParams("biblioteca-personal");
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

      {/* Contenido del artículo */}
      <article className="px-4 md:px-8 pb-24 max-w-3xl mx-auto">
        <div 
          className="article-content text-muted font-sans leading-7"
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

      {/* Navegación */}
      <nav className="px-4 md:px-8 pb-12 max-w-3xl mx-auto border-t border-ink/10 pt-8">
        <Link
          href="/personas/biblioteca"
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
