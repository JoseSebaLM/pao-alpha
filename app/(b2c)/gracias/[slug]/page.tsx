import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock } from "lucide-react";
import { getService } from "@/lib/services";
import { WHATSAPP_CONFIG } from "@/lib/config";
import CalEmbed from "@/components/booking/CalEmbed";
import PurchaseTracker from "@/components/analytics/PurchaseTracker";

interface GraciasPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ estado?: string }>;
}

export async function generateMetadata({
  params,
}: GraciasPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return {
    title: service ? `Gracias · ${service.name} | Paola Rioseco` : "Gracias",
    // Esta página no debe indexarse (Fase 2.3 / brief 1.4).
    robots: { index: false, follow: false },
  };
}

export default async function GraciasPage({
  params,
  searchParams,
}: GraciasPageProps) {
  const { slug } = await params;
  const { estado } = await searchParams;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const isPending = estado === "pendiente";
  const hasCalendar = service.calLink !== null;

  const whatsappHref = WHATSAPP_CONFIG.getLinkWithText(
    service.slug === "workshop-vida-consciente"
      ? "workshop"
      : service.slug === "mentoring"
        ? "mentoring"
        : "tarot"
  );

  return (
    <div className="min-h-screen bg-paper">
      <section className="pt-28 pb-20 px-4 md:px-8 max-w-2xl mx-auto text-center">
        {isPending ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cuerpo/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-cuerpo" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Tu pago está en proceso
            </h1>
            <p className="text-ink/70 text-lg leading-relaxed">
              Te confirmaremos por email en cuanto se acredite. No necesitas
              hacer nada más por ahora.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              {hasCalendar
                ? "Pago recibido. Último paso: agenda tu sesión"
                : "Tu cupo está reservado"}
            </h1>

            {hasCalendar ? (
              <>
                <p className="text-ink/70 text-lg leading-relaxed mb-8">
                  Elige el día y horario que mejor te acomode.
                </p>
                <CalEmbed calLink={service.calLink as string} />
              </>
            ) : (
              <p className="text-ink/70 text-lg leading-relaxed">
                Te contactaremos para coordinar los detalles. Si prefieres,
                escríbenos directo por WhatsApp.
              </p>
            )}
          </>
        )}

        {/* Nota de WhatsApp */}
        <div className="mt-10 pt-8 border-t border-ink/10">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink/20 text-ink font-sans font-medium rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            Escríbenos por WhatsApp
          </a>
          <p className="mt-4 text-xs text-muted/70 max-w-sm mx-auto">
            {WHATSAPP_CONFIG.warningText}
          </p>
        </div>
      </section>

      {/* Meta Pixel: Purchase (solo si el pago no está pendiente) */}
      {!isPending && (
        <PurchaseTracker slug={service.slug} priceCLP={service.priceCLP} />
      )}
    </div>
  );
}
