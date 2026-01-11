/**
 * SEO Head Component
 * Dynamically updates page meta tags for SEO
 */

import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = "/images/hero-main.jpg",
  ogType = "website",
  canonicalUrl,
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
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      }
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

    // Cleanup function to reset to defaults
    return () => {
      document.title = "Central Oregon Custom Home Builder | Rea Co Homes | Kevin Rea";
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
}
