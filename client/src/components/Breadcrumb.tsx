/**
 * Breadcrumb Navigation Component with JSON-LD Structured Data
 * Provides visual breadcrumb navigation and search engine structured data
 */

import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Build the full breadcrumb list with Home as the first item
  const fullItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  // Generate JSON-LD structured data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? `https://reacohomes.com${item.href}`
        : undefined,
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`font-body text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
                )}

                {isLast ? (
                  // Current page - not a link
                  <span
                    className="text-timber font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  // Link to other pages
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-amber transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5" />}
                    <span className={isFirst ? "sr-only sm:not-sr-only" : ""}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  // Non-clickable item
                  <span className="text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Predefined breadcrumb configurations for common pages
 */
export const breadcrumbConfigs = {
  portfolio: [{ label: "Portfolio", href: "/portfolio" }],
  neighborhoods: [{ label: "Neighborhoods", href: "/neighborhoods" }],
  about: [{ label: "About", href: "/about" }],
  contact: [{ label: "Contact", href: "/contact" }],
  blog: [{ label: "Blog", href: "/blog" }],
  news: [{ label: "News", href: "/news" }],
  resources: [{ label: "Free Guides", href: "/resources" }],
  testimonials: [{ label: "Testimonials", href: "/testimonials" }],
  
  // Neighborhood landing pages
  brasadaRanch: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Brasada Ranch" },
  ],
  tetherow: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Tetherow" },
  ],
  pronghorn: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Pronghorn" },
  ],
  brokenTop: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Broken Top" },
  ],
  calderaSprings: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Caldera Springs" },
  ],
  awbreyButte: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Awbrey Butte" },
  ],
  sunriver: [
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Sunriver" },
  ],

  // Dynamic breadcrumbs for articles/blog posts
  article: (title: string) => [
    { label: "Blog", href: "/blog" },
    { label: title },
  ],
  newsArticle: (title: string) => [
    { label: "News", href: "/news" },
    { label: title },
  ],
  project: (name: string) => [
    { label: "Portfolio", href: "/portfolio" },
    { label: name },
  ],
};
