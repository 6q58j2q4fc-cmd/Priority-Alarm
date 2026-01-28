/**
 * Juniper Preserve Builder Landing Page
 * Location-specific SEO landing page for "Juniper Preserve custom home builder" searches
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
  TreePine,
  Mountain,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const juniperFeatures = [
  {
    icon: TreePine,
    title: "Juniper Forest Setting",
    description: "Build among ancient juniper trees in a 640-acre preserve dedicated to wellness, nature, and sustainable living.",
  },
  {
    icon: Mountain,
    title: "Cascade Mountain Views",
    description: "Panoramic views of Mt. Bachelor, Broken Top, and the Three Sisters from elevated homesites throughout the community.",
  },
  {
    icon: Sparkles,
    title: "Wellness Focus",
    description: "World-class spa, fitness center, hiking trails, and wellness programming designed for healthy living.",
  },
  {
    icon: HomeIcon,
    title: "Two Championship Courses",
    description: "Home to the Tom Fazio and Jack Nicklaus Signature golf courses, among the best in the Pacific Northwest.",
  },
];

export default function JuniperPreserveBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Juniper Preserve Custom Home Builder"
        description="Build your luxury custom home at Juniper Preserve (formerly Pronghorn) with Kevin Rea. 45+ years experience in Bend's premier wellness resort. Call 541-390-9848."
        keywords={["Juniper Preserve builder", "Juniper Preserve custom homes", "Pronghorn builder", "Bend wellness community", "luxury homes Juniper Preserve"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/juniper-preserve-builder"
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
                Juniper Preserve, Bend
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Juniper Preserve Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your sanctuary at Juniper Preserve, Central Oregon's 
              premier wellness resort community. Formerly known as Pronghorn, 
              this 640-acre preserve offers world-class golf, spa, and wellness 
              amenities in a stunning high desert setting. Kevin Rea brings 
              45+ years of expertise to build homes that embrace this 
              extraordinary lifestyle.
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
                href="https://juniperpreserve.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Juniper Preserve
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Juniper Preserve */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Juniper Preserve
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Premier Wellness Resort
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Juniper Preserve represents a new vision for resort living, 
              combining world-class golf with a holistic approach to wellness 
              and sustainability. The community features two championship golf 
              courses, a destination spa, farm-to-table dining, and miles of 
              hiking trails through the ancient juniper forest. As an experienced 
              Juniper Preserve builder, Kevin Rea creates homes that honor this 
              unique environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {juniperFeatures.map((feature, index) => (
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
                Start Your Juniper Preserve Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Wellness Retreat at Juniper Preserve
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're seeking a full-time residence or a wellness 
                retreat, Kevin Rea can help you create a home that embodies 
                the Juniper Preserve philosophy of living well.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Sustainable Design</p>
                    <p className="font-body text-sm text-white/70">
                      Eco-conscious homes that align with the preserve's environmental values.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Indoor-Outdoor Living</p>
                    <p className="font-body text-sm text-white/70">
                      Designs that connect you to the natural beauty of the high desert.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Wellness Integration</p>
                    <p className="font-body text-sm text-white/70">
                      Home features that support healthy living and relaxation.
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
              <LeadCaptureForm source="juniper-preserve-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
