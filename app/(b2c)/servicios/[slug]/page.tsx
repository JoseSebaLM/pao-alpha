import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ALL_SERVICES, getService, type ServiceSlug } from "@/lib/services";
import { getTestimonials } from "@/lib/testimonials";
import { WHATSAPP_CONFIG } from "@/lib/config";
import LandingHero from "@/components/landing/LandingHero";
import PriceBlock from "@/components/landing/PriceBlock";
import PayButtons from "@/components/landing/PayButtons";
import FaqAccordion from "@/components/landing/FaqAccordion";
import ViewContentTracker from "@/components/analytics/ViewContentTracker";

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

// Clases estáticas por token de color (Tailwind no admite clases dinámicas).
const COLOR = {
  primary: {
    accent: "text-primary",
    check: "text-primary bg-primary/10",
    badge: "bg-primary/10 text-primary",
    button: "bg-primary hover:bg-primary/90",
  },
  mente: {
    accent: "text-mente",
    check: "text-mente bg-mente/10",
    badge: "bg-mente/10 text-mente",
    button: "bg-mente hover:bg-mente/90",
  },
  espiritu: {
    accent: "text-espiritu",
    check: "text-espiritu bg-espiritu/10",
    badge: "bg-espiritu/10 text-espiritu",
    button: "bg-espiritu hover:bg-espiritu/90",
  },
} as const;

// Imagen de hero por servicio.
const HERO_IMAGE: Record<ServiceSlug, string> = {
  "workshop-vida-consciente": "/pao-2.jpeg",
  mentoring: "/pao-3.jpeg",
  tarot: "/pao-2.jpeg",
};

// Contexto de WhatsApp por servicio (deep links ya definidos en config).
const WA_CONTEXT: Record<ServiceSlug, "workshop" | "mentoring" | "tarot"> = {
  "workshop-vida-consciente": "workshop",
  mentoring: "mentoring",
  tarot: "tarot",
};

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Servicio no encontrado | Paola Rioseco" };
  }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const c = COLOR[service.color];
  const whatsappContext = WA_CONTEXT[service.slug];
  const testimonials = getTestimonials(service.slug);

  // El pago real se activa solo con MP_ACCESS_TOKEN y precio publicado.
  const paymentEnabled =
    Boolean(process.env.MP_ACCESS_TOKEN) && service.priceCLP > 0;

  return (
    <div className="bg-paper">
      {/* Meta Pixel: ViewContent al montar la landing */}
      <ViewContentTracker slug={service.slug} priceCLP={service.priceCLP} />

      {/* 1. Hero */}
      <LandingHero service={service} image={HERO_IMAGE[service.slug]} />

      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* 2. Qué incluye */}
        <section className="py-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${c.badge}`}
            >
              {service.durationLabel}
            </span>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${c.badge}`}
            >
              {service.modality}
            </span>
          </div>

          <p className="text-ink/70 text-lg leading-relaxed mb-8">
            {service.description}
          </p>

          <h2 className="font-serif text-2xl text-ink mb-5">Qué incluye</h2>
          <ul className="space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink/80">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${c.check}`}
                >
                  <Check className="w-4 h-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3 + 4. Precio + PayButtons */}
        <section className="py-8 border-t border-ink/10">
          <PriceBlock
            service={service}
            paymentEnabled={paymentEnabled}
            whatsappContext={whatsappContext}
            accentClass={c.accent}
            buttonClass={c.button}
          />
        </section>

        {/* 5. Testimonios (2) */}
        <section className="py-12 border-t border-ink/10">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="bg-white rounded-2xl p-6 border border-ink/10 shadow-sm flex flex-col"
              >
                <blockquote className="font-serif italic text-ink leading-relaxed mb-4 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="pt-3 border-t border-ink/10">
                  <p className="font-sans font-medium text-ink">{t.author}</p>
                  <p className="font-sans text-sm text-muted">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-12 border-t border-ink/10">
          <h2 className="font-serif text-2xl text-ink mb-5">Preguntas frecuentes</h2>
          <FaqAccordion items={service.faq} />
        </section>

        {/* 7. Cierre: micro-CTA repetido + nota de WhatsApp */}
        <section className="py-12 border-t border-ink/10 text-center">
          <p className="font-serif text-2xl text-ink mb-6">
            {service.tagline}
          </p>
          <div className="max-w-md mx-auto">
            <PayButtons
              slug={service.slug}
              paymentEnabled={paymentEnabled}
              whatsappContext={whatsappContext}
              buttonClass={c.button}
            />
          </div>
          <p className="mt-4 text-xs text-muted/70 max-w-sm mx-auto">
            {WHATSAPP_CONFIG.warningText}
          </p>
        </section>
      </div>
    </div>
  );
}
