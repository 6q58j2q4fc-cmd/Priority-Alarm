/**
 * La Pine Builder Landing Page
 * Location-specific SEO landing page for "La Pine Oregon custom home builder" searches
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
  Waves,
  Mountain,
  DollarSign,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const laPineFeatures = [
  {
    icon: TreePine,
    title: "Forest Setting",
    description: "Build among towering ponderosa pines in the Deschutes National Forest, with abundant wildlife and natural beauty.",
  },
  {
    icon: Waves,
    title: "River Access",
    description: "Close proximity to the Deschutes River, Little Deschutes River, and Paulina Creek for fishing and recreation.",
  },
  {
    icon: Mountain,
    title: "Newberry Volcano",
    description: "Gateway to Newberry National Volcanic Monument with Paulina and East Lakes, hot springs, and obsidian flows.",
  },
  {
    icon: DollarSign,
    title: "Affordable Luxury",
    description: "Larger lots and more affordable land prices allow for spacious custom homes with room to spread out.",
  },
];

const laPineAreas = [
  { name: "Newberry Estates", description: "Forested homesites near Newberry Volcano" },
  { name: "La Pine State Park Area", description: "Properties near the state park and river" },
  { name: "Sunriver South", description: "Convenient access to Sunriver amenities" },
  { name: "Wickiup Junction", description: "Rural properties with mountain views" },
  { name: "Gilchrist", description: "Historic mill town with affordable lots" },
  { name: "Crescent", description: "Gateway to Odell and Crescent Lakes" },
];

export default function LaPineBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="La Pine Oregon Custom Home Builder"
        description="Build your custom home in La Pine, Oregon with Kevin Rea. 45+ years experience building luxury homes on forested acreage in South Deschutes County. Call 541-390-9848."
        keywords={["La Pine Oregon builder", "La Pine custom homes", "custom home builder La Pine", "South Deschutes County homes", "forest homes La Pine"]}
        ogImage="/images/hero-main.jpg"
        canonicalUrl="/la-pine-builder"
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
                La Pine, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              La Pine Oregon Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in La Pine, where the ponderosa forest meets 
              volcanic wonder. South Deschutes County offers larger lots, more 
              affordable land, and a quieter pace of life while remaining close 
              to Bend and Sunriver. Kevin Rea brings 45+ years of expertise to 
              create custom homes that embrace this unique high desert setting.
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

      {/* Why Build in La Pine */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why La Pine
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              South Deschutes County Living
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              La Pine offers the best of Central Oregon living at a more 
              accessible price point. With larger lots, less traffic, and 
              immediate access to the Deschutes National Forest, La Pine is 
              perfect for those seeking space, privacy, and natural beauty. 
              The area is growing rapidly as more people discover its value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {laPineFeatures.map((feature, index) => (
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

      {/* La Pine Areas */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Where We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              La Pine Area Communities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laPineAreas.map((area, index) => (
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
                Start Your La Pine Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Forest Retreat in La Pine
              </h2>
              <p className="font-body text-lg text-white/80 mb-6 leading-relaxed">
                Whether you're building on forested acreage, near the river, 
                or close to Newberry Volcano, Kevin Rea can help you create 
                a custom home that maximizes your lot's potential.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Acreage Expertise</p>
                    <p className="font-body text-sm text-white/70">
                      Designs optimized for larger rural properties.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Well & Septic Knowledge</p>
                    <p className="font-body text-sm text-white/70">
                      Experience with rural infrastructure requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-white">Fire-Wise Building</p>
                    <p className="font-body text-sm text-white/70">
                      Homes designed with wildfire safety in mind.
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
              <LeadCaptureForm source="la-pine-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="la-pine" />

      <Footer />
    </div>
  );
}
