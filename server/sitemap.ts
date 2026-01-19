/**
 * Dynamic Sitemap Generator
 * Generates XML sitemap including all static pages and dynamically generated articles
 * for maximum SEO reach and search engine indexing
 */

import { getArticles } from "./db";

const SITE_URL = "https://reacohomes.com";

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: "/", priority: 1.0, changefreq: "weekly", image: "/images/hero-main.jpg", imageTitle: "Award-Winning Custom Homes in Central Oregon" },
  { path: "/portfolio", priority: 0.9, changefreq: "monthly", image: "/images/chiaramonte-hero-exterior.webp", imageTitle: "Custom Home Portfolio - Rea Co Homes" },
  { path: "/neighborhoods", priority: 0.9, changefreq: "monthly", image: "/images/hero-neighborhoods.jpg", imageTitle: "Central Oregon Luxury Home Communities" },
  { path: "/about", priority: 0.8, changefreq: "monthly", image: "/images/kevin-rea.webp", imageTitle: "Kevin Rea - Master Custom Home Builder" },
  { path: "/contact", priority: 0.9, changefreq: "monthly" },
  { path: "/blog", priority: 0.8, changefreq: "daily" },
  { path: "/articles", priority: 0.8, changefreq: "daily" },
  { path: "/news", priority: 0.7, changefreq: "daily" },
  { path: "/testimonials", priority: 0.7, changefreq: "monthly" },
  { path: "/resources", priority: 0.8, changefreq: "monthly", image: "/images/hero-portfolio.jpg", imageTitle: "Free Custom Home Building Guides" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },
  // Neighborhood landing pages
  { path: "/brasada-ranch-builder", priority: 0.9, changefreq: "monthly", image: "/images/hero-neighborhoods.jpg", imageTitle: "Brasada Ranch Custom Home Builder" },
  { path: "/tetherow-custom-homes", priority: 0.9, changefreq: "monthly", image: "/images/qHKfAGVqL6Y8.jpg", imageTitle: "Tetherow Custom Home Builder" },
  { path: "/pronghorn-builder", priority: 0.9, changefreq: "monthly", image: "/images/asoZsc8CLN0r.jpg", imageTitle: "Pronghorn Custom Home Builder" },
  { path: "/broken-top-builder", priority: 0.9, changefreq: "monthly", image: "/images/WkNH38aWPs08.jpg", imageTitle: "Broken Top Custom Home Builder" },
  { path: "/caldera-springs-builder", priority: 0.9, changefreq: "monthly", image: "/images/UCoE7gADVKD9.jpg", imageTitle: "Caldera Springs Custom Home Builder" },
  { path: "/awbrey-butte-builder", priority: 0.9, changefreq: "monthly", image: "/images/LlxE9731ghDy.jpg", imageTitle: "Awbrey Butte Custom Home Builder" },
  { path: "/sunriver-builder", priority: 0.9, changefreq: "monthly", image: "/images/UCoE7gADVKD9.jpg", imageTitle: "Sunriver Custom Home Builder" },
];

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function generateDynamicSitemap(): Promise<string> {
  const today = formatDate(new Date());
  
  // Start XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Add static pages
  for (const page of STATIC_PAGES) {
    xml += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    if (page.image) {
      xml += `
    <image:image>
      <image:loc>${SITE_URL}${page.image}</image:loc>
      <image:title>${escapeXml(page.imageTitle || "")}</image:title>
    </image:image>`;
    }
    
    xml += `
  </url>
`;
  }

  // Add all published articles dynamically
  try {
    const articles = await getArticles();
    
    for (const article of articles) {
      const articleDate = article.publishedAt 
        ? formatDate(new Date(article.publishedAt)) 
        : today;
      
      xml += `  <url>
    <loc>${SITE_URL}/articles/${escapeXml(article.slug)}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
    
    console.log(`[Sitemap] Generated sitemap with ${STATIC_PAGES.length} static pages and ${articles.length} articles`);
  } catch (error) {
    console.error("[Sitemap] Error fetching articles:", error);
  }

  xml += `</urlset>`;
  
  return xml;
}
