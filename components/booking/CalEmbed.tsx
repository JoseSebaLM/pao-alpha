/**
 * Embed de Cal.com para la página de gracias.
 *
 * Decisión (documentada en el commit): se usa un iframe simple en vez de
 * @calcom/embed-react para no sumar una dependencia pesada al bundle del
 * Worker. Es suficiente para el arranque; si más adelante se necesita el
 * embed JS inline (prefill, theming avanzado), se migra.
 *
 * Solo se renderiza cuando el servicio tiene `calLink !== null`. Hoy todos
 * los servicios tienen calLink en null, así que este componente no se monta.
 */

interface CalEmbedProps {
  /** Slug de Cal.com, ej: "paola-rioseco/mentoring". */
  calLink: string;
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  return (
    <iframe
      src={`https://cal.com/${calLink}`}
      title="Agenda tu sesión"
      loading="lazy"
      className="w-full rounded-2xl border border-ink/10 bg-white"
      style={{ height: 640 }}
    />
  );
}
