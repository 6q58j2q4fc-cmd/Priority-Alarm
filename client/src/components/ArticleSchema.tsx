/**
 * Article Schema Component
 * Adds JSON-LD structured data for blog articles
 * Includes Article, Breadcrumb, and LocalBusiness schemas
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
  category?: string;
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
  category,
}: ArticleSchemaProps) {
  useEffect(() => {
    // Remove existing schemas if present
    const existingSchemas = document.querySelectorAll('[data-schema-type]');
    existingSchemas.forEach(el => el.remove());

    const baseUrl = "https://reacohomes.com";

    // Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: {
        "@type": "ImageObject",
        url: image,
        width: 1200,
        height: 630,
      },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        "@type": "Person",
        name: authorName,
        url: `${baseUrl}/about`,
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
          width: 200,
          height: 60,
        },
        url: baseUrl,
        sameAs: [
          "https://www.facebook.com/reacohomes",
          "https://www.instagram.com/reacohomes",
          "https://www.linkedin.com/company/rea-co-homes",
        ],
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
      ...(wordCount && { wordCount: wordCount }),
      ...(category && { articleSection: category }),
      inLanguage: "en-US",
      isAccessibleForFree: true,
      genre: "Custom Home Building",
      about: {
        "@type": "Thing",
        name: "Custom Home Building in Central Oregon",
      },
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Articles",
          item: `${baseUrl}/articles`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title.length > 50 ? title.substring(0, 50) + "..." : title,
          item: url.startsWith("http") ? url : `${baseUrl}${url}`,
        },
      ],
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "Rea Co Homes",
      description: "Award-winning custom home builder in Central Oregon with 45+ years of experience. Specializing in luxury homes at Brasada Ranch, Tetherow, Pronghorn, and Bend's finest communities.",
      url: baseUrl,
      telephone: "541-390-9848",
      email: "kevin@reacohomes.com",
      address: {
        "@type": "PostalAddress",
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
        { "@type": "City", name: "Bend, Oregon" },
        { "@type": "City", name: "Redmond, Oregon" },
        { "@type": "City", name: "Sisters, Oregon" },
        { "@type": "City", name: "Sunriver, Oregon" },
        { "@type": "Place", name: "Brasada Ranch" },
        { "@type": "Place", name: "Tetherow" },
        { "@type": "Place", name: "Pronghorn" },
        { "@type": "Place", name: "Broken Top" },
        { "@type": "Place", name: "Awbrey Butte" },
        { "@type": "Place", name: "Caldera Springs" },
      ],
      priceRange: "$$$$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      founder: {
        "@type": "Person",
        name: "Kevin Rea",
        jobTitle: "Master Custom Home Builder",
      },
      foundingDate: "1977",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom Home Building Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Home Design & Build",
              description: "Full-service custom home construction from design to completion",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Home Renovation",
              description: "High-end home renovation and remodeling services",
            },
          },
        ],
      },
    };

    // Create and append Article schema
    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.setAttribute("data-schema-type", "article");
    articleScript.textContent = JSON.stringify(articleSchema);
    document.head.appendChild(articleScript);

    // Create and append Breadcrumb schema
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.setAttribute("data-schema-type", "breadcrumb");
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Create and append LocalBusiness schema
    const businessScript = document.createElement("script");
    businessScript.type = "application/ld+json";
    businessScript.setAttribute("data-schema-type", "localbusiness");
    businessScript.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(businessScript);

    return () => {
      const schemas = document.querySelectorAll('[data-schema-type]');
      schemas.forEach(el => el.remove());
    };
  }, [title, description, url, image, datePublished, dateModified, authorName, publisherName, publisherLogo, keywords, wordCount, category]);

  return null;
}
