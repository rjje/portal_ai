export async function GET() {
  const baseUrl = "https://portal.ai"
  const pages = [
    "",
    "/docs",
    "/playground",
    "/examples",
    "/blog",
    "/blog/type-safe-ai",
    "/blog/streaming-responses",
    "/blog/multi-provider",
    "/blog/tools-functions",
    "/blog/agents",
    "/blog/rag-systems",
    "/blog/production-patterns",
    "/blog/multimodal-ai",
    "/blog/cost-optimization",
    "/blog/future-ai",
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page === "" ? "weekly" : page.includes("/blog/") ? "monthly" : "weekly"}</changefreq>
    <priority>${page === "" ? 1.0 : page === "/blog" ? 0.85 : page.includes("/blog/") ? 0.7 : 0.8}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
