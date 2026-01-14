/**
 * Header Component - High Desert Modernism Design
 * Sticky navigation with transparent-to-solid transition on scroll
 * Typography: Source Sans 3 for nav, letter-spaced uppercase
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 group">
            <div
              className={`font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${
                isScrolled ? "text-timber" : "text-white"
              }`}
            >
              Rea Co Homes
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`font-body text-sm font-medium uppercase tracking-wider transition-all hover:opacity-70 ${
                  isScrolled ? "text-timber" : "text-white"
                } ${location === link.href ? "border-b-2 border-amber pb-1" : ""}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:541-390-9848"
            className={`flex items-center gap-2 font-body text-sm font-semibold transition-colors ${
              isScrolled ? "text-timber" : "text-white"
            }`}
          >
            <Phone className="w-4 h-4" />
            541-390-9848
          </a>
          <Link href="/dream-home-builder">
            <Button
              className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide text-sm px-6"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? "text-timber" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-timber" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`font-body text-base font-medium uppercase tracking-wider text-timber hover:text-amber transition-colors block py-2 ${
                    location === link.href ? "text-amber" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <a
                href="tel:541-390-9848"
                className="flex items-center gap-2 font-body text-base font-semibold text-timber py-2"
              >
                <Phone className="w-5 h-5" />
                541-390-9848
              </a>
              <Link href="/dream-home-builder">
                <Button className="w-full mt-4 bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                  Build Your Dream Home
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
