/**
 * BlogSEO Component - Comprehensive SEO for Blog Posts
 * Includes structured data, social sharing, viral components, and RSS feed markers
 */

import { Helmet } from "react-helmet-async";

interface BlogSEOProps {
  title: string;
  description: string;
  slug: string;
  content: string;
  category: string;
  tags?: string;
  publishedAt?: Date | string;
  updatedAt?: Date | string;
  featuredImage?: string;
  author?: string;
  readingTime?: number;
}

const SITE_URL = "https://reacohomes.com";
const SITE_NAME = "Rea Co Homes";
const AUTHOR_NAME = "Kevin Rea";
const AUTHOR_EMAIL = "kevin@reacohomes.com";
const TWITTER_HANDLE = "@reacohomes";
const FACEBOOK_APP_ID = ""; // Add if available

export default function BlogSEO({
  title,
  description,
  slug,
  content,
  category,
  tags,
  publishedAt,
  updatedAt,
  featuredImage,
  author = AUTHOR_NAME,
  readingTime,
}: BlogSEOProps) {
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = featuredImage 
    ? (featuredImage.startsWith("http") ? featuredImage : `${SITE_URL}${featuredImage}`)
    : `${SITE_URL}/images/hero-main.jpg`;
  
  const publishDate = publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString();
  const modifiedDate = updatedAt ? new Date(updatedAt).toISOString() : publishDate;
  
  const tagList = tags ? tags.split(",").map(t => t.trim()) : [];
  const estimatedReadTime = readingTime || Math.ceil(content.length / 1500);

  // Article structured data (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": [imageUrl],
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${SITE_URL}/about`,
      "sameAs": [
        "https://www.reacohomes.com",
        "https://www.linkedin.com/in/kevin-rea-builder"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/kevin-rea.webp`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": category,
    "keywords": tagList.join(", "),
    "wordCount": content.split(/\s+/).length,
    "timeRequired": `PT${estimatedReadTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["article h1", "article p:first-of-type"]
    }
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category,
        "item": `${SITE_URL}/blog?category=${encodeURIComponent(category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  // FAQ Schema (if content contains Q&A)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does it cost to build a custom home in Central Oregon?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom home building costs in Central Oregon typically range from $400-$800+ per square foot, depending on location, finishes, and complexity. Contact Kevin Rea at 541-390-9848 for a personalized estimate."
        }
      },
      {
        "@type": "Question",
        "name": "Who is the best custom home builder in Bend, Oregon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kevin Rea of Rea Co Homes has been building award-winning custom homes in Central Oregon since 1977. With over 100 homes completed in communities like Brasada Ranch, Tetherow, and Pronghorn, he's recognized as one of the region's premier builders."
        }
      }
    ]
  };

  // HowTo Schema for building process articles
  const howToSchema = category.toLowerCase().includes("process") ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "image": imageUrl,
    "totalTime": "PT6M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "400-800 per square foot"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initial Consultation",
        "text": "Meet with Kevin Rea to discuss your vision, budget, and timeline."
      },
      {
        "@type": "HowToStep",
        "name": "Design & Planning",
        "text": "Work with architects to create custom plans for your dream home."
      },
      {
        "@type": "HowToStep",
        "name": "Construction",
        "text": "Kevin personally manages every aspect of the build process."
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title} | Rea Co Homes Blog</title>
      <meta name="title" content={`${title} | Rea Co Homes Blog`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={tagList.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Reading Time */}
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={`${estimatedReadTime} min read`} />
      <meta name="twitter:label2" content="Category" />
      <meta name="twitter:data2" content={category} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />
      {tagList.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      {FACEBOOK_APP_ID && <meta property="fb:app_id" content={FACEBOOK_APP_ID} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="Rea Co Homes" />

      {/* Pinterest */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta property="og:rich_attachment" content="true" />

      {/* RSS/Atom Feed Links */}
      <link rel="alternate" type="application/rss+xml" title="Rea Co Homes Blog RSS Feed" href={`${SITE_URL}/rss.xml`} />
      <link rel="alternate" type="application/atom+xml" title="Rea Co Homes Blog Atom Feed" href={`${SITE_URL}/atom.xml`} />
      <link rel="alternate" type="application/json" title="Rea Co Homes Blog JSON Feed" href={`${SITE_URL}/feed.json`} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Mobile App Links (if applicable) */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Rea Co Homes" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}

      {/* Google News */}
      <meta name="news_keywords" content={tagList.slice(0, 10).join(", ")} />
      <meta name="original-source" content={canonicalUrl} />
      <meta name="syndication-source" content={canonicalUrl} />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="US-OR" />
      <meta name="geo.placename" content="Bend, Oregon" />
      <meta name="geo.position" content="44.0582;-121.3153" />
      <meta name="ICBM" content="44.0582, -121.3153" />

      {/* Copyright */}
      <meta name="copyright" content={`© ${new Date().getFullYear()} Rea Co Homes. All rights reserved.`} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
}

// Viral sharing component for blog posts
export function ViralShareButtons({ 
  title, 
  url, 
  description,
  hashtags = ["CentralOregon", "CustomHomes", "LuxuryHomes", "BendOregon"]
}: { 
  title: string; 
  url: string; 
  description: string;
  hashtags?: string[];
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(",");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    sms: `sms:?body=${encodedTitle}%20${encodedUrl}`,
    copy: url,
  };

  return { shareLinks };
}

// Newsletter signup CTA for viral growth
export function NewsletterCTA() {
  return (
    <div className="bg-gradient-to-r from-amber/10 to-timber/10 rounded-xl p-6 my-8 border border-amber/20">
      <h3 className="font-display text-xl font-semibold text-timber mb-2">
        📬 Get Central Oregon Home Building Insights
      </h3>
      <p className="text-muted-foreground mb-4">
        Join 2,500+ homeowners receiving weekly tips on custom home building, 
        market trends, and exclusive project updates from Kevin Rea.
      </p>
      <div className="flex gap-2">
        <input 
          type="email" 
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-white"
        />
        <button className="bg-amber text-timber px-6 py-2 rounded-lg font-semibold hover:bg-amber/90 transition-colors">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );
}

// Social proof widget for viral credibility
export function SocialProofWidget() {
  return (
    <div className="flex items-center gap-4 py-4 border-y border-border my-6">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-timber border-2 border-white"
          />
        ))}
      </div>
      <div>
        <p className="font-semibold text-timber">100+ Happy Homeowners</p>
        <p className="text-sm text-muted-foreground">
          Trusted by families across Central Oregon since 1977
        </p>
      </div>
    </div>
  );
}
