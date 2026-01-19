/**
 * SEO Head Component
 * Provides consistent SEO meta tags, structured data, Open Graph, Twitter Cards,
 * and strategic competitor-adjacent keywords across all pages
 */

import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  articlePublishedTime?: string;
  articleAuthor?: string;
  articleCategory?: string;
  articleTags?: string;
}

// Strategic competitor-adjacent keywords for organic traffic capture
const competitorKeywords = [
  // Location-based keywords (competitors target these)
  "custom home builder Bend Oregon",
  "luxury homes Brasada Ranch",
  "Tetherow custom home builder",
  "Central Oregon home construction",
  "high desert custom homes",
  "Pronghorn luxury builder",
  "Broken Top custom homes",
  "Sunriver luxury home builder",
  "Awbrey Butte home construction",
  // Service-based keywords
  "modern custom home builders Oregon",
  "luxury home construction Central Oregon",
  "mountain modern home builder",
  "custom home design Bend",
  "new construction Bend Oregon",
  // Competitor-adjacent phrases (subtle, organic)
  "best custom home builders Central Oregon",
  "top rated home builders Bend",
  "award winning home builder Oregon",
  "premier luxury builder Bend",
  "experienced home builder Central Oregon",
  "trusted custom home contractor Bend",
  "quality home construction Oregon",
  "residential builder Deschutes County",
];

// Local Business structured data for Rea Co Homes
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeBuilder",
  "@id": "https://reacohomes.com/#organization",
  name: "Rea Co Homes",
  alternateName: "Kevin Rea Custom Homes",
  description: "Award-winning custom home builder in Central Oregon since 1977. Specializing in luxury homes in Brasada Ranch, Tetherow, Pronghorn, and Bend.",
  url: "https://reacohomes.com",
  logo: "https://reacohomes.com/images/rea-co-logo.png",
  image: "https://reacohomes.com/images/hero-main.jpg",
  telephone: "+1-541-390-9848",
  email: "kevin@reacohomes.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bend",
    addressLocality: "Bend",
    addressRegion: "OR",
    postalCode: "97701",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.0582,
    longitude: -121.3153,
  },
  areaServed: [
    { "@type": "City", name: "Bend" },
    { "@type": "City", name: "Sunriver" },
    { "@type": "City", name: "Redmond" },
    { "@type": "City", name: "Sisters" },
    { "@type": "City", name: "Powell Butte" },
  ],
  priceRange: "$$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  founder: {
    "@type": "Person",
    name: "Kevin Rea",
    jobTitle: "Master Builder",
  },
  foundingDate: "1977",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.facebook.com/reacohomes",
    "https://www.instagram.com/reacohomes",
    "https://www.linkedin.com/company/rea-co-homes",
    "https://www.pinterest.com/reacohomes",
  ],
};

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = "/images/hero-main.jpg",
  ogType = "website",
  canonicalUrl,
  articlePublishedTime,
  articleAuthor = "Kevin Rea",
  articleCategory,
  articleTags,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | Rea Co Homes | Kevin Rea`;
    }

    // Combine provided keywords with competitor keywords
    const allKeywords = [
      ...(keywords ? keywords.split(",").map(k => k.trim()) : []),
      ...competitorKeywords,
    ].join(", ");

    // Update meta description
    updateOrCreateMeta("description", description, "name");

    // Update meta keywords (combined with competitor keywords)
    updateOrCreateMeta("keywords", allKeywords, "name");

    // Update robots meta
    updateOrCreateMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "name");

    // ===== OPEN GRAPH TAGS =====
    const fullTitle = title ? `${title} | Rea Co Homes` : "Rea Co Homes | Central Oregon Custom Home Builder";
    const fullImageUrl = ogImage.startsWith("http") ? ogImage : `https://reacohomes.com${ogImage}`;
    
    updateOrCreateMeta("og:title", fullTitle, "property");
    updateOrCreateMeta("og:description", description, "property");
    updateOrCreateMeta("og:image", fullImageUrl, "property");
    updateOrCreateMeta("og:image:width", "1200", "property");
    updateOrCreateMeta("og:image:height", "630", "property");
    updateOrCreateMeta("og:image:alt", title || "Rea Co Homes - Custom Home Builder", "property");
    updateOrCreateMeta("og:type", ogType, "property");
    updateOrCreateMeta("og:site_name", "Rea Co Homes", "property");
    updateOrCreateMeta("og:locale", "en_US", "property");
    
    if (canonicalUrl) {
      updateOrCreateMeta("og:url", `https://reacohomes.com${canonicalUrl}`, "property");
    }

    // Article-specific Open Graph tags
    if (ogType === "article") {
      if (articlePublishedTime) {
        updateOrCreateMeta("article:published_time", articlePublishedTime, "property");
      }
      if (articleAuthor) {
        updateOrCreateMeta("article:author", articleAuthor, "property");
      }
      if (articleCategory) {
        updateOrCreateMeta("article:section", articleCategory, "property");
      }
      if (articleTags) {
        // Add multiple article:tag meta tags
        const tags = articleTags.split(",").map(t => t.trim());
        tags.forEach((tag, index) => {
          updateOrCreateMeta(`article:tag:${index}`, tag, "property", `article-tag-${index}`);
        });
      }
    }

    // ===== TWITTER CARD TAGS =====
    updateOrCreateMeta("twitter:card", "summary_large_image", "name");
    updateOrCreateMeta("twitter:site", "@reacohomes", "name");
    updateOrCreateMeta("twitter:creator", "@kevinrea", "name");
    updateOrCreateMeta("twitter:title", fullTitle, "name");
    updateOrCreateMeta("twitter:description", description, "name");
    updateOrCreateMeta("twitter:image", fullImageUrl, "name");
    updateOrCreateMeta("twitter:image:alt", title || "Rea Co Homes - Custom Home Builder", "name");

    // ===== PINTEREST TAGS =====
    updateOrCreateMeta("pinterest-rich-pin", "true", "name");

    // ===== LINKEDIN TAGS =====
    updateOrCreateMeta("linkedin:owner", "rea-co-homes", "name");

    // Update canonical URL
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", `https://reacohomes.com${canonicalUrl}`);
    }

    // Add structured data
    let structuredDataScript = document.querySelector('script[data-schema="local-business"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.setAttribute("type", "application/ld+json");
      structuredDataScript.setAttribute("data-schema", "local-business");
      structuredDataScript.textContent = JSON.stringify(localBusinessSchema);
      document.head.appendChild(structuredDataScript);
    }

    // Add Article structured data for article pages
    if (ogType === "article" && title) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: fullImageUrl,
        author: {
          "@type": "Person",
          name: articleAuthor,
          url: "https://reacohomes.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "Rea Co Homes",
          logo: {
            "@type": "ImageObject",
            url: "https://reacohomes.com/images/rea-co-logo.png",
          },
        },
        datePublished: articlePublishedTime,
        dateModified: articlePublishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl ? `https://reacohomes.com${canonicalUrl}` : undefined,
        },
        articleSection: articleCategory,
        keywords: allKeywords,
      };

      let articleSchemaScript = document.querySelector('script[data-schema="article"]');
      if (!articleSchemaScript) {
        articleSchemaScript = document.createElement("script");
        articleSchemaScript.setAttribute("type", "application/ld+json");
        articleSchemaScript.setAttribute("data-schema", "article");
        document.head.appendChild(articleSchemaScript);
      }
      articleSchemaScript.textContent = JSON.stringify(articleSchema);
    }

    // Add geographic meta tags
    const geoTags = [
      { name: "geo.region", content: "US-OR" },
      { name: "geo.placename", content: "Bend, Oregon" },
      { name: "geo.position", content: "44.0582;-121.3153" },
      { name: "ICBM", content: "44.0582, -121.3153" },
    ];

    geoTags.forEach(({ name, content }) => {
      updateOrCreateMeta(name, content, "name");
    });

    // Cleanup function to reset to defaults
    return () => {
      document.title = "Central Oregon Custom Home Builder | Rea Co Homes | Kevin Rea";
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, articlePublishedTime, articleAuthor, articleCategory, articleTags]);

  return null;
}

// Helper function to update or create meta tags
function updateOrCreateMeta(
  key: string,
  content: string,
  attributeType: "name" | "property",
  customId?: string
) {
  const selector = attributeType === "name" 
    ? `meta[name="${key}"]` 
    : `meta[property="${key}"]`;
  
  let meta = document.querySelector(selector) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attributeType, key);
    if (customId) {
      meta.setAttribute("data-id", customId);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute("content", content);
}

// Export schema for use in other components
export { localBusinessSchema, competitorKeywords };
