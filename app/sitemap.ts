import type { MetadataRoute } from "next";
import { ALL_SERVICES } from "@/lib/services";
import { generateArticleParams } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paolarioseco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/servicios",
    "/personas",
    "/personas/biblioteca",
    "/quien-soy",
    "/contacto",
    "/organizaciones",
    "/recursos",
  ].map((path) => ({ url: `${BASE_URL}${path}`, lastModified: now }));

  const landingRoutes = ALL_SERVICES.map((service) => ({
    url: `${BASE_URL}/servicios/${service.slug}`,
    lastModified: now,
  }));

  const personalArticles = generateArticleParams("biblioteca-personal").map(
    ({ slug }) => ({
      url: `${BASE_URL}/personas/biblioteca/${slug}`,
      lastModified: now,
    })
  );

  const corporateArticles = generateArticleParams("biblioteca-corporativa").map(
    ({ slug }) => ({
      url: `${BASE_URL}/recursos/${slug}`,
      lastModified: now,
    })
  );

  // /gracias queda fuera a propósito (noindex).
  return [
    ...staticRoutes,
    ...landingRoutes,
    ...personalArticles,
    ...corporateArticles,
  ];
}
