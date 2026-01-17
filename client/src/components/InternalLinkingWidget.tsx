/**
 * Internal Linking Widget Component
 * Provides contextual internal links to improve SEO juice flow
 * Displays relevant pages based on current content context
 */

import { Link } from "wouter";
import { ArrowRight, Home, MapPin, FileText, HelpCircle, BookOpen, Phone } from "lucide-react";

interface InternalLink {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const allLinks: InternalLink[] = [
  {
    href: "/portfolio",
    label: "View Our Portfolio",
    description: "Explore our award-winning custom home projects",
    icon: Home,
  },
  {
    href: "/neighborhoods",
    label: "Central Oregon Neighborhoods",
    description: "Discover where we build luxury custom homes",
    icon: MapPin,
  },
  {
    href: "/resources",
    label: "Free Building Guides",
    description: "Download our comprehensive home building resources",
    icon: FileText,
  },
  {
    href: "/faq",
    label: "Frequently Asked Questions",
    description: "Get answers to common custom home building questions",
    icon: HelpCircle,
  },
  {
    href: "/blog",
    label: "Building Insights Blog",
    description: "Expert tips and advice for your custom home journey",
    icon: BookOpen,
  },
  {
    href: "/contact",
    label: "Start Your Project",
    description: "Schedule a consultation with Kevin Rea",
    icon: Phone,
  },
];

interface InternalLinkingWidgetProps {
  exclude?: string[];
  maxLinks?: number;
  title?: string;
  className?: string;
  variant?: "sidebar" | "footer" | "inline";
}

export default function InternalLinkingWidget({
  exclude = [],
  maxLinks = 4,
  title = "Explore More",
  className = "",
  variant = "sidebar",
}: InternalLinkingWidgetProps) {
  const filteredLinks = allLinks
    .filter((link) => !exclude.includes(link.href))
    .slice(0, maxLinks);

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {filteredLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className="inline-flex items-center gap-1 text-amber hover:text-timber font-medium text-sm transition-colors">
              {link.label}
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`bg-stone rounded-xl p-6 ${className}`}>
        <h3 className="font-display text-lg font-semibold text-timber mb-4">
          {title}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {filteredLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="flex items-center gap-2 text-timber hover:text-amber transition-colors font-body text-sm py-1">
                <link.icon className="w-4 h-4 text-amber" />
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Sidebar variant (default)
  return (
    <div className={`bg-cream rounded-xl p-6 ${className}`}>
      <h3 className="font-display text-lg font-semibold text-timber mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {filteredLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer">
              <div className="p-2 bg-amber/10 rounded-lg group-hover:bg-amber/20 transition-colors">
                <link.icon className="w-5 h-5 text-amber" />
              </div>
              <div>
                <span className="font-body font-medium text-timber group-hover:text-amber transition-colors block">
                  {link.label}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {link.description}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
