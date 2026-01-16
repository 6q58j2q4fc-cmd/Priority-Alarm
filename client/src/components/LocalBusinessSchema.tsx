/**
 * LocalBusiness JSON-LD Structured Data Component
 * Provides rich snippets for Google Search results
 */

import { useEffect } from "react";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeBuilder",
  "@id": "https://reacohomes.com/#organization",
  name: "Rea Co Homes",
  alternateName: "Kevin Rea Custom Home Builder",
  description: "Award-winning custom home builder in Central Oregon. Kevin Rea has been crafting exceptional luxury homes since 1977 with 45+ years of experience in Bend, Brasada Ranch, Tetherow, and surrounding communities.",
  url: "https://reacohomes.com",
  telephone: "+1-541-390-9848",
  email: "kevin@reacohomes.com",
  foundingDate: "1977",
  founder: {
    "@type": "Person",
    name: "Kevin Rea",
    jobTitle: "Master Builder & Owner",
  },
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
    {
      "@type": "City",
      name: "Bend",
      containedInPlace: {
        "@type": "State",
        name: "Oregon",
      },
    },
    {
      "@type": "Place",
      name: "Brasada Ranch",
    },
    {
      "@type": "Place",
      name: "Tetherow",
    },
    {
      "@type": "Place",
      name: "Pronghorn",
    },
    {
      "@type": "Place",
      name: "Broken Top",
    },
    {
      "@type": "Place",
      name: "Awbrey Butte",
    },
    {
      "@type": "Place",
      name: "Sunriver",
    },
    {
      "@type": "Place",
      name: "Caldera Springs",
    },
  ],
  priceRange: "$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/reacohomes",
    "https://www.instagram.com/reacohomes",
    "https://www.linkedin.com/company/rea-co-homes",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Custom Home Building Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Home Design & Build",
          description: "Full-service custom home design and construction from concept to completion.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury Home Construction",
          description: "High-end luxury home construction with premium materials and finishes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Resort Community Building",
          description: "Specialized construction in Central Oregon's premier resort communities.",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Jim Rozewski",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: "Kevin's passion for building is unmatched. His attention to detail, his professionalism and the artful nature with which he approaches every project rings of the highest order.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Barbara Sumner",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: "Kevin is a master builder – of relationships, ideas, teams and spaces. I have known Kevin for a decade and have enjoyed his vision, energy, talents and company every time we've connected.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "McCartney Family",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: "We knew immediately upon meeting with Kevin that we found our builder. Clear, present and trustworthy are just a few of the many attributes we enjoyed during our build process.",
    },
  ],
  award: [
    "Best of Show - Realtors Tour",
    "ACA Award Winner",
    "Earth Hero Award",
    "Governor's Livability Award",
  ],
  slogan: "Award-Winning Custom Homes in Central Oregon",
  knowsAbout: [
    "Custom Home Building",
    "Luxury Home Construction",
    "Mountain Contemporary Design",
    "Sustainable Building",
    "Central Oregon Real Estate",
    "Resort Community Development",
  ],
  image: [
    "https://reacohomes.com/images/hero-main.jpg",
    "https://reacohomes.com/images/kevin-rea.webp",
    "https://reacohomes.com/images/hero-portfolio.jpg",
  ],
  logo: "https://reacohomes.com/images/logo.png",
};

export default function LocalBusinessSchema() {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[data-schema="local-business"]');
    if (existingScript) return;

    // Create and inject the JSON-LD script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "local-business");
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[data-schema="local-business"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
