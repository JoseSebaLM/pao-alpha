"use client";

import { useEffect, useRef } from "react";
import { track } from "./MetaPixel";

interface ViewContentTrackerProps {
  slug: string;
  priceCLP: number;
}

/**
 * Dispara `ViewContent` al montar una landing. No renderiza nada.
 */
export default function ViewContentTracker({
  slug,
  priceCLP,
}: ViewContentTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track("ViewContent", {
      content_ids: [slug],
      content_type: "product",
      value: priceCLP,
      currency: "CLP",
    });
  }, [slug, priceCLP]);

  return null;
}
