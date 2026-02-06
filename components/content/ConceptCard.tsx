"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ConceptCardProps {
  title: string;
  excerpt: string;
  category: "mente" | "cuerpo" | "espiritu";
  slug: string;
  date: string;
  imageUrl?: string;
}

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

export default function ConceptCard({
  title,
  excerpt,
  category,
  slug,
  date,
  imageUrl,
}: ConceptCardProps) {
  const styles = categoryStyles[category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/biblioteca/${slug}`}
        className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative aspect-video bg-stone-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-200">
              <div className="w-16 h-16 rounded-full bg-stone-300/50" />
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${styles.bg} ${styles.text}`}
            >
              {styles.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-serif text-xl text-ink mb-3 transition-colors duration-200 group-hover:text-primary">
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-[length:100%_2px]">
              {title}
            </span>
          </h3>

          {/* Excerpt */}
          <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-ink/5">
            <span className="text-micro text-muted">{date}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-ink group-hover:text-primary transition-colors duration-200">
              Leer
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
