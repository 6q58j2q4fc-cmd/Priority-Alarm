/**
 * Header Component - High Desert Modernism Design
 * Sticky navigation with transparent-to-solid transition on scroll
 * Includes dropdown menu for Neighborhoods with landing page links
 * Typography: Source Sans 3 for nav, letter-spaced uppercase
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const neighborhoodLinks = [
  { href: "/brasada-ranch-builder", label: "Brasada Ranch" },
  { href: "/tetherow-custom-homes", label: "Tetherow" },
  { href: "/pronghorn-builder", label: "Pronghorn" },
  { href: "/broken-top-builder", label: "Broken Top" },
  { href: "/caldera-springs-builder", label: "Caldera Springs" },
  { href: "/neighborhoods", label: "All Neighborhoods" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/neighborhoods", label: "Neighborhoods", hasDropdown: true },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Free Guides" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNeighborhoodDropdownOpen, setIsNeighborhoodDropdownOpen] = useState(false);
  const [isMobileNeighborhoodOpen, setIsMobileNeighborhoodOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNeighborhoodDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            link.hasDropdown ? (
              <div 
                key={link.href} 
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setIsNeighborhoodDropdownOpen(true)}
                onMouseLeave={() => setIsNeighborhoodDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 font-body text-sm font-medium uppercase tracking-wider transition-all hover:opacity-70 ${
                    isScrolled ? "text-timber" : "text-white"
                  } ${location.startsWith("/neighborhoods") || location.includes("-builder") || location.includes("-custom-homes") ? "border-b-2 border-amber pb-1" : ""}`}
                  onClick={() => setIsNeighborhoodDropdownOpen(!isNeighborhoodDropdownOpen)}
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isNeighborhoodDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isNeighborhoodDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border overflow-hidden animate-fadeIn">
                    {neighborhoodLinks.map((subLink, index) => (
                      <Link key={subLink.href} href={subLink.href}>
                        <span
                          className={`block px-4 py-3 font-body text-sm text-timber hover:bg-stone hover:text-amber transition-colors ${
                            index === neighborhoodLinks.length - 1 ? "border-t border-border font-semibold" : ""
                          } ${location === subLink.href ? "bg-stone text-amber" : ""}`}
                          onClick={() => setIsNeighborhoodDropdownOpen(false)}
                        >
                          {subLink.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href}>
                <span
                  className={`font-body text-sm font-medium uppercase tracking-wider transition-all hover:opacity-70 ${
                    isScrolled ? "text-timber" : "text-white"
                  } ${location === link.href ? "border-b-2 border-amber pb-1" : ""}`}
                >
                  {link.label}
                </span>
              </Link>
            )
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="container py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.href}>
                  <button
                    className={`flex items-center justify-between w-full font-body text-base font-medium uppercase tracking-wider text-timber hover:text-amber transition-colors py-3 ${
                      location.startsWith("/neighborhoods") || location.includes("-builder") || location.includes("-custom-homes") ? "text-amber" : ""
                    }`}
                    onClick={() => setIsMobileNeighborhoodOpen(!isMobileNeighborhoodOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-5 h-5 transition-transform ${isMobileNeighborhoodOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {isMobileNeighborhoodOpen && (
                    <div className="pl-4 border-l-2 border-amber ml-2 mt-1 mb-2">
                      {neighborhoodLinks.map((subLink) => (
                        <Link key={subLink.href} href={subLink.href}>
                          <span
                            className={`block font-body text-sm text-timber hover:text-amber transition-colors py-2 ${
                              location === subLink.href ? "text-amber font-semibold" : ""
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileNeighborhoodOpen(false);
                            }}
                          >
                            {subLink.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`font-body text-base font-medium uppercase tracking-wider text-timber hover:text-amber transition-colors block py-3 ${
                      location === link.href ? "text-amber" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-border mt-2">
              <a
                href="tel:541-390-9848"
                className="flex items-center gap-2 font-body text-base font-semibold text-timber py-2"
              >
                <Phone className="w-5 h-5" />
                541-390-9848
              </a>
              <Link href="/dream-home-builder">
                <Button 
                  className="w-full mt-4 bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
