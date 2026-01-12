/**
 * Google Analytics Component
 * Integrates GA4 tracking across the website
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

// GA4 Measurement ID from environment variable
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Declare gtag on window
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize gtag
function initGtag() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  // Create dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Initialize with timestamp
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
}

// Track page views
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// Track lead form submissions
export function trackLeadSubmission(source: string) {
  trackEvent("generate_lead", "Lead", source);
}

// Track social shares
export function trackSocialShare(platform: string, url: string) {
  trackEvent("share", "Social", `${platform}: ${url}`);
}

// Track article views
export function trackArticleView(title: string, category: string) {
  trackEvent("view_item", "Article", title);
}

// Track phone clicks
export function trackPhoneClick() {
  trackEvent("click", "Contact", "Phone: 541-390-9848");
}

// Track email clicks
export function trackEmailClick() {
  trackEvent("click", "Contact", "Email: kevin@reacohomes.com");
}

// Google Analytics Provider Component
export default function GoogleAnalytics() {
  const [location] = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.log("[GA] No measurement ID configured - analytics disabled");
      return;
    }

    // Load GA script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initGtag();
      console.log("[GA] Google Analytics initialized");
    };

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      trackPageView(location);
    }
  }, [location]);

  return null; // This component doesn't render anything
}
