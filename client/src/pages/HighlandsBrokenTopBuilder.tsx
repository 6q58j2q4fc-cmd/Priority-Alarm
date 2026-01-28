/**
 * The Highlands at Broken Top Builder Landing Page
 * Location-specific SEO landing page for "Highlands Broken Top custom home builder" searches
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
  Shield,
  TreePine,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const highlandsFeatures = [
  {
    icon: Mountain,
    title: "Elevated Views",
    description: "Premium homesites on elevated terrain offer unobstructed views of the Cascade Mountains and Broken Top golf course.",
  },
  {
    icon: Shield,
    title: "Gated Privacy",
    description: "Exclusive gated community within Broken Top provides enhanced privacy and security for residents.",
  },
  {
    icon: TreePine,
    title: "Natural Setting",
    description: "Surrounded by native ponderosa pines and juniper, with direct access to hiking trails and open spaces.",
  },
  {
    icon: HomeIcon,
    title: "Broken Top Access",
    description: "Full access to Broken Top's amenities including the championship golf course, clubhouse, and fitness facilities.",
  },
];

export default function HighlandsBrokenTopBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="The Highlands at Broken Top Custom Home Builder"
        description="Build your luxury custom home in The Highlands at Broken Top with Kevin Rea. 45+ years experience in Bend's most exclusive gated community. Call 541-390-9848."
        keywords={["Highlands Broken Top builder", "Highlands custom homes Bend", "gated community Bend builder", "luxury homes Broken Top", "exclusive Bend neighborhoods"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/highlands-broken-top-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-main.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                The Highlands at Broken Top, Bend
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              The Highlands at Broken Top Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your estate home in Bend's most exclusive enclave. The 
              Highlands at Broken Top offers premium elevated homesites with 
              spectacular mountain views, gated privacy, and full access to 
              Broken Top's world-class amenities. Kevin Rea brings 45+ years 
              of expertise to create homes worthy of this exceptional setting.
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
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at The Highlands */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why The Highlands
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Most Exclusive Address
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              The Highlands at Broken Top represents the pinnacle of Central 
              Oregon living. This gated community within Broken Top offers 
              larger homesites on elevated terrain, providing unmatched privacy 
              and the most spectacular views in the area. As an experienced 
              Highlands builder, Kevin Rea understands the exacting standards 
              and creates homes that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlandsFeatures.map((feature, index) => (
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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Highlands Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Estate Home in The Highlands
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                The Highlands demands the finest craftsmanship and attention 
                to detail. Kevin Rea's 45+ years of experience ensures your 
                home will be a masterpiece worthy of this prestigious address.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">View Optimization</p>
                    <p className="font-body text-sm text-white/70">
                      Designs that maximize your lot's spectacular mountain views.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Premium Materials</p>
                    <p className="font-body text-sm text-white/70">
                      Only the finest materials and finishes for discerning homeowners.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Design Review Success</p>
                    <p className="font-body text-sm text-white/70">
                      Expert navigation of The Highlands' architectural standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:541-390-9848">
                  <Button className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                    <Phone className="w-4 h-4 mr-2" />
                    541-390-9848
                  </Button>
                </a>
                <a href="mailto:kevin@reacohomes.com">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide bg-transparent">
                    kevin@reacohomes.com
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="font-display text-2xl font-semibold text-timber mb-6 text-center">
                Request a Free Consultation
              </h3>
              <LeadCaptureForm source="highlands-broken-top-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="highlands-broken-top" />

      <Footer />
    </div>
  );
}
