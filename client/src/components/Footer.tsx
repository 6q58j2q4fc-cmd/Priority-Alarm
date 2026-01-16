/**
 * Footer Component - High Desert Modernism Design
 * Dark timber background with warm accents
 * Contains contact info, navigation, press links, and newsletter signup
 */

import { Link } from "wouter";
import { Phone, Mail, MapPin, ExternalLink, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About Kevin" },
  { href: "/resources", label: "Free Guides" },
  { href: "/news", label: "Industry News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Neighborhood landing pages with dedicated SEO pages
const neighborhoodLinks = [
  { href: "/brasada-ranch-builder", label: "Brasada Ranch" },
  { href: "/tetherow-custom-homes", label: "Tetherow" },
  { href: "/pronghorn-builder", label: "Pronghorn" },
  { href: "/broken-top-builder", label: "Broken Top" },
  { href: "/awbrey-butte-builder", label: "Awbrey Butte" },
  { href: "/sunriver-builder", label: "Sunriver" },
  { href: "/caldera-springs-builder", label: "Caldera Springs" },
  { href: "/neighborhoods", label: "All Neighborhoods" },
];

// Press & Media - Top custom home builder publications and local news
const pressLinks = [
  // National Custom Home Builder Publications
  { href: "https://www.customhomeonline.com", label: "Custom Home Magazine", external: true },
  { href: "https://www.architecturaldigest.com", label: "Architectural Digest", external: true },
  { href: "https://www.luxuryhomedesign.com", label: "Luxury Home Design", external: true },
  { href: "https://www.builderonline.com", label: "Builder Magazine", external: true },
  // Central Oregon Local News
  { href: "https://www.bendbulletin.com", label: "Bend Bulletin", external: true },
  { href: "https://www.ktvz.com", label: "KTVZ NewsChannel 21", external: true },
  { href: "https://cascadebusjnews.com", label: "Cascade Business News", external: true },
  { href: "https://www.sourceweekly.com", label: "The Source Weekly", external: true },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-timber text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-semibold mb-6">
              Rea Co Homes
            </h3>
            <p className="font-body text-white/80 mb-6 leading-relaxed">
              Award-winning custom home builder in Central Oregon since 1977.
              Building luxury homes with uncompromising dedication to detail and
              an artistic touch.
            </p>
            <div className="space-y-3">
              <a
                href="tel:541-390-9848"
                className="flex items-center gap-3 font-body text-white/90 hover:text-amber transition-colors"
              >
                <Phone className="w-5 h-5 text-amber" />
                541-390-9848
              </a>
              <a
                href="mailto:kevin@reacohomes.com"
                className="flex items-center gap-3 font-body text-white/90 hover:text-amber transition-colors"
              >
                <Mail className="w-5 h-5 text-amber" />
                kevin@reacohomes.com
              </a>
              <div className="flex items-start gap-3 font-body text-white/90">
                <MapPin className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                <span>Bend, Oregon<br />Central Oregon</span>
              </div>
              <a
                href="https://g.page/reacohomes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-white/90 hover:text-amber transition-colors mt-4 bg-white/10 px-3 py-2 rounded-lg"
              >
                <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-sm font-medium">Google Business Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-body text-white/80 hover:text-amber transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.reacohomes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-white/80 hover:text-amber transition-colors flex items-center gap-2"
                >
                  Official Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber">
              Build Locations
            </h4>
            <ul className="space-y-3">
              {neighborhoodLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-body text-white/80 hover:text-amber transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Press & Media */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber flex items-center gap-2">
              <Newspaper className="w-5 h-5" />
              Press & Media
            </h4>
            <ul className="space-y-3">
              {pressLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-white/80 hover:text-amber transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber">
              Stay Updated
            </h4>
            <p className="font-body text-white/80 mb-4">
              Subscribe for the latest news on Central Oregon custom homes and
              luxury living.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-amber"
                required
              />
              <Button
                type="submit"
                className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                Subscribe
              </Button>
            </form>
            <p className="font-body text-xs text-white/60 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/60">
            © {new Date().getFullYear()} Rea Company Homes. All rights reserved.
            CCB #193427
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.reacohomes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-white/60 hover:text-amber transition-colors"
            >
              www.reacohomes.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
