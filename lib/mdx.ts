/**
 * Utilidades MDX - Paola Rioseco
 * Funciones centralizadas para leer y procesar contenido Markdown
 */

import fs from "fs";
import path from "path";
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

/**
 * Obtiene la ruta absoluta al directorio de contenido
 */
function getContentDir(silo: ContentSilo): string {
  return path.join(process.cwd(), "content", silo);
}

/**
 * Lista todos los artículos de un silo específico
 * @param silo - Tipo de biblioteca ('biblioteca-personal' | 'biblioteca-corporativa')
 * @returns Array de artículos ordenados por fecha descendente
 */
export function getAllArticles(silo: ContentSilo): Article[] {
  const contentDir = getContentDir(silo);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || "Sin título",
      date: data.date || "",
      excerpt: data.excerpt || "",
      category: data.category || "General",
      author: data.author || "Paola Rioseco",
      readTime: data.readTime || "5 min",
    };
  });

  // Ordenar por fecha descendente (más recientes primero)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
  const filePath = path.join(getContentDir(silo), `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Procesar Markdown a HTML
  const processedContent = await remark().use(html).process(content);
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
  const contentDir = getContentDir(silo);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));

  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

/**
 * Verifica si un artículo existe
 * @param silo - Tipo de biblioteca
 * @param slug - Nombre del archivo sin extensión
 */
export function articleExists(silo: ContentSilo, slug: string): boolean {
  const filePath = path.join(getContentDir(silo), `${slug}.md`);
  return fs.existsSync(filePath);
}
