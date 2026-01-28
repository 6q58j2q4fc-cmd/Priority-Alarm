/**
 * Sisters Builder Landing Page
 * Location-specific SEO landing page for "Sisters Oregon custom home builder" searches
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
  TreePine,
  Store,
  Tent,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const sistersFeatures = [
  {
    icon: Mountain,
    title: "Mountain Gateway",
    description: "Sisters sits at the base of the Three Sisters mountains, offering unparalleled access to hiking, skiing, and outdoor recreation.",
  },
  {
    icon: Store,
    title: "Western Charm",
    description: "A vibrant downtown with western-themed architecture, art galleries, boutiques, and farm-to-table restaurants.",
  },
  {
    icon: TreePine,
    title: "Forest Living",
    description: "Surrounded by the Deschutes National Forest, with ponderosa pines, mountain meadows, and abundant wildlife.",
  },
  {
    icon: Tent,
    title: "Outdoor Lifestyle",
    description: "World-class fly fishing on the Metolius River, mountain biking, horseback riding, and access to Mt. Bachelor.",
  },
];

const sistersNeighborhoods = [
  { name: "Black Butte Ranch", description: "Iconic resort community with two golf courses" },
  { name: "Aspen Lakes", description: "Golf community with mountain views" },
  { name: "Crossroads", description: "New development with modern homes" },
  { name: "Tollgate", description: "Established neighborhood near downtown" },
  { name: "Timber Creek", description: "Forested homesites with privacy" },
  { name: "Sage Meadow", description: "Rural acreage with mountain views" },
];

export default function SistersBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Sisters Oregon Custom Home Builder"
        description="Build your custom home in Sisters, Oregon with Kevin Rea. 45+ years experience building luxury homes in Central Oregon's charming mountain town. Call 541-390-9848."
        keywords={["Sisters Oregon builder", "Sisters custom homes", "custom home builder Sisters", "luxury homes Sisters Oregon", "mountain homes Sisters"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/sisters-builder"
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
                Sisters, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Sisters Oregon Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Sisters, Central Oregon's most charming 
              mountain town. With its western heritage, stunning Cascade views, 
              and vibrant arts community, Sisters offers a unique lifestyle at 
              the gateway to the wilderness. Kevin Rea brings 45+ years of 
              custom home building expertise to create homes that honor this 
              special place.
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

      {/* Why Build in Sisters */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Sisters
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Mountain Town
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Sisters combines small-town charm with world-class outdoor 
              recreation. Just 20 minutes from Bend, this community of 3,000 
              residents offers a slower pace of life without sacrificing access 
              to amenities. From the famous Sisters Outdoor Quilt Show to the 
              Sisters Folk Festival, this town celebrates creativity and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sistersFeatures.map((feature, index) => (
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

      {/* Sisters Neighborhoods */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Where We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Sisters Area Communities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sistersNeighborhoods.map((neighborhood, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-2">
                    {neighborhood.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {neighborhood.description}
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
                Start Your Sisters Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Mountain Home in Sisters
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're building at Black Butte Ranch, on acreage with 
                mountain views, or in town near the galleries and shops, Kevin 
                Rea can help you create a home that captures the Sisters lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Mountain Modern Design</p>
                    <p className="font-body text-sm text-white/70">
                      Contemporary homes that complement the natural landscape.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Energy Efficiency</p>
                    <p className="font-body text-sm text-white/70">
                      Homes designed for Sisters' four-season climate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Local Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Deep knowledge of Sisters building codes and permitting.
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
              <LeadCaptureForm source="sisters-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="sisters" />

      <Footer />
    </div>
  );
}
