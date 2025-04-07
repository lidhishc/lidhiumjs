import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/private/", "/admin/"],
    },
    sitemap: "https://lidhiumjs.com/sitemap.xml",
  };
}
