/**
 * UrgencyBanner Component
 * Creates urgency with limited availability messaging
 * Displays as a temporary toast-style notification that auto-dismisses
 * Does not block mobile navigation
 */

import { useState, useEffect } from "react";
import { X, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgencyBannerProps {
  variant?: "slots" | "season" | "consultation";
  autoHideDelay?: number; // Auto-hide after this many milliseconds (default 15000 = 15 seconds)
}

export default function UrgencyBanner({ 
  variant = "slots",
  autoHideDelay = 15000 
}: UrgencyBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem("urgencyBannerDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after a delay (5 seconds after page load)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-hide after specified delay
  useEffect(() => {
    if (!isVisible || isDismissed) return;

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed, autoHideDelay]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("urgencyBannerDismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  const content = {
    slots: {
      title: "Limited 2026 Build Slots",
      message: "Only 4-6 projects per year",
    },
    season: {
      title: "Spring Building Season",
      message: "Plan now for spring groundbreaking",
    },
    consultation: {
      title: "Free Consultation",
      message: "Limited time offer",
    },
  };

  const { title, message } = content[variant];

  return (
    <>
      {/* Toast-style notification - positioned at bottom right on desktop, bottom center on mobile */}
      <div 
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 animate-slideUp"
        role="alert"
        aria-live="polite"
      >
        <div className="bg-timber text-white rounded-lg shadow-2xl p-4 border border-amber/20">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-10 h-10 bg-amber/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-amber" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base">{title}</p>
              <p className="text-sm text-white/70 mt-0.5">{message}</p>
              
              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-3">
                <a href="tel:541-390-9848">
                  <Button 
                    size="sm" 
                    className="bg-amber hover:bg-amber/90 text-timber font-semibold"
                  >
                    <Phone className="w-4 h-4 mr-1.5" />
                    Call Now
                  </Button>
                </a>
                
                <a href="mailto:kevin@reacohomes.com?subject=2026%20Build%20Slot%20Inquiry">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-1.5" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress bar showing auto-dismiss countdown */}
          <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber rounded-full animate-shrink"
              style={{ 
                animationDuration: `${autoHideDelay}ms`,
                animationTimingFunction: 'linear'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
