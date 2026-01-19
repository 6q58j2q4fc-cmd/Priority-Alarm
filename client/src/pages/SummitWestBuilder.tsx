/**
 * Summit West Builder Landing Page
 * Location-specific SEO landing page for "Summit West custom home builder" searches
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
  Car,
} from "lucide-react";

const summitWestFeatures = [
  {
    icon: Mountain,
    title: "Mt. Bachelor Access",
    description: "Quick access to Mt. Bachelor for skiing, snowboarding, and summer mountain biking via Century Drive.",
  },
  {
    icon: Sun,
    title: "Modern Architecture",
    description: "Summit West features contemporary home designs that embrace Central Oregon's modern mountain aesthetic.",
  },
  {
    icon: Car,
    title: "Convenient Location",
    description: "Easy access to downtown Bend, the Old Mill District, and all of Central Oregon's attractions.",
  },
  {
    icon: HomeIcon,
    title: "New Development",
    description: "A newer west-side community with modern infrastructure, underground utilities, and thoughtful planning.",
  },
];

export default function SummitWestBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Summit West Custom Home Builder | Bend Oregon West Side"
        description="Build your modern custom home at Summit West on Bend's west side with Kevin Rea. Easy Mt. Bachelor access. 45+ years experience. Call 541-390-9848."
        keywords={["Summit West builder", "Summit West custom homes", "west Bend home builder", "modern homes Bend Oregon", "Mt Bachelor access homes", "Bend west side neighborhoods"]}
        ogImage="/images/WkNH38aWPs08.jpg"
        canonicalUrl="/summit-west-builder"
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
              Summit West Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your modern custom home at Summit West on Bend's desirable west side. 
              Kevin Rea brings 45+ years of custom home building expertise to create 
              contemporary residences with easy access to Mt. Bachelor and downtown.
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

      {/* Why Build at Summit West */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Summit West
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Modern West-Side Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Summit West represents the best of modern Central Oregon living. This 
              newer west-side community offers contemporary architecture, modern 
              infrastructure, and unbeatable access to Mt. Bachelor and downtown Bend. 
              Kevin Rea understands how to build homes that embrace this modern aesthetic 
              while honoring Central Oregon's natural beauty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summitWestFeatures.map((feature, index) => (
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
                Build Your Modern Dream Home
              </h2>
              <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                Summit West offers the opportunity to build a contemporary custom home 
                with the best of Central Oregon at your doorstep. Kevin Rea can help you 
                design and build a home that combines modern architecture with the natural 
                beauty of the high desert.
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
              <LeadCaptureForm source="summit-west-builder" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
