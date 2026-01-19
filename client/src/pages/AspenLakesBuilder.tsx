/**
 * Aspen Lakes Builder Landing Page
 * Location-specific SEO landing page for "Aspen Lakes custom home builder" searches
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
  Waves,
  TreePine,
  ExternalLink,
} from "lucide-react";

const aspenLakesFeatures = [
  {
    icon: Mountain,
    title: "Three Sisters Views",
    description: "Every home we build at Aspen Lakes is designed to maximize the stunning views of the Three Sisters mountains and the surrounding Cascade Range.",
  },
  {
    icon: Waves,
    title: "Pristine Lakes",
    description: "Build your dream home with access to beautiful lakes and water features that define the Aspen Lakes community experience.",
  },
  {
    icon: TreePine,
    title: "Sisters Lifestyle",
    description: "Enjoy the charm of Sisters, Oregon with its western heritage, art galleries, boutique shops, and world-class outdoor recreation.",
  },
  {
    icon: HomeIcon,
    title: "Golf Community",
    description: "Access to the award-winning Aspen Lakes Golf Course, consistently rated among Oregon's best public courses.",
  },
];

export default function AspenLakesBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Aspen Lakes Custom Home Builder | Sisters Oregon"
        description="Build your dream home at Aspen Lakes Golf Course in Sisters, Oregon with Kevin Rea, Central Oregon's premier custom home builder. 45+ years experience. Call 541-390-9848."
        keywords={["Aspen Lakes builder", "Aspen Lakes custom homes", "Sisters Oregon home builder", "Central Oregon luxury homes", "Aspen Lakes real estate", "Three Sisters mountain homes"]}
        ogImage="/images/cascade-mountains.jpg"
        canonicalUrl="/aspen-lakes-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cascade-mountains.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                Sisters, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Aspen Lakes Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home at Aspen Lakes Golf Course in Sisters, Oregon. 
              Kevin Rea brings 45+ years of custom home building expertise to create 
              exceptional residences with stunning Three Sisters mountain views.
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
                href="https://www.aspenlakes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Aspen Lakes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Aspen Lakes */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Aspen Lakes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Sisters Oregon's Premier Golf Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Aspen Lakes offers an exceptional lifestyle at the base of the Three Sisters 
              mountains with pristine lakes, championship golf, and the charming town of 
              Sisters just minutes away. Kevin Rea understands how to build homes that 
              embrace this unique Central Oregon setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aspenLakesFeatures.map((feature, index) => (
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
                Build Your Dream Home at Aspen Lakes
              </h2>
              <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                Whether you have a lot at Aspen Lakes or are exploring the community, 
                Kevin Rea can help you design and build a custom home that captures the 
                beauty of the Three Sisters and the Sisters lifestyle.
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
              <LeadCaptureForm source="aspen-lakes-builder" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
