/**
 * Testimonial Submission Form
 * Allows past clients to submit reviews
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Send, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const neighborhoods = [
  "Brasada Ranch",
  "Tetherow",
  "Pronghorn",
  "Broken Top",
  "Awbrey Butte",
  "North Rim",
  "Tree Farm",
  "Northwest Crossing",
  "Caldera Springs",
  "Sunriver",
  "Other",
];

const projectTypes = [
  "Custom Home",
  "Remodel",
  "Addition",
  "Vacation Home",
  "Investment Property",
];

export default function TestimonialForm() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    location: "",
    projectType: "",
    testimonial: "",
  });

  const submitMutation = trpc.testimonials.submit.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit testimonial");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail || undefined,
      location: formData.location || undefined,
      projectType: formData.projectType || undefined,
      rating,
      testimonial: formData.testimonial,
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-timber mb-2">
          Thank You!
        </h3>
        <p className="font-body text-muted-foreground">
          Your testimonial has been submitted and will be reviewed shortly.
          We appreciate you taking the time to share your experience!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <Label className="font-body text-sm font-medium text-timber mb-2 block">
          Your Rating *
        </Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-amber text-amber"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="clientName" className="font-body text-sm font-medium text-timber">
          Your Name *
        </Label>
        <Input
          id="clientName"
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          placeholder="John & Jane Smith"
          required
          className="mt-1"
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="clientEmail" className="font-body text-sm font-medium text-timber">
          Email (optional)
        </Label>
        <Input
          id="clientEmail"
          type="email"
          value={formData.clientEmail}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          placeholder="your@email.com"
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Your email will not be displayed publicly
        </p>
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location" className="font-body text-sm font-medium text-timber">
          Project Location
        </Label>
        <Select
          value={formData.location}
          onValueChange={(value) => setFormData({ ...formData, location: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select neighborhood" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Project Type */}
      <div>
        <Label htmlFor="projectType" className="font-body text-sm font-medium text-timber">
          Project Type
        </Label>
        <Select
          value={formData.projectType}
          onValueChange={(value) => setFormData({ ...formData, projectType: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Testimonial */}
      <div>
        <Label htmlFor="testimonial" className="font-body text-sm font-medium text-timber">
          Your Testimonial *
        </Label>
        <Textarea
          id="testimonial"
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          placeholder="Share your experience working with Kevin Rea and Rea Co Homes..."
          required
          rows={5}
          className="mt-1"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold"
      >
        {submitMutation.isPending ? (
          "Submitting..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Testimonial
          </>
        )}
      </Button>
    </form>
  );
}
