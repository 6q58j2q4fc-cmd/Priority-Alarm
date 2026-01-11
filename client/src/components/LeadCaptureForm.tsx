/**
 * Lead Capture Form Component - High Desert Modernism Design
 * Primary CTA for capturing potential client information
 * Stores leads in localStorage for demo purposes
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const neighborhoods = [
  "Brasada Ranch",
  "Tetherow",
  "Pronghorn",
  "North Rim",
  "Highlands at Broken Top",
  "Tree Farm",
  "Northwest Crossing",
  "Awbrey Butte",
  "Caldera Springs",
  "Broken Top",
  "Sunriver",
  "Black Butte Ranch",
  "Other Central Oregon Location",
];

const budgetRanges = [
  "$500K - $1M",
  "$1M - $2M",
  "$2M - $3M",
  "$3M - $5M",
  "$5M+",
  "Not Sure Yet",
];

const timelines = [
  "Ready to Start",
  "Within 6 Months",
  "6-12 Months",
  "1-2 Years",
  "Just Exploring",
];

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  neighborhood: string;
  budget: string;
  timeline: string;
  message: string;
}

interface LeadCaptureFormProps {
  variant?: "full" | "compact";
  onSuccess?: () => void;
}

export default function LeadCaptureForm({
  variant = "full",
  onSuccess,
}: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    neighborhood: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store lead in localStorage for demo
    const leads = JSON.parse(localStorage.getItem("reaco_leads") || "[]");
    leads.push({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "new",
    });
    localStorage.setItem("reaco_leads", JSON.stringify(leads));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(
      "Thank you! Kevin Rea will be in touch with you shortly.",
      {
        description: "Check your email for a confirmation.",
      }
    );

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <CheckCircle className="w-16 h-16 text-sage mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold text-timber mb-2">
          Thank You!
        </h3>
        <p className="font-body text-muted-foreground mb-4">
          Your inquiry has been received. Kevin Rea will contact you within 24
          hours to discuss your custom home project.
        </p>
        <p className="font-body text-sm text-amber font-semibold">
          Call directly: 541-390-9848
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            className="bg-white"
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          className="bg-white"
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="bg-white"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Request Consultation
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            First Name *
          </label>
          <Input
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            Last Name *
          </label>
          <Input
            placeholder="Smith"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            className="bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className="bg-white"
          />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="(541) 555-0123"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      <div>
        <label className="font-body text-sm font-medium text-timber mb-2 block">
          Preferred Neighborhood
        </label>
        <Select
          value={formData.neighborhood}
          onValueChange={(value) => handleChange("neighborhood", value)}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select a neighborhood" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            Budget Range
          </label>
          <Select
            value={formData.budget}
            onValueChange={(value) => handleChange("budget", value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="font-body text-sm font-medium text-timber mb-2 block">
            Timeline
          </label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => handleChange("timeline", value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="font-body text-sm font-medium text-timber mb-2 block">
          Tell Us About Your Dream Home
        </label>
        <Textarea
          placeholder="Describe your vision, lot location, special requirements, or any questions you have..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={4}
          className="bg-white"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide text-base py-6"
      >
        {isSubmitting ? (
          "Sending Your Inquiry..."
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Request Free Consultation
          </>
        )}
      </Button>

      <p className="font-body text-xs text-center text-muted-foreground">
        By submitting this form, you agree to be contacted by Kevin Rea at Rea
        Co Homes. We respect your privacy and will never share your information.
      </p>
    </form>
  );
}
