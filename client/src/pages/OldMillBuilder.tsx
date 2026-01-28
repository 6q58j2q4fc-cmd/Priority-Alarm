/**
 * Old Mill District Builder Landing Page
 * Location-specific SEO landing page for "Old Mill District custom home builder" searches
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
  ShoppingBag,
  Waves,
  Building,
  ExternalLink,
} from "lucide-react";

const oldMillFeatures = [
  {
    icon: ShoppingBag,
    title: "Urban Lifestyle",
    description: "Walk to world-class shopping, dining, and entertainment in Bend's premier retail and entertainment district.",
  },
  {
    icon: Waves,
    title: "Riverfront Living",
    description: "Many homesites offer Deschutes River frontage or views, with direct access to the river trail system.",
  },
  {
    icon: Building,
    title: "Historic Character",
    description: "Built on the site of two historic lumber mills, the district blends industrial heritage with modern luxury.",
  },
  {
    icon: HomeIcon,
    title: "Low Maintenance",
    description: "Townhomes and condos offer lock-and-leave convenience for those seeking an active, urban lifestyle.",
  },
];

export default function OldMillBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Old Mill District Custom Home Builder"
        description="Build your custom home in the Old Mill District with Kevin Rea. 45+ years experience in Bend's premier urban riverfront neighborhood. Call 541-390-9848."
        keywords={["Old Mill District builder", "Old Mill custom homes Bend", "riverfront homes Bend", "urban living Bend Oregon", "Deschutes River homes"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/old-mill-builder"
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
                Old Mill District, Bend
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Old Mill District Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Experience urban luxury on the Deschutes River. The Old Mill 
              District offers Bend's most vibrant lifestyle with world-class 
              shopping, dining, and entertainment steps from your door. Kevin 
              Rea brings 45+ years of expertise to create custom homes and 
              renovations that embrace this unique riverfront setting.
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
                href="https://www.theoldmill.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Old Mill District
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Old Mill */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Old Mill District
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Urban Riverfront
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              The Old Mill District transformed Bend's historic lumber mill 
              site into a thriving mixed-use community. Today, it's the heart 
              of Bend's urban lifestyle, offering riverfront living with 
              immediate access to REI, restaurants, the Les Schwab Amphitheater, 
              and miles of river trails. As an experienced Old Mill builder, 
              Kevin Rea creates homes that maximize this exceptional location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {oldMillFeatures.map((feature, index) => (
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
                Start Your Old Mill Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Urban Retreat at Old Mill
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're building new or renovating an existing property, 
                Kevin Rea can help you create a home that embraces the Old Mill 
                lifestyle while maximizing river views and urban convenience.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">River View Optimization</p>
                    <p className="font-body text-sm text-white/70">
                      Designs that maximize Deschutes River views and access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Urban Design Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Smart space planning for urban lots and townhome sites.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Renovation Specialists</p>
                    <p className="font-body text-sm text-white/70">
                      Transform existing properties into modern luxury homes.
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
              <LeadCaptureForm source="old-mill-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
