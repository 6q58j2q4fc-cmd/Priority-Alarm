/**
 * Article Schema Component
 * Adds JSON-LD structured data for blog articles
 * Helps search engines understand article content and display rich snippets
 */

import { useEffect } from "react";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  keywords?: string[];
  wordCount?: number;
}

export default function ArticleSchema({
  title,
  description,
  url,
  image = "https://reacohomes.com/images/hero-main.jpg",
  datePublished,
  dateModified,
  authorName = "Kevin Rea",
  publisherName = "Rea Co Homes",
  publisherLogo = "https://reacohomes.com/logo.png",
  keywords = [],
  wordCount,
}: ArticleSchemaProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-schema";

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: image,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        "@type": "Person",
        name: authorName,
        url: "https://reacohomes.com/about",
        jobTitle: "Master Custom Home Builder",
        worksFor: {
          "@type": "Organization",
          name: publisherName,
        },
      },
      publisher: {
        "@type": "Organization",
        name: publisherName,
        logo: {
          "@type": "ImageObject",
          url: publisherLogo,
        },
        url: "https://reacohomes.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
      ...(wordCount && { wordCount: wordCount }),
      inLanguage: "en-US",
      isAccessibleForFree: true,
      genre: "Custom Home Building",
      about: {
        "@type": "Thing",
        name: "Custom Home Building in Central Oregon",
      },
    };

    script.textContent = JSON.stringify(schema);

    // Remove existing schema if present
    const existingSchema = document.getElementById("article-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("article-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, url, image, datePublished, dateModified, authorName, publisherName, publisherLogo, keywords, wordCount]);

  return null;
}
