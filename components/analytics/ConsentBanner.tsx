"use client";

interface ConsentBannerProps {
  onAccept: () => void;
  onEssential: () => void;
}

/**
 * Banner de consentimiento mínimo (fijo inferior). El Pixel de Meta solo se
 * carga si el usuario pulsa "Aceptar" (carga diferida en MetaPixel).
 */
export default function ConsentBanner({
  onAccept,
  onEssential,
}: ConsentBannerProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-ink text-paper px-4 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.15)]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed flex-1">
          Usamos cookies de medición (Meta) para entender el uso del sitio.
          Conforme a la Ley 21.719, puedes aceptarlas o continuar solo con las
          esenciales.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={onEssential}
            className="px-4 py-2 text-sm font-medium rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
