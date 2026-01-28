/**
 * Northwest Crossing Builder Landing Page
 * Location-specific SEO landing page for "Northwest Crossing custom home builder" searches
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
  Users,
  ShoppingBag,
  TreePine,
  ExternalLink,
} from "lucide-react";

const nwxFeatures = [
  {
    icon: Users,
    title: "Walkable Community",
    description: "A true neighborhood with tree-lined streets, sidewalks, parks, and a vibrant village center within walking distance.",
  },
  {
    icon: ShoppingBag,
    title: "Village Amenities",
    description: "Restaurants, shops, coffee houses, and services in the heart of the community create a connected lifestyle.",
  },
  {
    icon: TreePine,
    title: "Trail Access",
    description: "Direct access to miles of hiking and biking trails connecting to Shevlin Park and the greater Bend trail system.",
  },
  {
    icon: HomeIcon,
    title: "Diverse Architecture",
    description: "A mix of architectural styles from craftsman to contemporary, creating visual interest and neighborhood character.",
  },
];

export default function NorthwestCrossingBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Northwest Crossing Custom Home Builder"
        description="Build your custom home in Northwest Crossing with Kevin Rea. 45+ years experience in Bend's premier walkable neighborhood. Call 541-390-9848."
        keywords={["Northwest Crossing builder", "Northwest Crossing custom homes", "NWX Bend builder", "walkable neighborhood Bend", "luxury homes Northwest Crossing"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/northwest-crossing-builder"
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
                Northwest Crossing, Bend
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Northwest Crossing Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Bend's most beloved walkable community. 
              Northwest Crossing offers the rare combination of urban convenience 
              and natural beauty, with a vibrant village center, excellent schools, 
              and direct trail access. Kevin Rea brings 45+ years of expertise to 
              create custom homes that embrace this unique neighborhood lifestyle.
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
                href="https://www.nwxbend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Northwest Crossing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Northwest Crossing */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Northwest Crossing
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Walkable Neighborhood
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Northwest Crossing is more than a neighborhood—it's a lifestyle. 
              Designed around the principles of new urbanism, NWX features 
              tree-lined streets, pocket parks, and a thriving village center 
              where neighbors become friends. As an experienced Northwest Crossing 
              builder, Kevin Rea understands the community's design guidelines 
              and creates homes that contribute to this special place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nwxFeatures.map((feature, index) => (
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
                Start Your NWX Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Dream Home in Northwest Crossing
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're looking for a family home near the village or 
                a custom lot backing to trails, Kevin Rea can help you create 
                a home that fits the Northwest Crossing lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Design Guidelines Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Navigate NWX's architectural standards with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Lot Optimization</p>
                    <p className="font-body text-sm text-white/70">
                      Maximize your lot's potential while respecting setbacks and neighbors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Neighborhood Integration</p>
                    <p className="font-body text-sm text-white/70">
                      Homes that contribute to NWX's architectural diversity and charm.
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
              <LeadCaptureForm source="northwest-crossing-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
