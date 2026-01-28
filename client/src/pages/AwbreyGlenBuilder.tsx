/**
 * Awbrey Glen Builder Landing Page
 * Location-specific SEO landing page for "Awbrey Glen custom home builder" searches
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
  Shield,
  ExternalLink,
} from "lucide-react";

const awbreyGlenFeatures = [
  {
    icon: TreePine,
    title: "Private Golf Community",
    description: "Build in one of Bend's most exclusive private golf communities with an 18-hole Gene Bunker designed championship course.",
  },
  {
    icon: Mountain,
    title: "Cascade Views",
    description: "Stunning views of Mt. Bachelor, Broken Top, and the Three Sisters from elevated homesites throughout the community.",
  },
  {
    icon: Shield,
    title: "Gated Security",
    description: "24-hour gated entry provides privacy and security for residents in this prestigious Bend neighborhood.",
  },
  {
    icon: HomeIcon,
    title: "Club Amenities",
    description: "Members enjoy the clubhouse, dining, tennis courts, fitness center, and a vibrant social calendar.",
  },
];

export default function AwbreyGlenBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Awbrey Glen Custom Home Builder"
        description="Build your luxury custom home at Awbrey Glen Golf Club with Kevin Rea. 45+ years experience in Bend's premier private golf community. Call 541-390-9848."
        keywords={["Awbrey Glen builder", "Awbrey Glen custom homes", "Bend golf community builder", "luxury homes Awbrey Glen", "private golf community Bend"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/awbrey-glen-builder"
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
                Awbrey Glen, Bend
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Awbrey Glen Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Bend's most prestigious private golf 
              community. Awbrey Glen offers world-class golf, stunning mountain 
              views, and an exclusive lifestyle. Kevin Rea brings 45+ years of 
              custom home building expertise to create homes worthy of this 
              exceptional setting.
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

      {/* Why Build at Awbrey Glen */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Awbrey Glen
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Private Golf Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Awbrey Glen Golf Club is one of Central Oregon's most exclusive 
              private communities, offering members a championship golf experience, 
              stunning natural beauty, and a close-knit community of discerning 
              homeowners. As an experienced Awbrey Glen builder, Kevin Rea 
              understands the community's architectural standards and how to 
              create homes that complement this prestigious setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awbreyGlenFeatures.map((feature, index) => (
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
                Start Your Awbrey Glen Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Dream Home at Awbrey Glen
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're looking to build on a golf course lot or a 
                secluded homesite with mountain views, Kevin Rea can help you 
                create a home that reflects your vision and meets Awbrey Glen's 
                exacting standards.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Design Review Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Navigate Awbrey Glen's architectural review process with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Golf Course Integration</p>
                    <p className="font-body text-sm text-white/70">
                      Designs that maximize views while respecting the course layout.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Luxury Finishes</p>
                    <p className="font-body text-sm text-white/70">
                      Premium materials and craftsmanship befitting this exclusive community.
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
              <LeadCaptureForm source="awbrey-glen-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
