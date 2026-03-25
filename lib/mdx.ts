/**
 * Utilidades MDX - Paola Rioseco
 * Funciones centralizadas para leer y procesar contenido Markdown
 * Compatible con Cloudflare Workers (sin fs)
 */

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Static imports for all markdown files (B2C - biblioteca-personal)
import bp_el_garage_5_autos from "@/content/biblioteca-personal/el-garage-5-autos.md";
import bp_el_miedo_como_aliado from "@/content/biblioteca-personal/el-miedo-como-aliado.md";
import bp_el_verbo_creador from "@/content/biblioteca-personal/el-verbo-creador.md";
import bp_principio_de_correspondencia from "@/content/biblioteca-personal/principio-de-correspondencia.md";
import bp_ser_hacer_tener_vida_consciente from "@/content/biblioteca-personal/ser-hacer-tener-vida-consciente.md";
import bp_soberania_consciente_causa_efecto from "@/content/biblioteca-personal/soberania-consciente-causa-efecto.md";

// Static imports for all markdown files (B2B - biblioteca-corporativa)
import bc_comunicacion_consciente from "@/content/biblioteca-corporativa/comunicacion-consciente-cohesion-equipos.md";
import bc_gestion_del_miedo from "@/content/biblioteca-corporativa/gestion-del-miedo-incertidumbre-cambio.md";
import bc_los_5_autos from "@/content/biblioteca-corporativa/los-5-autos-en-el-trabajo.md";
import bc_regulacion_emocional from "@/content/biblioteca-corporativa/regulacion-emocional-decisiones-conscientes.md";
import bc_seguridad_psicologica from "@/content/biblioteca-corporativa/seguridad-psicologica-en-el-trabajo.md";
import bc_ser_hacer_luego_tener from "@/content/biblioteca-corporativa/ser-hacer-luego-tener.md";

// Lookup map for all content
const CONTENT_MAP: Record<string, string> = {
  // B2C - biblioteca-personal
  "biblioteca-personal/el-garage-5-autos": bp_el_garage_5_autos,
  "biblioteca-personal/el-miedo-como-aliado": bp_el_miedo_como_aliado,
  "biblioteca-personal/el-verbo-creador": bp_el_verbo_creador,
  "biblioteca-personal/principio-de-correspondencia": bp_principio_de_correspondencia,
  "biblioteca-personal/ser-hacer-tener-vida-consciente": bp_ser_hacer_tener_vida_consciente,
  "biblioteca-personal/soberania-consciente-causa-efecto": bp_soberania_consciente_causa_efecto,
  // B2B - biblioteca-corporativa
  "biblioteca-corporativa/comunicacion-consciente-cohesion-equipos": bc_comunicacion_consciente,
  "biblioteca-corporativa/gestion-del-miedo-incertidumbre-cambio": bc_gestion_del_miedo,
  "biblioteca-corporativa/los-5-autos-en-el-trabajo": bc_los_5_autos,
  "biblioteca-corporativa/regulacion-emocional-decisiones-conscientes": bc_regulacion_emocional,
  "biblioteca-corporativa/seguridad-psicologica-en-el-trabajo": bc_seguridad_psicologica,
  "biblioteca-corporativa/ser-hacer-luego-tener": bc_ser_hacer_luego_tener,
};

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
 * Usa lookup map de imports estáticos
 */
function getMarkdownContent(silo: ContentSilo, slug: string): string | null {
  return CONTENT_MAP[`${silo}/${slug}`] ?? null;
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
      const content = getMarkdownContent(silo, slug);

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
  const content = getMarkdownContent(silo, slug);

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
