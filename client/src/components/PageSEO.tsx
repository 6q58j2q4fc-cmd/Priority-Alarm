/**
 * PageSEO Component - Comprehensive SEO meta tags for all pages
 * Includes Open Graph, Twitter Cards, structured data, and all modern SEO best practices
 */

import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product" | "profile";
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = "https://reacohomes.com";
const DEFAULT_IMAGE = "/images/reaco-hero-portfolio.webp";
const SITE_NAME = "Rea Co Homes - Custom Home Builder Central Oregon";
const TWITTER_HANDLE = "@reacohomes";

export default function PageSEO({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  keywords = [],
  author = "Kevin Rea",
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  structuredData,
}: PageSEOProps) {
  // Keep title between 30-60 characters for optimal SEO
  const fullTitle = title.length > 40 ? title : `${title} | Rea Co Homes`;
  const fullUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  
  // Default keywords for all pages
  const defaultKeywords = [
    "custom home builder",
    "Central Oregon",
    "Bend Oregon",
    "luxury homes",
    "Kevin Rea",
    "Rea Co Homes",
    "custom construction",
    "Brasada Ranch",
    "Tetherow",
    "Sunriver",
  ];
  
  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  // LocalBusiness structured data (default for all pages)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Rea Co Homes",
    alternateName: "Rea Company Homes",
    description: "Award-winning custom home builder in Central Oregon since 1977. Kevin Rea builds luxury homes in Bend, Brasada Ranch, Tetherow, and Sunriver.",
    url: BASE_URL,
    telephone: "+1-541-390-9848",
    email: "kevin@reacohomes.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bend",
      addressRegion: "OR",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.0582,
      longitude: -121.3153,
    },
    openingHours: "Mo-Fr 08:00-17:00",
    priceRange: "$$$",
    image: fullImageUrl,
    founder: {
      "@type": "Person",
      name: "Kevin Rea",
    },
    foundingDate: "1977",
    areaServed: [
      { "@type": "City", name: "Bend, Oregon" },
      { "@type": "City", name: "Sunriver, Oregon" },
      { "@type": "City", name: "Redmond, Oregon" },
      { "@type": "Place", name: "Brasada Ranch" },
      { "@type": "Place", name: "Tetherow" },
      { "@type": "Place", name: "Pronghorn" },
      { "@type": "Place", name: "Broken Top" },
      { "@type": "Place", name: "Caldera Springs" },
    ],
    sameAs: [
      "https://www.facebook.com/reacohomes",
      "https://www.instagram.com/reacohomes",
      "https://www.linkedin.com/company/rea-company-homes",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // WebSite schema for search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // BreadcrumbList schema
  const breadcrumbSchema = canonicalUrl ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: fullUrl,
      },
    ],
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="rea-company-homes" />
      
      {/* Pinterest */}
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Apple/iOS */}
      <meta name="apple-mobile-web-app-title" content="Rea Co Homes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Microsoft/Windows */}
      <meta name="msapplication-TileColor" content="#2d3748" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#2d3748" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="US-OR" />
      <meta name="geo.placename" content="Bend, Oregon" />
      <meta name="geo.position" content="44.0582;-121.3153" />
      <meta name="ICBM" content="44.0582, -121.3153" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="Rea Co Homes Blog RSS Feed" href="/api/trpc/feeds.rss" />
      <link rel="alternate" type="application/atom+xml" title="Rea Co Homes Blog Atom Feed" href="/api/trpc/feeds.atom" />
      <link rel="alternate" type="application/json" title="Rea Co Homes Blog JSON Feed" href="/api/trpc/feeds.json" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      
      {/* Structured Data - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Structured Data - Breadcrumb */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
