/**
 * Testimonials Page
 * Displays approved testimonials and allows new submissions
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import TestimonialForm from "@/components/TestimonialForm";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Testimonials() {
  const { data: testimonials, isLoading } = trpc.testimonials.getApproved.useQuery();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Client Testimonials"
        description="Read what our clients say about working with Kevin Rea and Rea Co Homes. Real reviews from homeowners in Brasada Ranch, Tetherow, and Central Oregon."
        keywords="Rea Co Homes reviews, Kevin Rea testimonials, Central Oregon builder reviews, Brasada Ranch home builder reviews"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-timber">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Client Testimonials
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
              What Our Clients Say
            </h1>
            <p className="font-body text-lg text-white/80">
              Don't just take our word for it. Hear from homeowners who have
              trusted Kevin Rea to build their dream homes in Central Oregon.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-cream">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                    <div className="h-20 bg-gray-200 rounded mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-amber text-amber"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-amber/20" />
                      <p className="font-body text-muted-foreground italic pl-4">
                        "{testimonial.testimonial}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="border-t border-border pt-4">
                      <p className="font-display font-semibold text-timber">
                        {testimonial.clientName}
                      </p>
                      {testimonial.location && (
                        <p className="font-body text-sm text-amber flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </p>
                      )}
                      {testimonial.projectType && (
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          {testimonial.projectType}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground mb-4">
                Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Testimonial Section */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Share Your Experience
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
                Submit Your Testimonial
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Have you worked with Kevin Rea? We'd love to hear about your
                experience building your dream home.
              </p>
            </div>

            <Card className="bg-white border-0 shadow-xl">
              <CardContent className="p-8">
                <TestimonialForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
