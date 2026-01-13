/**
 * LeadMagnet Component - Exit Intent Popup & Lead Capture
 * Offers free resources to capture visitor information
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download, Home, CheckCircle, Gift } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface LeadMagnetProps {
  variant?: "popup" | "inline" | "banner";
}

export default function LeadMagnet({ variant = "popup" }: LeadMagnetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitLeadMutation = trpc.leads.submit.useMutation();

  // Exit intent detection for popup variant
  useEffect(() => {
    if (variant !== "popup" || hasShown) return;

    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem("leadMagnetShown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("leadMagnetShown", "true");
      }
    };

    // Also show after 30 seconds of engagement
    const timeoutId = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("leadMagnetShown", "true");
      }
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [variant, hasShown]);

  // Show inline/banner variants immediately
  useEffect(() => {
    if (variant === "inline" || variant === "banner") {
      setIsVisible(true);
    }
  }, [variant]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await submitLeadMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        message: "[Lead Magnet] Requested Free Home Building Guide",
        source: "lead_magnet",
      });
      
      setIsSubmitted(true);
      
      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_magnet_conversion", {
          event_category: "Lead Generation",
          event_label: "Home Building Guide Download",
        });
      }
    } catch (error) {
      console.error("Failed to submit lead:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Success state
  if (isSubmitted) {
    if (variant === "popup") {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center animate-scaleIn">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-timber mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your free guide is on its way to {formData.email}. Kevin will also reach out personally to answer any questions.
            </p>
            <Button onClick={handleClose} className="bg-amber hover:bg-amber/90 text-timber">
              Continue Browsing
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Check your email for your free guide!</p>
      </div>
    );
  }

  // Popup variant
  if (variant === "popup") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-scaleIn">
          {/* Header with image */}
          <div className="bg-gradient-to-r from-timber to-timber/90 text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-timber" />
              </div>
              <div>
                <p className="text-amber text-sm font-medium">FREE DOWNLOAD</p>
                <h3 className="text-xl font-bold">Custom Home Building Guide</h3>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Everything you need to know about building your dream home in Central Oregon
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Cost breakdown by neighborhood & home size</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Step-by-step building timeline</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Questions to ask your builder</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Input
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}

            <Button
              type="submit"
              disabled={submitLeadMutation.isPending}
              className="w-full bg-amber hover:bg-amber/90 text-timber font-semibold py-6 text-lg"
            >
              {submitLeadMutation.isPending ? (
                "Sending..."
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Get Your Free Guide
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to receive emails from Rea Co Homes. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Inline variant (for embedding in pages)
  if (variant === "inline") {
    return (
      <div className="bg-gradient-to-r from-sand to-sand/50 rounded-2xl p-8 border border-amber/20">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-amber rounded-full flex items-center justify-center">
              <Download className="w-10 h-10 text-timber" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-timber mb-2">
              Free Custom Home Building Guide
            </h3>
            <p className="text-gray-600 mb-4">
              Get our comprehensive guide with cost breakdowns, timelines, and insider tips for building in Central Oregon.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="flex-1"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={submitLeadMutation.isPending}
                className="bg-amber hover:bg-amber/90 text-timber whitespace-nowrap"
              >
                {submitLeadMutation.isPending ? "..." : "Get Guide"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (sticky at bottom)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-timber text-white p-4 shadow-lg animate-slideUp">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Gift className="w-8 h-8 text-amber" />
          <div>
            <p className="font-semibold">Free Home Building Guide</p>
            <p className="text-sm text-white/70">Download our comprehensive guide to building in Central Oregon</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value, firstName: "Visitor", lastName: "Banner" })}
            className="w-48 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            type="submit"
            disabled={submitLeadMutation.isPending}
            className="bg-amber hover:bg-amber/90 text-timber"
          >
            {submitLeadMutation.isPending ? "..." : "Get It Free"}
          </Button>
        </form>
        <button onClick={handleClose} className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
