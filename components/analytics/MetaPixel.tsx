"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import ConsentBanner from "./ConsentBanner";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CONSENT_KEY = "meta-pixel-consent";

type Consent = "granted" | "essential" | null;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara un evento de Meta Pixel de forma segura.
 * No hace nada si el pixel no está cargado (env var ausente o consentimiento
 * aún no otorgado).
 */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/**
 * Meta Pixel con consentimiento (Ley 21.719). Comportamiento:
 *  - NEXT_PUBLIC_META_PIXEL_ID ausente  -> no renderiza nada.
 *  - env presente, sin decisión         -> solo el banner de consentimiento.
 *  - "Aceptar"                          -> carga diferida del snippet (PageView).
 *  - "Solo esenciales"                  -> nada (ni banner ni pixel).
 *
 * Carga diferida: el snippet solo se inyecta tras aceptar (no fbq('consent')).
 */
export default function MetaPixel() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // El consentimiento vive en localStorage y solo puede leerse tras montar
    // (client-only) para no romper la hidratación SSR. Por eso se sincroniza
    // el estado dentro del effect; la regla no aplica a este caso legítimo.
    if (!PIXEL_ID) return;
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "granted" || stored === "essential") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(stored);
      }
    } catch {
      // localStorage no disponible: se mostrará el banner.
    }
    setReady(true);
  }, []);

  if (!PIXEL_ID) return null;

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "granted");
    } catch {
      // sin persistencia: igual cargamos el pixel en esta sesión.
    }
    setConsent("granted");
  };

  const essential = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "essential");
    } catch {
      // ignore
    }
    setConsent("essential");
  };

  return (
    <>
      {consent === "granted" && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {ready && consent === null && (
        <ConsentBanner onAccept={accept} onEssential={essential} />
      )}
    </>
  );
}
