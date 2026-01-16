/**
 * UrgencyBanner Component
 * Creates urgency with limited availability messaging
 */

import { useState, useEffect } from "react";
import { X, Clock, Calendar, AlertCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgencyBannerProps {
  variant?: "slots" | "season" | "consultation";
}

export default function UrgencyBanner({ variant = "slots" }: UrgencyBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem("urgencyBannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("urgencyBannerDismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  const content = {
    slots: {
      icon: Calendar,
      title: "Limited 2026 Build Slots Available",
      message: "Kevin Rea only takes on 4-6 custom home projects per year to ensure quality. Reserve your spot now.",
      cta: "Check Availability",
    },
    season: {
      icon: Clock,
      title: "Spring Building Season Approaching",
      message: "Start planning now to break ground in spring. Design consultations filling up fast.",
      cta: "Schedule Consultation",
    },
    consultation: {
      icon: AlertCircle,
      title: "Free Consultation - Limited Time",
      message: "Get a complimentary 1-hour design consultation with Kevin Rea. Offer ends soon.",
      cta: "Claim Your Spot",
    },
  };

  const { icon: Icon, title, message, cta } = content[variant];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-timber via-timber/95 to-timber text-white py-3 px-4 animate-slideDown">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-amber/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-amber" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm md:text-base">{title}</p>
            <p className="text-xs md:text-sm text-white/70 hidden sm:block">{message}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Call Kevin Button */}
          <a href="tel:541-390-9848" className="hidden sm:block">
            <Button 
              size="sm" 
              variant="outline"
              className="border-amber text-amber hover:bg-amber hover:text-timber font-semibold whitespace-nowrap bg-transparent"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </a>
          
          {/* Email Kevin Button - Primary CTA */}
          <a href="mailto:kevin@reacohomes.com?subject=2026%20Build%20Slot%20Inquiry&body=Hi%20Kevin%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20available%20build%20slots%20for%202026.%0A%0APlease%20contact%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you!">
            <Button 
              size="sm" 
              className="bg-amber hover:bg-amber/90 text-timber font-semibold whitespace-nowrap"
            >
              <Mail className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{cta}</span>
              <span className="sm:hidden">Email</span>
            </Button>
          </a>
          
          {/* Mobile Call Button */}
          <a href="tel:541-390-9848" className="sm:hidden">
            <Button 
              size="sm" 
              variant="outline"
              className="border-amber text-amber hover:bg-amber hover:text-timber bg-transparent p-2"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </a>
          
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
