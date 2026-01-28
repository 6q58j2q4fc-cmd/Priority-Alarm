/**
 * Broken Top Builder Landing Page
 * Location-specific SEO landing page for "Broken Top custom home builder" searches
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
  TreePine,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const brokenTopFeatures = [
  {
    icon: Mountain,
    title: "Cascade Mountain Views",
    description: "Stunning panoramic views of Mt. Bachelor, Broken Top, and the Three Sisters from your custom home.",
  },
  {
    icon: TreePine,
    title: "Natural Forest Setting",
    description: "Homesites nestled among mature ponderosa pines with a true mountain living experience.",
  },
  {
    icon: HomeIcon,
    title: "Private Golf Club",
    description: "Access to the exclusive Broken Top Club with its Tom Weiskopf-designed championship course.",
  },
  {
    icon: Star,
    title: "Prime Bend Location",
    description: "Just minutes from downtown Bend while offering complete privacy and seclusion.",
  },
];

const brokenTopProjects = [
  {
    name: "Mountain Contemporary",
    description: "Clean lines with natural materials and mountain views",
    image: "/images/WkNH38aWPs08.jpg",
  },
  {
    name: "Craftsman Estate",
    description: "Timeless design with modern luxury amenities",
    image: "/images/LlxE9731ghDy.jpg",
  },
];

export default function BrokenTopBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Broken Top Custom Home Builder"
        description="Build your luxury custom home at Broken Top with Kevin Rea. 45+ years experience in Bend's most prestigious golf community. Call 541-390-9848."
        keywords={["Broken Top builder", "Broken Top custom homes", "Bend Oregon luxury homes", "Broken Top real estate", "golf course homes Bend"]}
        ogImage="/images/WkNH38aWPs08.jpg"
        canonicalUrl="/broken-top-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/WkNH38aWPs08.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                Bend, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Broken Top Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your dream home at Broken Top, one of Bend's most prestigious 
              and established luxury communities. Kevin Rea brings 45+ years of 
              custom home building expertise to craft homes that honor the natural 
              beauty and architectural heritage of this iconic neighborhood.
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
                href="https://www.brokentop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Broken Top
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Broken Top */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Broken Top
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Most Prestigious Address
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Broken Top has been Bend's premier luxury community for decades, 
              offering an unmatched combination of natural beauty, privacy, and 
              world-class golf. As an experienced Broken Top builder, Kevin Rea 
              understands how to create homes that complement this exceptional setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brokenTopFeatures.map((feature, index) => (
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
              Our Broken Top Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Luxury Homes at Broken Top
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {brokenTopProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Broken Top Custom Home`}
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
                Start Your Broken Top Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home at Broken Top
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you're building on a golf course lot or a forested homesite, 
                Kevin Rea can help you create a home that honors Broken Top's 
                architectural traditions while incorporating modern luxury amenities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Architectural Harmony</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Designs that complement Broken Top's established aesthetic.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">HOA Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Smooth approval process with our community experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Mountain Luxury</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Premium finishes that capture the Cascade lifestyle.
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
              <LeadCaptureForm source="broken-top-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="broken-top" />

      <Footer />
    </div>
  );
}
