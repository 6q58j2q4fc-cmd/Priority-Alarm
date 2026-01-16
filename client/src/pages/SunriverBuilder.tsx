/**
 * Sunriver Builder Landing Page
 * Location-specific SEO landing page for "Sunriver custom home builder" searches
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
  TreePine,
  Waves,
  Mountain,
  ExternalLink,
} from "lucide-react";

const sunriverFeatures = [
  {
    icon: TreePine,
    title: "Forest Living",
    description: "Build among towering ponderosa pines in one of Oregon's most beloved resort communities.",
  },
  {
    icon: Waves,
    title: "River & Lake Access",
    description: "Enjoy the Deschutes River, Sunriver Marina, and pristine lakes for kayaking, fishing, and swimming.",
  },
  {
    icon: Mountain,
    title: "Mt. Bachelor Access",
    description: "Just 20 minutes to world-class skiing, snowboarding, and mountain biking at Mt. Bachelor.",
  },
  {
    icon: HomeIcon,
    title: "Resort Amenities",
    description: "Golf courses, pools, tennis, bike paths, nature center, and the Village Mall shopping district.",
  },
];

const sunriverProjects = [
  {
    name: "Forest Retreat Estate",
    description: "Luxury living among the ponderosa pines",
    image: "/images/StN3qFqGILG2.jpg",
  },
  {
    name: "River View Custom Home",
    description: "Contemporary design with Deschutes River access",
    image: "/images/UCoE7gADVKD9.jpg",
  },
];

export default function SunriverBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Sunriver Custom Home Builder"
        description="Build your luxury custom home in Sunriver with Kevin Rea. 45+ years experience in Central Oregon's premier resort community. Call 541-390-9848."
        keywords={["Sunriver builder", "Sunriver custom homes", "Sunriver Oregon home builder", "luxury homes Sunriver", "Sunriver real estate"]}
        ogImage="/images/StN3qFqGILG2.jpg"
        canonicalUrl="/sunriver-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/StN3qFqGILG2.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber" />
              <span className="font-body text-amber uppercase tracking-widest text-sm">
                Sunriver, Oregon
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Sunriver Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your dream home in Oregon's premier resort community. 
              Sunriver offers year-round recreation, natural beauty, and a 
              welcoming community. Kevin Rea brings 45+ years of custom home 
              building expertise to craft homes that embrace the Sunriver lifestyle.
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
                href="https://www.sunriverresort.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Sunriver Resort
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Sunriver */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Sunriver
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Oregon's Premier Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Sunriver is a world-renowned destination offering an unparalleled 
              lifestyle with 33 miles of paved bike paths, two golf courses, 
              the Deschutes River, and easy access to Mt. Bachelor. As an 
              experienced Sunriver builder, Kevin Rea understands the community's 
              architectural guidelines and how to create homes that complement 
              the natural forest setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sunriverFeatures.map((feature, index) => (
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

      {/* Featured Projects */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Sunriver Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Luxury Homes in Sunriver
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {sunriverProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Sunriver Custom Home`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-timber/90 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-1">
                      {project.name}
                    </h3>
                    <p className="font-body text-white/80 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                View Full Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Sunriver Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home in Sunriver
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you're looking for a full-time residence or a vacation 
                retreat, Kevin Rea can help you create a home that captures 
                the magic of Sunriver living.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Forest Integration</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Designs that preserve trees and embrace the natural setting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">SROA Compliance</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Expert navigation of Sunriver Owners Association guidelines.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Year-Round Living</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Homes built for Central Oregon's four-season climate.
                    </p>
                  </div>
                </div>
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
              <LeadCaptureForm source="sunriver-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
