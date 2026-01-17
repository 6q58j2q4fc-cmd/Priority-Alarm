/**
 * Dynamic Testimonials Component
 * Automated social proof with rotating testimonials and engagement tracking
 */

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  projectType?: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Kevin's passion for building is unmatched. His attention to detail, his professionalism and the artful nature with which he approaches every project rings of the highest order.",
    author: "Jim Rozewski",
    location: "Brasada Ranch",
    rating: 5,
    projectType: "Custom Mountain Home",
  },
  {
    id: 2,
    quote: "Kevin is a master builder – of relationships, ideas, teams and spaces. I have known Kevin for a decade and have enjoyed his vision, energy, talents and company every time we've connected.",
    author: "Barbara Sumner",
    location: "O'Neil Residence",
    rating: 5,
    projectType: "Luxury Estate",
  },
  {
    id: 3,
    quote: "We knew immediately upon meeting with Kevin that we found our builder. Clear, present and trustworthy are just a few of the many attributes we enjoyed during our build process.",
    author: "McCartney Family",
    location: "Brasada Ranch",
    rating: 5,
    projectType: "Family Retreat",
  },
  {
    id: 4,
    quote: "The craftsmanship and attention to detail in our home exceeds anything we could have imagined. Kevin and his team truly understand luxury custom home building.",
    author: "The Chiaramonte Family",
    location: "Tetherow",
    rating: 5,
    projectType: "Contemporary Home",
  },
  {
    id: 5,
    quote: "From design to completion, Kevin's expertise and guidance made building our dream home an incredible experience. We couldn't be happier with the result.",
    author: "The Brown Family",
    location: "Pronghorn",
    rating: 5,
    projectType: "Golf Course Estate",
  },
];

interface DynamicTestimonialsProps {
  autoRotate?: boolean;
  rotateInterval?: number;
  variant?: "carousel" | "grid" | "featured";
  className?: string;
}

export default function DynamicTestimonials({
  autoRotate = true,
  rotateInterval = 5000,
  variant = "carousel",
  className = "",
}: DynamicTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, rotateInterval);

    return () => clearInterval(timer);
  }, [autoRotate, rotateInterval, isHovered]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-amber text-amber" : "text-muted"}`}
      />
    ));
  };

  if (variant === "featured") {
    const featured = testimonials[currentIndex];
    return (
      <div
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="bg-gradient-to-br from-timber to-timber/90 text-white overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <Quote className="w-12 h-12 text-amber/30 mb-6" />
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
              "{featured.quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-1 mb-2">{renderStars(featured.rating)}</div>
                <p className="font-semibold text-lg">{featured.author}</p>
                <p className="text-amber text-sm">{featured.location}</p>
                {featured.projectType && (
                  <p className="text-white/60 text-xs mt-1">{featured.projectType}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrev}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {/* Progress indicators */}
            <div className="flex gap-2 mt-6 justify-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-amber w-6" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {testimonials.slice(0, 6).map((testimonial) => (
          <Card key={testimonial.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-muted-foreground mb-4 line-clamp-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-timber">{testimonial.author}</p>
                <p className="text-amber text-sm">{testimonial.location}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Default carousel variant
  const current = testimonials[currentIndex];
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="bg-white shadow-xl">
        <CardContent className="p-8">
          <div className="flex gap-1 mb-4">{renderStars(current.rating)}</div>
          <p className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
            "{current.quote}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-timber">{current.author}</p>
              <p className="text-amber text-sm">{current.location}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={goToPrev}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Progress dots */}
      <div className="flex gap-2 mt-4 justify-center">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-amber w-6" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
