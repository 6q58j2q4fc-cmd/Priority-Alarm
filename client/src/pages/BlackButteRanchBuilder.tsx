/**
 * Black Butte Ranch Builder Landing Page
 * Location-specific SEO landing page for "Black Butte Ranch custom home builder" searches
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
  Bike,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const blackButteFeatures = [
  {
    icon: TreePine,
    title: "Forest Setting",
    description: "Build among towering ponderosa pines in one of Oregon's most iconic resort communities, established in 1970.",
  },
  {
    icon: Mountain,
    title: "Mountain Views",
    description: "Spectacular views of Black Butte, Mt. Washington, Three Fingered Jack, and the Cascade Range from throughout the ranch.",
  },
  {
    icon: Bike,
    title: "Recreation Paradise",
    description: "Two golf courses, 18 miles of paved bike paths, pools, tennis, horseback riding, and access to the Metolius River.",
  },
  {
    icon: HomeIcon,
    title: "Historic Community",
    description: "Over 50 years of history with a strong sense of community, environmental stewardship, and family traditions.",
  },
];

export default function BlackButteRanchBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Black Butte Ranch Custom Home Builder"
        description="Build your custom home at Black Butte Ranch with Kevin Rea. 45+ years experience in Central Oregon's premier resort community near Sisters. Call 541-390-9848."
        keywords={["Black Butte Ranch builder", "Black Butte Ranch custom homes", "Sisters Oregon home builder", "Black Butte Ranch real estate", "luxury homes Black Butte"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/black-butte-ranch-builder"
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
                Black Butte Ranch, Sisters
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Black Butte Ranch Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your legacy home at Oregon's beloved Black Butte Ranch. 
              With over 50 years of history, this iconic resort community offers 
              unparalleled natural beauty, world-class recreation, and a 
              welcoming community spirit. Kevin Rea brings 45+ years of custom 
              home building expertise to honor this special place.
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
                href="https://www.blackbutteranch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Black Butte Ranch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Black Butte Ranch */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Black Butte Ranch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Oregon's Iconic Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Black Butte Ranch has been a cherished destination for Oregon 
              families since 1970. Located just west of Sisters, this 1,800-acre 
              community offers two championship golf courses, miles of trails, 
              and a deep connection to the natural landscape. As an experienced 
              Black Butte Ranch builder, Kevin Rea understands the community's 
              architectural guidelines and commitment to environmental stewardship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blackButteFeatures.map((feature, index) => (
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
                Start Your Black Butte Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Dream Home at Black Butte Ranch
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're building a year-round residence or a vacation 
                retreat, Kevin Rea can help you create a home that honors 
                Black Butte Ranch's legacy while meeting your family's needs.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Environmental Sensitivity</p>
                    <p className="font-body text-sm text-white/70">
                      Designs that preserve trees and minimize environmental impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Design Committee Navigation</p>
                    <p className="font-body text-sm text-white/70">
                      Expert guidance through Black Butte's architectural review process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Mountain Modern Design</p>
                    <p className="font-body text-sm text-white/70">
                      Contemporary homes that complement the natural forest setting.
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
              <LeadCaptureForm source="black-butte-ranch-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="black-butte-ranch" />

      <Footer />
    </div>
  );
}
