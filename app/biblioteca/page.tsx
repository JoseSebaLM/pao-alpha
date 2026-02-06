"use client";

import { useState } from "react";
import ConceptCard from "@/components/content/ConceptCard";

const articles = [
  {
    title: "Manual de Límites y Auto-Respeto",
    excerpt:
      "El ser humano está condicionado a favorecer a los demás, sin cautelar lo que es su propio bienestar...",
    category: "cuerpo" as const,
    slug: "manual-limites",
    date: "Enero 2026",
    imageUrl: "",
  },
  {
    title: "Vivir un Día a la Vez",
    excerpt:
      "Vivimos en un mundo donde las proyecciones están sustentadas en los proyectos de vida a los que estamos anclados...",
    category: "mente" as const,
    slug: "guia-dia-a-dia",
    date: "Enero 2026",
    imageUrl: "",
  },
  {
    title: "Vida Consciente - Workshop",
    excerpt:
      "No estamos viviendo 'una crisis personal', sino un cambio de ciclo colectivo que exige mayor conciencia individual...",
    category: "espiritu" as const,
    slug: "workshop-vida-consciente",
    date: "26 Feb 2026",
    imageUrl: "",
  },
];

const filters = [
  { id: "todos", label: "Todos" },
  { id: "mente", label: "Mente" },
  { id: "cuerpo", label: "Cuerpo" },
  { id: "espiritu", label: "Espíritu" },
] as const;

export default function BibliotecaPage() {
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  const filteredArticles =
    activeFilter === "todos"
      ? articles
      : articles.filter((article) => article.category === activeFilter);

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-4">
          Biblioteca
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-sans">
          Guías para la transformación personal
        </p>
      </section>

      {/* Filters */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-ink/70 hover:text-ink border border-ink/10 hover:border-ink/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ConceptCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              slug={article.slug}
              date={article.date}
              imageUrl={article.imageUrl}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted font-sans">
              No hay artículos en esta categoría aún.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
