import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleData {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  contentHtml: string;
}

async function getArticle(slug: string): Promise<ArticleData | null> {
  const filePath = path.join(process.cwd(), 'content', 'biblioteca', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  // Procesar Markdown a HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  return {
    title: data.title || 'Sin título',
    date: data.date || '',
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    readTime: data.readTime || '5 min',
    contentHtml,
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Artículo no encontrado',
    };
  }
  
  return {
    title: `${article.title} | Biblioteca`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'biblioteca');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  return files.map((file) => ({
    slug: file.replace('.md', ''),
  }));
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
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-ink
            prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted prose-p:font-sans prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-ink prose-strong:font-medium
            prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-muted prose-li:font-sans prose-li:mb-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
            prose-hr:border-ink/10 prose-hr:my-12
            prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/30 hover:prose-a:decoration-primary
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-ink/5 prose-pre:p-4 prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>

      {/* Navegación */}
      <nav className="px-4 md:px-8 pb-12 max-w-3xl mx-auto border-t border-ink/10 pt-8">
        <Link
          href="/biblioteca"
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
