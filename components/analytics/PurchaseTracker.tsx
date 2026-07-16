"use client";

import { useEffect, useRef } from "react";
import { track } from "./MetaPixel";

interface PurchaseTrackerProps {
  slug: string;
  priceCLP: number;
}

/**
 * Dispara `Purchase` una sola vez en /gracias, con guard de sessionStorage
 * para evitar doble disparo si el usuario recarga la página. No renderiza nada.
 */
export default function PurchaseTracker({
  slug,
  priceCLP,
}: PurchaseTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const key = `purchase-tracked-${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage no disponible: seguimos y disparamos igual.
    }

    track("Purchase", {
      content_ids: [slug],
      content_type: "product",
      value: priceCLP,
      currency: "CLP",
    });
  }, [slug, priceCLP]);

  return null;
}
