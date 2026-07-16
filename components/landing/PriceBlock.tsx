import type { Service } from "@/lib/services";
import PayButtons from "./PayButtons";

type WhatsappContext = "workshop" | "mentoring" | "tarot";

interface PriceBlockProps {
  service: Service;
  paymentEnabled: boolean;
  whatsappContext: WhatsappContext;
  accentClass: string;
  buttonClass: string;
}

export default function PriceBlock({
  service,
  paymentEnabled,
  whatsappContext,
  accentClass,
  buttonClass,
}: PriceBlockProps) {
  return (
    <div className="max-w-md mx-auto text-center">
      <p className={`font-serif text-4xl font-semibold mb-2 ${accentClass}`}>
        {service.priceLabel}
      </p>
      <p className="text-muted text-sm mb-6">
        {service.durationLabel} · {service.modality}
      </p>
      <PayButtons
        slug={service.slug}
        paymentEnabled={paymentEnabled}
        whatsappContext={whatsappContext}
        buttonClass={buttonClass}
      />
    </div>
  );
}
