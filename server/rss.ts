/**
 * RSS Feed Generator for Rea Co Homes Blog
 * Generates SEO-friendly RSS/Atom feeds for blog syndication
 */

import { getDb } from "./db";
import { articles } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

const SITE_URL = "https://reacohomes.com";
const SITE_TITLE = "Rea Co Homes - Central Oregon Custom Home Builder";
const SITE_DESCRIPTION = "Expert insights on luxury custom home building in Central Oregon. Tips, trends, and inspiration from Kevin Rea, master builder since 1977.";

export async function generateRSSFeed(): Promise<string> {
  const db = await getDb();
  if (!db) return generateEmptyRSSFeed();
  
  // Fetch latest articles from database
  const latestArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.createdAt))
    .limit(50);

  const now = new Date().toUTCString();
  
  let rssItems = "";
  
  for (const article of latestArticles) {
    const pubDate = new Date(article.createdAt).toUTCString();
    const articleUrl = `${SITE_URL}/blog/${article.slug}`;
    
    // Escape XML special characters
    const title = escapeXml(article.title);
    const description = escapeXml(article.excerpt || article.content.substring(0, 300) + "...");
    const content = escapeXml(article.content);
    const category = escapeXml(article.category);
    const tags = article.tags ? article.tags.split(",").map((t: string) => t.trim()) : [];
    
    rssItems += `
    <item>
      <title>${title}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <category>${category}</category>
      ${tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <author>kevin@reacohomes.com (Kevin Rea)</author>
      <dc:creator>Kevin Rea</dc:creator>
      ${article.featuredImage ? `<enclosure url="${SITE_URL}${article.featuredImage}" type="image/jpeg" />` : ""}
      <media:content url="${SITE_URL}${article.featuredImage || '/images/hero-main.jpg'}" medium="image" />
    </item>`;
  }

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <ttl>60</ttl>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/kevin-rea.webp</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <managingEditor>kevin@reacohomes.com (Kevin Rea)</managingEditor>
    <webMaster>kevin@reacohomes.com (Kevin Rea)</webMaster>
    <category>Home Building</category>
    <category>Custom Homes</category>
    <category>Central Oregon</category>
    <category>Luxury Real Estate</category>
    <generator>Rea Co Homes RSS Generator</generator>
    ${rssItems}
  </channel>
</rss>`;

  return rssFeed;
}

export async function generateAtomFeed(): Promise<string> {
  const db = await getDb();
  if (!db) return generateEmptyAtomFeed();
  
  const latestArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.createdAt))
    .limit(50);

  const now = new Date().toISOString();
  
  let atomEntries = "";
  
  for (const article of latestArticles) {
    const updated = new Date(article.updatedAt || article.createdAt).toISOString();
    const published = new Date(article.createdAt).toISOString();
    const articleUrl = `${SITE_URL}/blog/${article.slug}`;
    
    const title = escapeXml(article.title);
    const summary = escapeXml(article.excerpt || article.content.substring(0, 300) + "...");
    const content = escapeXml(article.content);
    
    atomEntries += `
  <entry>
    <title>${title}</title>
    <link href="${articleUrl}" rel="alternate" type="text/html"/>
    <id>${articleUrl}</id>
    <published>${published}</published>
    <updated>${updated}</updated>
    <author>
      <name>Kevin Rea</name>
      <email>kevin@reacohomes.com</email>
      <uri>${SITE_URL}/about</uri>
    </author>
    <summary type="html"><![CDATA[${summary}]]></summary>
    <content type="html"><![CDATA[${content}]]></content>
    <category term="${escapeXml(article.category)}" label="${escapeXml(article.category)}"/>
  </entry>`;
  }

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_TITLE}</title>
  <subtitle>${SITE_DESCRIPTION}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}" rel="alternate" type="text/html"/>
  <id>${SITE_URL}/</id>
  <updated>${now}</updated>
  <author>
    <name>Kevin Rea</name>
    <email>kevin@reacohomes.com</email>
  </author>
  <icon>${SITE_URL}/favicon.ico</icon>
  <logo>${SITE_URL}/images/kevin-rea.webp</logo>
  <rights>Copyright ${new Date().getFullYear()} Rea Co Homes. All rights reserved.</rights>
  <generator uri="https://reacohomes.com" version="1.0">Rea Co Homes</generator>
  ${atomEntries}
</feed>`;

  return atomFeed;
}

export async function generateJSONFeed(): Promise<object> {
  const db = await getDb();
  if (!db) return generateEmptyJSONFeed();
  
  const latestArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.createdAt))
    .limit(50);

  const items = latestArticles.map((article: typeof latestArticles[0]) => ({
    id: `${SITE_URL}/blog/${article.slug}`,
    url: `${SITE_URL}/blog/${article.slug}`,
    title: article.title,
    content_html: article.content,
    summary: article.excerpt || article.content.substring(0, 300) + "...",
    date_published: new Date(article.createdAt).toISOString(),
    date_modified: new Date(article.updatedAt || article.createdAt).toISOString(),
    author: {
      name: "Kevin Rea",
      url: `${SITE_URL}/about`,
      avatar: `${SITE_URL}/images/kevin-rea.webp`
    },
    tags: article.tags ? article.tags.split(",").map((t: string) => t.trim()) : [],
    image: article.featuredImage ? `${SITE_URL}${article.featuredImage}` : `${SITE_URL}/images/hero-main.jpg`,
    banner_image: article.featuredImage ? `${SITE_URL}${article.featuredImage}` : undefined,
  }));

  return {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_TITLE,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    icon: `${SITE_URL}/images/kevin-rea.webp`,
    favicon: `${SITE_URL}/favicon.ico`,
    authors: [{
      name: "Kevin Rea",
      url: `${SITE_URL}/about`,
      avatar: `${SITE_URL}/images/kevin-rea.webp`
    }],
    language: "en-US",
    items
  };
}

function escapeXml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}


function generateEmptyRSSFeed(): string {
  const now = new Date().toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <lastBuildDate>${now}</lastBuildDate>
  </channel>
</rss>`;
}

function generateEmptyAtomFeed(): string {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_TITLE}</title>
  <link href="${SITE_URL}"/>
  <updated>${now}</updated>
  <id>${SITE_URL}/</id>
</feed>`;
}

function generateEmptyJSONFeed(): object {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_TITLE,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    items: []
  };
}
