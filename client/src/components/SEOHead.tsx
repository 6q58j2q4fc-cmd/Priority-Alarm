/**
 * SEO Head Component
 * Provides consistent SEO meta tags, structured data, and advertising tags across all pages
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
}

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
};

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = "/images/hero-main.jpg",
  ogType = "website",
  canonicalUrl,
  articlePublishedTime,
  articleAuthor,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | Rea Co Homes | Kevin Rea`;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // Update Open Graph tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta && title) {
      ogTitleMeta.setAttribute("content", `${title} | Rea Co Homes`);
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute("content", description);
    }

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute("content", ogImage);
    }

    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) {
      ogTypeMeta.setAttribute("content", ogType);
    }

    // Update canonical URL
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
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

    // Add geographic meta tags
    const geoTags = [
      { name: "geo.region", content: "US-OR" },
      { name: "geo.placename", content: "Bend, Oregon" },
      { name: "geo.position", content: "44.0582;-121.3153" },
      { name: "ICBM", content: "44.0582, -121.3153" },
    ];

    geoTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Cleanup function to reset to defaults
    return () => {
      document.title = "Central Oregon Custom Home Builder | Rea Co Homes | Kevin Rea";
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, articlePublishedTime, articleAuthor]);

  return null;
}

// Export schema for use in other components
export { localBusinessSchema };
