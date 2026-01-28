/**
 * Pronghorn Builder Landing Page
 * Location-specific SEO landing page for "Pronghorn custom home builder" searches
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
  Mountain,
  TreePine,
  ExternalLink,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const pronghornFeatures = [
  {
    icon: Mountain,
    title: "Two Championship Courses",
    description: "Build your home at one of Oregon's premier golf destinations featuring courses designed by Jack Nicklaus and Tom Fazio.",
  },
  {
    icon: TreePine,
    title: "High Desert Elegance",
    description: "Pronghorn's architectural standards emphasize natural materials and designs that complement the stunning high desert landscape.",
  },
  {
    icon: HomeIcon,
    title: "World-Class Amenities",
    description: "Enjoy access to spa, fitness center, tennis, pools, and award-winning dining at the Pronghorn Resort.",
  },
  {
    icon: Star,
    title: "Exclusive Community",
    description: "A private, gated community offering security, privacy, and an unparalleled Central Oregon lifestyle.",
  },
];

const pronghornProjects = [
  {
    name: "Contemporary Desert Estate",
    description: "Modern luxury with panoramic golf course views",
    image: "/images/asoZsc8CLN0r.jpg",
  },
  {
    name: "Mountain View Retreat",
    description: "Timeless elegance overlooking the Cascades",
    image: "/images/WkNH38aWPs08.jpg",
  },
];

export default function PronghornBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Pronghorn Custom Home Builder"
        description="Build your luxury custom home at Pronghorn Resort with Kevin Rea. 45+ years experience in Central Oregon's premier golf community. Call 541-390-9848."
        keywords={["Pronghorn builder", "Pronghorn custom homes", "Bend Oregon luxury homes", "Pronghorn Resort real estate", "golf course homes Bend"]}
        ogImage="/images/asoZsc8CLN0r.jpg"
        canonicalUrl="/pronghorn-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/asoZsc8CLN0r.jpg')" }}
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
              Pronghorn Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your dream home at Pronghorn Resort, Central Oregon's most 
              exclusive golf and resort community. Kevin Rea brings 45+ years of 
              custom home building expertise to craft homes that match the 
              world-class standards of this premier destination.
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
                href="https://www.pronghornresort.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Pronghorn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Pronghorn */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Pronghorn
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Oregon's Premier Golf & Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Pronghorn offers an unmatched lifestyle with two championship golf courses, 
              world-class amenities, and stunning high desert beauty. As an experienced 
              Pronghorn builder, Kevin Rea understands the community's exacting standards 
              and how to create homes worthy of this exceptional setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pronghornFeatures.map((feature, index) => (
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
              Our Pronghorn Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Luxury Homes at Pronghorn
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {pronghornProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Pronghorn Custom Home`}
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
                Start Your Pronghorn Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home at Pronghorn
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you're drawn to Pronghorn's Nicklaus or Fazio course homesites, 
                Kevin Rea can help you create a home that perfectly captures the 
                Pronghorn lifestyle and meets the community's architectural standards.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Golf Course Integration</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Designs that maximize views while respecting course aesthetics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Design Review Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Streamlined approval process with our Pronghorn experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Resort-Quality Finishes</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Premium materials and craftsmanship befitting Pronghorn.
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
              <LeadCaptureForm source="pronghorn-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="pronghorn" />

      <Footer />
    </div>
  );
}
