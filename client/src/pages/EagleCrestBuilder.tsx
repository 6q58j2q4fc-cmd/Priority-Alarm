/**
 * Eagle Crest Builder Landing Page
 * Location-specific SEO landing page for "Eagle Crest custom home builder" searches
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
  CheckCircle,
  Mountain,
  Sun,
  Bike,
  ExternalLink,
} from "lucide-react";

const eagleCrestFeatures = [
  {
    icon: Mountain,
    title: "Three Golf Courses",
    description: "Eagle Crest offers three distinct golf courses, providing variety and challenge for golfers of all skill levels.",
  },
  {
    icon: Sun,
    title: "Year-Round Recreation",
    description: "Enjoy pools, tennis, pickleball, hiking trails, and equestrian facilities in Central Oregon's sunny high desert climate.",
  },
  {
    icon: Bike,
    title: "Active Lifestyle",
    description: "Miles of paved trails for biking and walking, plus easy access to skiing, fishing, and outdoor adventures.",
  },
  {
    icon: HomeIcon,
    title: "Resort Amenities",
    description: "Full resort amenities including spa, restaurants, and vacation rental programs for investment potential.",
  },
];

export default function EagleCrestBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Eagle Crest Custom Home Builder | Redmond Oregon"
        description="Build your dream home at Eagle Crest Resort in Redmond, Oregon with Kevin Rea, Central Oregon's premier custom home builder. 45+ years experience. Call 541-390-9848."
        keywords={["Eagle Crest builder", "Eagle Crest custom homes", "Redmond Oregon home builder", "Central Oregon resort homes", "Eagle Crest real estate", "golf community Redmond"]}
        ogImage="/images/hero-neighborhoods.jpg"
        canonicalUrl="/eagle-crest-builder"
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
                Redmond, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Eagle Crest Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home at Eagle Crest Resort in Redmond, Oregon. 
              Kevin Rea brings 45+ years of custom home building expertise to create 
              exceptional residences with resort amenities and stunning Cascade views.
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
                href="https://www.eagle-crest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Eagle Crest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Eagle Crest */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Eagle Crest
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Premier Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Eagle Crest offers an exceptional resort lifestyle with three golf courses, 
              multiple pools, and year-round recreation. Located just minutes from Redmond 
              and Bend, it's the perfect blend of resort living and Central Oregon convenience. 
              Kevin Rea understands how to build homes that maximize this unique setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eagleCrestFeatures.map((feature, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Project
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Dream Home at Eagle Crest
              </h2>
              <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                Whether you're looking for a primary residence or a vacation home with 
                rental potential, Kevin Rea can help you design and build a custom home 
                that takes full advantage of Eagle Crest's resort amenities and lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:541-390-9848">
                  <Button
                    size="lg"
                    className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    541-390-9848
                  </Button>
                </a>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide bg-transparent"
                  >
                    View Portfolio
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <h3 className="font-display text-2xl font-semibold text-timber mb-6 text-center">
                Request a Consultation
              </h3>
              <LeadCaptureForm source="eagle-crest-builder" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
