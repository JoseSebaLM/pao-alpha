import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ALL_SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios | Paola Rioseco",
  description:
    "Workshop, mentoring individual y tarot consciente. Herramientas para ordenar tu vida con más consciencia.",
};

// Clases estáticas por token de color (Tailwind no admite clases dinámicas).
const COLOR = {
  primary: {
    accent: "text-primary",
    border: "hover:border-primary",
    chip: "bg-primary/10 text-primary",
    button: "bg-primary hover:bg-primary/90",
  },
  mente: {
    accent: "text-mente",
    border: "hover:border-mente",
    chip: "bg-mente/10 text-mente",
    button: "bg-mente hover:bg-mente/90",
  },
  espiritu: {
    accent: "text-espiritu",
    border: "hover:border-espiritu",
    chip: "bg-espiritu/10 text-espiritu",
    button: "bg-espiritu hover:bg-espiritu/90",
  },
} as const;

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero corto */}
      <section className="pt-28 pb-12 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
          Servicios
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-sans">
          Elige el acompañamiento que corresponde a tu momento.
        </p>
      </section>

      {/* 3 tarjetas desde SERVICES */}
      <section className="pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {ALL_SERVICES.map((service) => {
            const c = COLOR[service.color];
            return (
              <div
                key={service.slug}
                className={`flex flex-col bg-white rounded-3xl p-7 border border-ink/10 shadow-sm transition-colors ${c.border}`}
              >
                <span
                  className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium mb-4 ${c.chip}`}
                >
                  {service.shortName}
                </span>

                <h2 className="font-serif text-2xl text-ink mb-2">
                  {service.name}
                </h2>

                <p className="text-ink/70 text-sm leading-relaxed mb-6 flex-grow">
                  {service.tagline}
                </p>

                <p className={`font-serif text-2xl font-semibold mb-6 ${c.accent}`}>
                  {service.priceLabel}
                </p>

                <Link
                  href={`/servicios/${service.slug}`}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-sans font-medium rounded-full transition-colors ${c.button}`}
                >
                  Ver más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Para quién NO es esto (versión de 2 líneas) */}
      <section className="pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center border-t border-ink/10 pt-10">
          <h3 className="font-serif text-xl text-ink mb-3">
            Para quién NO es esto
          </h3>
          <p className="text-ink/70 leading-relaxed">
            No es para quienes buscan soluciones pasivas o respuestas mágicas.
            Aquí se requiere responsabilidad radical.
          </p>
        </div>
      </section>
    </div>
  );
}
