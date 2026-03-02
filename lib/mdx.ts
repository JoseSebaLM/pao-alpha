/**
 * Utilidades MDX - Paola Rioseco
 * Funciones centralizadas para leer y procesar contenido Markdown
 * Compatible con Cloudflare Workers (sin fs)
 */

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Tipos de silos de contenido
export type ContentSilo = "biblioteca-personal" | "biblioteca-corporativa";

// Interfaz base para artículos
export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
}

// Interfaz extendida para artículo completo con contenido HTML
export interface ArticleWithContent extends Article {
  contentHtml: string;
}

// Lista de slugs para biblioteca personal (B2C)
const BIBLIOTECA_PERSONAL_SLUGS = [
  "el-garage-5-autos",
  "el-miedo-como-aliado",
  "el-verbo-creador",
  "principio-de-correspondencia",
  "ser-hacer-tener-vida-consciente",
  "soberania-consciente-causa-efecto",
];

// Lista de slugs para biblioteca corporativa (B2B)
const BIBLIOTECA_CORPORATIVA_SLUGS = [
  "comunicacion-consciente-cohesion-equipos",
  "gestion-del-miedo-incertidumbre-cambio",
  "los-5-autos-en-el-trabajo",
  "regulacion-emocional-decisiones-conscientes",
  "seguridad-psicologica-en-el-trabajo",
  "ser-hacer-luego-tener",
];

function getSlugs(silo: ContentSilo): string[] {
  return silo === "biblioteca-personal" 
    ? BIBLIOTECA_PERSONAL_SLUGS 
    : BIBLIOTECA_CORPORATIVA_SLUGS;
}

/**
 * Obtiene el contenido raw de un archivo markdown
 * Usa imports dinámicos para compatibilidad con Cloudflare
 */
async function getMarkdownContent(silo: ContentSilo, slug: string): Promise<string | null> {
  try {
    // Import dinámico del archivo markdown como string
    const mdModule = await import(`@/content/${silo}/${slug}.md`);
    return mdModule.default || mdModule;
  } catch (error) {
    console.error(`Error loading ${silo}/${slug}.md:`, error);
    return null;
  }
}

/**
 * Lista todos los artículos de un silo específico
 * @param silo - Tipo de biblioteca ('biblioteca-personal' | 'biblioteca-corporativa')
 * @returns Array de artículos ordenados por fecha descendente
 */
export async function getAllArticles(silo: ContentSilo): Promise<Article[]> {
  const slugs = getSlugs(silo);
  
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getMarkdownContent(silo, slug);
      
      if (!content) {
        return null;
      }
      
      const { data } = matter(content);
      
      return {
        slug,
        title: data.title || "Sin título",
        date: data.date || "",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        author: data.author || "Paola Rioseco",
        readTime: data.readTime || "5 min",
      };
    })
  );
  
  // Filtrar nulos y ordenar por fecha descendente
  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Obtiene un artículo específico por su slug
 * @param silo - Tipo de biblioteca
 * @param slug - Nombre del archivo sin extensión
 * @returns Artículo con contenido HTML o null si no existe
 */
export async function getArticleBySlug(
  silo: ContentSilo,
  slug: string
): Promise<ArticleWithContent | null> {
  const content = await getMarkdownContent(silo, slug);
  
  if (!content) {
    return null;
  }
  
  const { data, content: markdownContent } = matter(content);
  
  // Procesar Markdown a HTML
  const processedContent = await remark().use(html).process(markdownContent);
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    title: data.title || "Sin título",
    date: data.date || "",
    excerpt: data.excerpt || "",
    category: data.category || "General",
    author: data.author || "Paola Rioseco",
    readTime: data.readTime || "5 min",
    contentHtml,
  };
}

/**
 * Genera los parámetros estáticos para rutas dinámicas
 * @param silo - Tipo de biblioteca
 * @returns Array de objetos con slugs para generateStaticParams
 */
export function generateArticleParams(silo: ContentSilo): { slug: string }[] {
  const slugs = getSlugs(silo);
  return slugs.map((slug) => ({ slug }));
}

/**
 * Verifica si un artículo existe
 * @param silo - Tipo de biblioteca
 * @param slug - Nombre del archivo sin extensión
 */
export function articleExists(silo: ContentSilo, slug: string): boolean {
  const slugs = getSlugs(silo);
  return slugs.includes(slug);
}
