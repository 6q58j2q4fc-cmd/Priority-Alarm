/**
 * Caldera Springs Builder Landing Page
 * Location-specific SEO landing page for "Caldera Springs custom home builder" searches
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
  Waves,
  TreePine,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const calderaFeatures = [
  {
    icon: Waves,
    title: "Lake & River Access",
    description: "Enjoy the Deschutes River and pristine lakes with exclusive community water access and recreation.",
  },
  {
    icon: TreePine,
    title: "Sunriver Location",
    description: "Part of the renowned Sunriver Resort community with access to world-class amenities and natural beauty.",
  },
  {
    icon: HomeIcon,
    title: "Family-Friendly Design",
    description: "Caldera Springs emphasizes outdoor living with pools, hot tubs, and gathering spaces perfect for families.",
  },
  {
    icon: Star,
    title: "Year-Round Recreation",
    description: "Skiing, hiking, biking, fishing, and golf all within minutes of your custom home.",
  },
];

const calderaProjects = [
  {
    name: "Lakeside Retreat",
    description: "Modern mountain design with water views",
    image: "/images/UCoE7gADVKD9.jpg",
  },
  {
    name: "Forest Contemporary",
    description: "Open floor plan embracing natural surroundings",
    image: "/images/qHKfAGVqL6Y8.jpg",
  },
];

export default function CalderaSpringsBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Caldera Springs Custom Home Builder"
        description="Build your luxury custom home at Caldera Springs in Sunriver with Kevin Rea. 45+ years experience. Family-friendly resort living. Call 541-390-9848."
        keywords={["Caldera Springs builder", "Caldera Springs custom homes", "Sunriver luxury homes", "Sunriver real estate", "Central Oregon vacation homes"]}
        ogImage="/images/UCoE7gADVKD9.jpg"
        canonicalUrl="/caldera-springs-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/UCoE7gADVKD9.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                Sunriver, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Caldera Springs Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your dream vacation home or year-round residence at Caldera Springs, 
              Sunriver's premier family-friendly resort community. Kevin Rea brings 45+ years 
              of custom home building expertise to craft homes designed for the ultimate 
              Central Oregon lifestyle.
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
                href="https://www.calderasprings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Caldera Springs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Caldera Springs */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Caldera Springs
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Sunriver's Premier Family Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Caldera Springs offers the perfect blend of resort amenities and natural 
              beauty, making it ideal for vacation homes or year-round living. As an 
              experienced Caldera Springs builder, Kevin Rea creates homes that maximize 
              the indoor-outdoor lifestyle this community is known for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calderaFeatures.map((feature, index) => (
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

      {/* Featured Projects */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Caldera Springs Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Luxury Homes at Caldera Springs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {calderaProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Caldera Springs Custom Home`}
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

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Caldera Springs Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home at Caldera Springs
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you're creating a vacation getaway or a permanent residence, 
                Kevin Rea can help you design and build a home that captures the 
                Caldera Springs lifestyle with resort-quality finishes and 
                family-friendly features.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Indoor-Outdoor Living</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Designs that maximize patios, decks, and outdoor spaces.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Vacation Rental Ready</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Floor plans optimized for rental income potential.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Low-Maintenance Design</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Durable materials perfect for vacation home ownership.
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
              <LeadCaptureForm source="caldera-springs-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="caldera-springs" />

      <Footer />
    </div>
  );
}
