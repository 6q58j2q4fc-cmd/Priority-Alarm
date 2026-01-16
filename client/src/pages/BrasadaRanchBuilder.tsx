/**
 * Brasada Ranch Builder Landing Page
 * Location-specific SEO landing page for "Brasada Ranch custom home builder" searches
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Phone,
  Award,
  Home as HomeIcon,
  MapPin,
  ArrowRight,
  Star,
  CheckCircle,
  Mountain,
  Sun,
  TreePine,
  ExternalLink,
} from "lucide-react";

const brasadaFeatures = [
  {
    icon: Mountain,
    title: "Cascade Mountain Views",
    description: "Every home we build at Brasada Ranch is designed to maximize the stunning views of the Cascade Range, including Mt. Bachelor and the Three Sisters.",
  },
  {
    icon: Sun,
    title: "High Desert Living",
    description: "Our designs embrace the unique high desert climate with passive solar orientation, natural ventilation, and indoor-outdoor living spaces.",
  },
  {
    icon: TreePine,
    title: "Natural Integration",
    description: "We use local materials like juniper, basalt, and reclaimed timber to create homes that blend seamlessly with the Central Oregon landscape.",
  },
  {
    icon: HomeIcon,
    title: "Resort Amenities",
    description: "Build your dream home with access to Brasada's world-class amenities including golf, spa, equestrian center, and miles of hiking trails.",
  },
];

const brasadaProjects = [
  {
    name: "Rozewski Residence",
    description: "Modern mountain contemporary with panoramic Cascade views",
    image: "/images/hero-neighborhoods.jpg",
  },
  {
    name: "McCartney Family Home",
    description: "Rustic elegance meets modern luxury living",
    image: "/images/chiaramonte-hero-exterior.webp",
  },
];

const testimonials = [
  {
    quote: "Kevin's passion for building is unmatched. His attention to detail, his professionalism and the artful nature with which he approaches every project rings of the highest order.",
    author: "Jim Rozewski",
    location: "Brasada Ranch",
  },
  {
    quote: "We knew immediately upon meeting with Kevin that we found our builder. Clear, present and trustworthy are just a few of the many attributes we enjoyed during our build process.",
    author: "McCartney Family",
    location: "Brasada Ranch",
  },
];

export default function BrasadaRanchBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Brasada Ranch Custom Home Builder"
        description="Build your dream home at Brasada Ranch with Kevin Rea, Central Oregon's premier custom home builder. 45+ years experience. Call 541-390-9848."
        keywords={["Brasada Ranch builder", "Brasada Ranch custom homes", "Powell Butte home builder", "Central Oregon luxury homes", "Brasada Ranch real estate"]}
        ogImage="/images/hero-neighborhoods.jpg"
        canonicalUrl="/brasada-ranch-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-neighborhoods.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                Powell Butte, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Brasada Ranch Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Central Oregon's most prestigious resort community. 
              Kevin Rea has been crafting exceptional luxury homes at Brasada Ranch since 
              the community's inception, with an unmatched understanding of the land, 
              architecture, and lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:541-390-9848">
                <Button
                  size="lg"
                  className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide text-base px-8"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 541-390-9848
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide text-base px-8 bg-transparent"
                >
                  Request Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber" />
                <span className="font-body text-white/80 text-sm">
                  45+ Years Experience
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber" />
                <span className="font-body text-white/80 text-sm">
                  CCB #193427
                </span>
              </div>
              <a
                href="https://www.brasada.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Brasada Ranch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Brasada */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Brasada Ranch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Premier Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Brasada Ranch offers an unparalleled lifestyle with 1,800 acres of high desert 
              beauty, world-class amenities, and breathtaking Cascade Mountain views. 
              As the community's most experienced builder, Kevin Rea understands every 
              nuance of building in this unique environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brasadaFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-amber mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-timber mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brasada Projects */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Brasada Ranch Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Award-Winning Homes at Brasada
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {brasadaProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Brasada Ranch Custom Home`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-timber/90 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-1">
                      {project.name}
                    </h3>
                    <p className="font-body text-white/80 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                View Full Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Brasada Ranch Homeowners
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg p-6 relative">
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                  ))}
                </div>
                <CardContent className="p-0 pt-8">
                  <p className="font-body text-muted-foreground italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-display font-semibold text-timber">
                      {testimonial.author}
                    </p>
                    <p className="font-body text-sm text-amber flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Brasada Ranch Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home at Brasada Ranch
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you already own a lot at Brasada Ranch or are exploring 
                the community for the first time, Kevin Rea can guide you through 
                every step of the custom home building process.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Lot Selection Assistance</p>
                    <p className="font-body text-sm text-muted-foreground">
                      We'll help you find the perfect lot with optimal views and orientation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Design Review Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Navigate Brasada's architectural guidelines with our proven experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Turnkey Construction</p>
                    <p className="font-body text-sm text-muted-foreground">
                      From concept to completion, we manage every detail of your build.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:541-390-9848">
                  <Button className="bg-timber text-white hover:bg-timber/90 font-body font-semibold uppercase tracking-wide">
                    <Phone className="w-4 h-4 mr-2" />
                    541-390-9848
                  </Button>
                </a>
                <a href="mailto:kevin@reacohomes.com">
                  <Button variant="outline" className="border-timber text-timber hover:bg-timber/10 font-body font-semibold uppercase tracking-wide">
                    kevin@reacohomes.com
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="font-display text-2xl font-semibold text-timber mb-6 text-center">
                Request a Free Consultation
              </h3>
              <LeadCaptureForm source="brasada-ranch-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
