/**
 * Prineville Builder Landing Page
 * Location-specific SEO landing page for "Prineville Oregon custom home builder" searches
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
  Waves,
  Building2,
  DollarSign,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const prinevilleFeatures = [
  {
    icon: Mountain,
    title: "High Desert Beauty",
    description: "Surrounded by the Ochoco Mountains and rimrock formations, Prineville offers dramatic landscapes and wide-open spaces.",
  },
  {
    icon: Waves,
    title: "Reservoir Recreation",
    description: "Prineville Reservoir offers year-round fishing, boating, and camping just minutes from town.",
  },
  {
    icon: Building2,
    title: "Growing Economy",
    description: "Home to major data centers including Facebook and Apple, Prineville is experiencing significant economic growth.",
  },
  {
    icon: DollarSign,
    title: "Value Opportunity",
    description: "More affordable than Bend with larger lots and a lower cost of living while still close to Central Oregon amenities.",
  },
];

const prinevilleAreas = [
  { name: "Meadow Lakes Golf", description: "Golf course community with mountain views" },
  { name: "Prineville Reservoir", description: "Waterfront and view properties" },
  { name: "Ochoco West", description: "Newer development with modern homes" },
  { name: "Crooked River Ranch", description: "Large acreage properties with privacy" },
  { name: "Powell Butte", description: "Rural properties between Prineville and Bend" },
  { name: "Downtown Historic", description: "Character homes near Main Street" },
];

export default function PrinevilleBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Prineville Oregon Custom Home Builder"
        description="Build your custom home in Prineville, Oregon with Kevin Rea. 45+ years experience building luxury homes in Crook County's growing community. Call 541-390-9848."
        keywords={["Prineville Oregon builder", "Prineville custom homes", "custom home builder Prineville", "Crook County homes", "Meadow Lakes builder"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/prineville-builder"
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
                Prineville, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Prineville Oregon Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in Prineville, Central Oregon's hidden gem. 
              As the county seat of Crook County, Prineville offers authentic 
              western character, stunning high desert landscapes, and excellent 
              value. Kevin Rea brings 45+ years of custom home building expertise 
              to this growing community.
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

      {/* Why Build in Prineville */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Prineville
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Rising Star
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Prineville is experiencing a renaissance. Major tech companies 
              have invested billions in data centers, bringing jobs and growth 
              to this historic ranching community. Yet Prineville retains its 
              authentic character, with dramatic rimrock scenery, excellent 
              fishing at the reservoir, and a welcoming small-town atmosphere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prinevilleFeatures.map((feature, index) => (
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

      {/* Prineville Areas */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Where We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Prineville Area Communities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prinevilleAreas.map((area, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-2">
                    {area.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {area.description}
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
                Start Your Prineville Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your High Desert Home in Prineville
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're building at Meadow Lakes Golf Course, on acreage 
                with rimrock views, or near the reservoir, Kevin Rea can help 
                you create a custom home that captures the Prineville lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Rural Building Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Experience with well, septic, and rural infrastructure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Value Engineering</p>
                    <p className="font-body text-sm text-white/70">
                      Maximize your budget without compromising quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Local Permitting</p>
                    <p className="font-body text-sm text-white/70">
                      Navigate Crook County building requirements smoothly.
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
              <LeadCaptureForm source="prineville-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="prineville" />

      <Footer />
    </div>
  );
}
