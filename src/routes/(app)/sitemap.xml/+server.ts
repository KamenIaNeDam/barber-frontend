export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  return new Response(
    `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

        <url>
          <loc>https://getinbarber.ru/</loc>
          <lastmod>${today}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>

      </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
