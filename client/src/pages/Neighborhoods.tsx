/**
 * Neighborhoods Page - High Desert Modernism Design
 * Showcases all Central Oregon communities where Rea Co Homes builds
 */

import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, MapPin, Mountain, Trees, Home, Circle } from "lucide-react";

const neighborhoods = [
  {
    name: "Brasada Ranch",
    location: "Powell Butte, Oregon",
    description: "A thriving, active, family-friendly community with world-class amenities and stunning high desert views.",
    image: "/images/hero-neighborhoods.jpg",
    features: ["Golf Course", "Spa & Fitness", "Equestrian"],
    icon: Mountain,
  },
  {
    name: "Tetherow",
    location: "Bend, Oregon",
    description: "Modern luxury living with a championship golf course and panoramic Cascade Mountain views.",
    image: "/images/qHKfAGVqL6Y8.jpg",
    features: ["Golf Course", "Resort Amenities", "Mountain Views"],
    icon: Circle,
  },
  {
    name: "Pronghorn",
    location: "Bend, Oregon",
    description: "An exclusive resort community featuring two championship golf courses and luxury amenities.",
    image: "/images/asoZsc8CLN0r.jpg",
    features: ["Two Golf Courses", "Spa", "Fine Dining"],
    icon: Circle,
  },
  {
    name: "North Rim",
    location: "Bend, Oregon",
    description: "Elevated living on the rim with dramatic canyon views and modern architecture.",
    image: "/images/WkNH38aWPs08.jpg",
    features: ["Canyon Views", "Modern Design", "Privacy"],
    icon: Mountain,
  },
  {
    name: "Highlands at Broken Top",
    location: "Bend, Oregon",
    description: "Prestigious community with mature landscaping and proximity to Mt. Bachelor.",
    image: "/images/LlxE9731ghDy.jpg",
    features: ["Golf Access", "Mature Trees", "Mountain Access"],
    icon: Trees,
  },
  {
    name: "Tree Farm",
    location: "Bend, Oregon",
    description: "A newer community with large lots and a focus on outdoor living and natural beauty.",
    image: "/images/UCoE7gADVKD9.jpg",
    features: ["Large Lots", "Natural Setting", "Trails"],
    icon: Trees,
  },
  {
    name: "Northwest Crossing",
    location: "Bend, Oregon",
    description: "A walkable, new urbanist community with parks, shops, and restaurants.",
    image: "/images/oov3bdfkfk6B.jpg",
    features: ["Walkable", "Parks", "Community Feel"],
    icon: Home,
  },
  {
    name: "Awbrey Butte",
    location: "Bend, Oregon",
    description: "Established neighborhood with stunning views and proximity to downtown Bend.",
    image: "/images/hero-portfolio.jpg",
    features: ["City Views", "Established", "Central Location"],
    icon: Mountain,
  },
  {
    name: "Caldera Springs",
    location: "Sunriver, Oregon",
    description: "Resort living with access to Sunriver amenities and natural hot springs.",
    image: "/images/cascade-mountains.jpg",
    features: ["Hot Springs", "Resort Access", "Nature"],
    icon: Mountain,
  },
  {
    name: "Broken Top",
    location: "Bend, Oregon",
    description: "One of Bend's most prestigious golf communities with stunning architecture.",
    image: "/images/hero-main.jpg",
    features: ["Golf Course", "Prestigious", "Views"],
    icon: Circle,
  },
  {
    name: "Sunriver",
    location: "Sunriver, Oregon",
    description: "A world-renowned resort community with endless recreational opportunities.",
    image: "/images/StN3qFqGILG2.jpg",
    features: ["Resort Living", "Recreation", "Nature"],
    icon: Trees,
  },
  {
    name: "Black Butte Ranch",
    location: "Black Butte Ranch, Oregon",
    description: "A peaceful retreat with two golf courses and stunning mountain backdrop.",
    image: "/images/XzcSzQzgCZoy.jpg",
    features: ["Two Golf Courses", "Mountain Views", "Peaceful"],
    icon: Mountain,
  },
];

export default function Neighborhoods() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Central Oregon Neighborhoods"
        description="Build your custom home in Central Oregon's finest communities: Brasada Ranch, Tetherow, Pronghorn, Broken Top, Awbrey Butte, and more."
        keywords="Brasada Ranch homes, Tetherow builder, Pronghorn custom homes, Broken Top, Awbrey Butte, Central Oregon neighborhoods"
        ogImage="/images/hero-neighborhoods.jpg"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-neighborhoods.jpg')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Where We Build
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Central Oregon Neighborhoods
          </h1>
          <p className="font-body text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Central Oregon is a place of mysterious beauty and splendor. Rea Company Homes has been artfully crafting luxury custom homes within these landscapes since 1977.
          </p>
        </div>
      </section>

      {/* Region Description */}
      <section className="py-16 bg-stone">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-timber mb-6">
              High Desert Luxury Living
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              The region consists of three counties in Oregon: Deschutes, Jefferson and Crook. The land is flooded with geographical wonders as the sands of the Oregon High Desert gleam under the constant rays of sunshine. There are countless sights of volcanic rock formations that form colorful buttes and crystalline clear crater lakes. The high, majestic mountains overshadow the lands like that of an artist's paint brush.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <Card
                key={neighborhood.name}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <neighborhood.icon className="w-5 h-5 text-amber" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-timber mb-1">
                    {neighborhood.name}
                  </h3>
                  <p className="font-body text-sm text-amber flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" />
                    {neighborhood.location}
                  </p>
                  <p className="font-body text-muted-foreground text-sm mb-4">
                    {neighborhood.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-body text-xs bg-stone px-3 py-1 rounded-full text-timber"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-timber rounded-2xl p-12">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to Build in Central Oregon?
            </h3>
            <p className="font-body text-white/80 mb-8 max-w-2xl mx-auto">
              Contact Kevin Rea today for recommendations on the perfect neighborhood for your custom home and to discuss your vision.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                Request Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
