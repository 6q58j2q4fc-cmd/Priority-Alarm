/**
 * ScrollCTA Component - Scroll-Triggered Call-to-Action
 * Shows a floating CTA after user scrolls past a certain point
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, X, MessageCircle, Calendar } from "lucide-react";
import { Link } from "wouter";

interface ScrollCTAProps {
  scrollThreshold?: number; // Percentage of page scrolled before showing
  variant?: "phone" | "consultation" | "chat";
}

export default function ScrollCTA({ 
  scrollThreshold = 30, 
  variant = "phone" 
}: ScrollCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem("scrollCTADismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= scrollThreshold && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPercent < scrollThreshold / 2) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("scrollCTADismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  const ctaContent = {
    phone: {
      icon: Phone,
      text: "Call Kevin Now",
      subtext: "541-390-9848",
      href: "tel:541-390-9848",
      isExternal: true,
    },
    consultation: {
      icon: Calendar,
      text: "Free Consultation",
      subtext: "Schedule Today",
      href: "/contact",
      isExternal: false,
    },
    chat: {
      icon: MessageCircle,
      text: "Questions?",
      subtext: "Chat with us",
      href: "#chatbot",
      isExternal: false,
    },
  };

  const content = ctaContent[variant];
  const Icon = content.icon;

  return (
    <div className="fixed bottom-24 right-6 z-40 animate-slideUp">
      <div className="relative bg-gradient-to-r from-timber to-timber/95 text-white rounded-2xl shadow-2xl p-4 pr-10 max-w-xs">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {content.isExternal ? (
          <a
            href={content.href}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-timber" />
            </div>
            <div>
              <p className="font-semibold text-white group-hover:text-amber transition-colors">
                {content.text}
              </p>
              <p className="text-sm text-white/70">{content.subtext}</p>
            </div>
          </a>
        ) : (
          <Link href={content.href}>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-timber" />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-amber transition-colors">
                  {content.text}
                </p>
                <p className="text-sm text-white/70">{content.subtext}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Pulse animation ring */}
        <div className="absolute -inset-1 bg-amber/20 rounded-2xl animate-pulse -z-10" />
      </div>
    </div>
  );
}
