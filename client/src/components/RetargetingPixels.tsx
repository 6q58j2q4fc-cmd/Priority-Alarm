/**
 * RetargetingPixels Component
 * Integrates Facebook Pixel, Google Ads, and other retargeting platforms
 * Pixels are loaded from environment variables for easy configuration
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

// Environment variables for pixel IDs
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID;
const BING_UET_TAG = import.meta.env.VITE_BING_UET_TAG;

// Declare global types for pixel functions
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
    lintrk: (...args: unknown[]) => void;
    uetq: unknown[];
  }
}

// Initialize Facebook Pixel
function initFacebookPixel() {
  if (!FB_PIXEL_ID || typeof window === "undefined") return;

  // Facebook Pixel base code
  (function(f: Window, b: Document, e: string, v: string) {
    if (typeof f.fbq === "function") return;
    const n: any = f.fbq = function(...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
  console.log("[Retargeting] Facebook Pixel initialized");
}

// Initialize Google Ads Remarketing
function initGoogleAds() {
  if (!GOOGLE_ADS_ID || typeof window === "undefined") return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  console.log("[Retargeting] Google Ads initialized");
}

// Initialize LinkedIn Insight Tag
function initLinkedIn() {
  if (!LINKEDIN_PARTNER_ID || typeof window === "undefined") return;

  const script = document.createElement("script");
  script.innerHTML = `
    _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    (function(l) {
      if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);})(window.lintrk);
  `;
  document.head.appendChild(script);
  console.log("[Retargeting] LinkedIn Insight Tag initialized");
}

// Initialize Bing UET Tag
function initBingUET() {
  if (!BING_UET_TAG || typeof window === "undefined") return;

  const script = document.createElement("script");
  script.innerHTML = `
    (function(w,d,t,r,u){
      var f,n,i;
      w[u]=w[u]||[],f=function(){
        var o={ti:"${BING_UET_TAG}"};
        o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
      },
      n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
        var s=this.readyState;
        s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
      },
      i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
    })(window,document,"script","//bat.bing.com/bat.js","uetq");
  `;
  document.head.appendChild(script);
  console.log("[Retargeting] Bing UET Tag initialized");
}

// Track custom events
export function trackFBEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

export function trackGoogleConversion(conversionId: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
      ...params,
    });
  }
}

export function trackLinkedInConversion(conversionId: string) {
  if (typeof window !== "undefined" && window.lintrk) {
    window.lintrk("track", { conversion_id: conversionId });
  }
}

// Track lead form submissions
export function trackLeadConversion(source: string) {
  // Facebook
  trackFBEvent("Lead", { content_name: source });
  
  // Google Ads
  if (GOOGLE_ADS_ID) {
    trackGoogleConversion(`${GOOGLE_ADS_ID}/lead`, { value: 1.0, currency: "USD" });
  }
  
  // LinkedIn
  if (LINKEDIN_PARTNER_ID) {
    trackLinkedInConversion("lead");
  }
  
  console.log("[Retargeting] Lead conversion tracked:", source);
}

// Track page views for retargeting
export function trackPageViewForRetargeting(path: string) {
  // Facebook
  if (window.fbq) {
    window.fbq("track", "PageView");
  }
  
  // Google Ads
  if (window.gtag && GOOGLE_ADS_ID) {
    window.gtag("config", GOOGLE_ADS_ID, { page_path: path });
  }
}

// Main component
export default function RetargetingPixels() {
  const [location] = useLocation();

  // Initialize all pixels on mount
  useEffect(() => {
    initFacebookPixel();
    initGoogleAds();
    initLinkedIn();
    initBingUET();
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageViewForRetargeting(location);
  }, [location]);

  return null; // This component doesn't render anything
}
