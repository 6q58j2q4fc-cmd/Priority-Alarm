/**
 * Shevlin Commons Builder Landing Page
 * Location-specific SEO landing page for "Shevlin Commons custom home builder" searches
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
  Users,
  ShoppingBag,
} from "lucide-react";

const shevlinFeatures = [
  {
    icon: TreePine,
    title: "Shevlin Park Access",
    description: "Build adjacent to Shevlin Park with direct trail access to 990 acres of forests, meadows, and Tumalo Creek.",
  },
  {
    icon: Users,
    title: "Walkable Community",
    description: "A true neighborhood feel with tree-lined streets, community gathering spaces, and neighbors who know each other.",
  },
  {
    icon: ShoppingBag,
    title: "Village Amenities",
    description: "Walk to local shops, restaurants, and services in the Shevlin Commons village center.",
  },
  {
    icon: HomeIcon,
    title: "West Bend Location",
    description: "Prime west-side location with easy access to Mt. Bachelor, downtown Bend, and outdoor recreation.",
  },
];

export default function ShevlinCommonsBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Shevlin Commons Custom Home Builder | Bend Oregon"
        description="Build your dream home at Shevlin Commons, Bend's walkable west-side community adjacent to Shevlin Park. Kevin Rea, 45+ years experience. Call 541-390-9848."
        keywords={["Shevlin Commons builder", "Shevlin Commons custom homes", "west Bend home builder", "Shevlin Park homes", "walkable community Bend", "Bend Oregon neighborhoods"]}
        ogImage="/images/oov3bdfkfk6B.jpg"
        canonicalUrl="/shevlin-commons-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/oov3bdfkfk6B.jpg')" }}
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
              Shevlin Commons Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home at Shevlin Commons, Bend's premier walkable 
              community adjacent to Shevlin Park. Kevin Rea brings 45+ years of 
              custom home building expertise to create homes that embrace community 
              living and outdoor access.
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

      {/* Why Build at Shevlin Commons */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Shevlin Commons
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Walkable West-Side Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Shevlin Commons offers a unique blend of community living and outdoor 
              access that's rare in Central Oregon. With Shevlin Park at your doorstep, 
              village shops within walking distance, and a strong sense of neighborhood, 
              it's the perfect place to build a custom home. Kevin Rea understands how 
              to create homes that fit this special community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shevlinFeatures.map((feature, index) => (
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
                Build Your Dream Home at Shevlin Commons
              </h2>
              <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                Whether you own a lot at Shevlin Commons or are exploring the community, 
                Kevin Rea can help you design and build a custom home that embraces the 
                walkable lifestyle and connects you to Bend's best outdoor recreation.
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
              <LeadCaptureForm source="shevlin-commons-builder" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
