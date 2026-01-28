/**
 * Redmond Builder Landing Page
 * Location-specific SEO landing page for "custom home builder Redmond Oregon" searches
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
  Plane,
  Mountain,
  Building2,
  Users,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const redmondFeatures = [
  {
    icon: Plane,
    title: "Airport Access",
    description: "Home to Roberts Field (RDM), Central Oregon's regional airport with daily flights to major hubs.",
  },
  {
    icon: Mountain,
    title: "High Desert Living",
    description: "Enjoy 300+ days of sunshine, stunning views of the Cascades, and easy access to outdoor recreation.",
  },
  {
    icon: Building2,
    title: "Growing Community",
    description: "Thriving downtown, excellent schools, and a strong local economy make Redmond ideal for families.",
  },
  {
    icon: Users,
    title: "Family-Friendly",
    description: "Parks, trails, sports complexes, and community events create a welcoming environment for all ages.",
  },
];

const redmondNeighborhoods = [
  {
    name: "Eagle Crest Resort",
    description: "Golf resort community with stunning views",
    link: "/eagle-crest-builder",
  },
  {
    name: "Dry Canyon",
    description: "Natural canyon trails and open spaces",
    link: "/contact",
  },
  {
    name: "Highland Meadows",
    description: "Family-friendly neighborhood with mountain views",
    link: "/contact",
  },
  {
    name: "Forked Horn Butte",
    description: "Upscale custom home community",
    link: "/contact",
  },
];

export default function RedmondBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Custom Home Builder Redmond Oregon"
        description="Build your custom home in Redmond Oregon with Kevin Rea. 45+ years experience, award-winning craftsmanship. Serving Eagle Crest and all Redmond neighborhoods. Call 541-390-9848."
        keywords={["custom home builder Redmond Oregon", "Redmond home construction", "Eagle Crest builder", "luxury homes Redmond", "new home builder Redmond"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/redmond-builder"
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
                Redmond, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Custom Home Builder Redmond Oregon
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Central Oregon's fastest-growing city. 
              Redmond offers the perfect blend of small-town charm and modern 
              amenities. Kevin Rea brings 45+ years of custom home building 
              expertise to create homes that embrace the high desert lifestyle.
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
                href="https://www.visitredmondoregon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Redmond Oregon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build in Redmond */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Redmond
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Hub City
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Redmond is the heart of Central Oregon, offering convenient access 
              to Bend, Sunriver, and the Cascade Mountains while maintaining its 
              own unique character. With a thriving downtown, excellent schools, 
              and diverse neighborhoods, Redmond is the perfect place to build 
              your custom home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redmondFeatures.map((feature, index) => (
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

      {/* Redmond Neighborhoods */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Where We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Redmond Neighborhoods
            </h2>
            <p className="font-body text-lg text-white/80 max-w-3xl mx-auto">
              From golf resort communities to family-friendly subdivisions, 
              Kevin Rea builds custom homes throughout Redmond and the surrounding area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {redmondNeighborhoods.map((neighborhood, index) => (
              <Link key={index} href={neighborhood.link}>
                <Card className="bg-white/10 border-0 hover:bg-white/20 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {neighborhood.name}
                    </h3>
                    <p className="font-body text-sm text-white/70">
                      {neighborhood.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-amber">
                      <span className="font-body text-sm">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/neighborhoods">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                View All Neighborhoods
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Kevin Rea */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Your Redmond Builder
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Why Choose Kevin Rea for Your Redmond Custom Home
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 45 years of experience building custom homes throughout 
                Central Oregon, Kevin Rea understands the unique requirements of 
                building in Redmond. From navigating local building codes to 
                designing homes that maximize views and natural light, Kevin 
                brings unmatched expertise to every project.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Local Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Deep knowledge of Redmond's neighborhoods, building requirements, and best practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Energy Efficiency</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Homes designed for Central Oregon's climate with superior insulation and efficiency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Award-Winning Design</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Multiple Best of Show awards and recognition for exceptional craftsmanship.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Personal Service</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Kevin personally manages every project from design through completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/kevin-rea.webp"
                alt="Kevin Rea - Custom Home Builder Redmond Oregon"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber text-timber p-6 rounded-lg shadow-xl">
                <div className="font-display text-3xl font-semibold">100+</div>
                <div className="font-body text-sm uppercase tracking-wide">
                  Homes Built
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Redmond Project
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home in Redmond
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Ready to build your custom home in Redmond? Contact Kevin Rea 
                today for a free consultation. Whether you have land or need 
                help finding the perfect lot, Kevin can guide you through 
                every step of the custom home building process.
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                <h3 className="font-display text-lg font-semibold text-timber mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber" />
                    <span className="font-body text-muted-foreground">Free initial consultation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber" />
                    <span className="font-body text-muted-foreground">Lot evaluation and site planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber" />
                    <span className="font-body text-muted-foreground">Custom design collaboration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber" />
                    <span className="font-body text-muted-foreground">Transparent pricing and timeline</span>
                  </li>
                </ul>
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
              <LeadCaptureForm source="redmond-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="redmond" />

      <Footer />
    </div>
  );
}
