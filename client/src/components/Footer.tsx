/**
 * Footer Component - High Desert Modernism Design
 * Dark timber background with warm accents
 * Contains contact info, navigation, and newsletter signup
 */

import { Link } from "wouter";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About Kevin" },
  { href: "/news", label: "Industry News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const neighborhoods = [
  "Brasada Ranch",
  "Tetherow",
  "Pronghorn",
  "Broken Top",
  "Awbrey Butte",
  "North Rim",
  "Tree Farm",
  "Caldera Springs",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
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
              Neighborhoods
            </h4>
            <ul className="space-y-3">
              {neighborhoods.map((neighborhood) => (
                <li key={neighborhood}>
                  <Link href="/neighborhoods">
                    <span className="font-body text-white/80 hover:text-amber transition-colors">
                      {neighborhood}
                    </span>
                  </Link>
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
