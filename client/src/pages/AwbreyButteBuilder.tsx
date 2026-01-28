/**
 * Awbrey Butte Builder Landing Page
 * Location-specific SEO landing page for "Awbrey Butte custom home builder" searches
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
  Building,
} from "lucide-react";
import RelatedCommunities from "@/components/RelatedCommunities";

const awbreyFeatures = [
  {
    icon: Mountain,
    title: "Panoramic City & Mountain Views",
    description: "Awbrey Butte offers some of the most spectacular views in Bend, overlooking the city with the Cascade Range as a backdrop.",
  },
  {
    icon: Building,
    title: "Central Location",
    description: "Minutes from downtown Bend's restaurants, shops, and cultural attractions while maintaining a peaceful residential atmosphere.",
  },
  {
    icon: TreePine,
    title: "Established Neighborhood",
    description: "Mature landscaping and well-established infrastructure in one of Bend's most desirable and prestigious neighborhoods.",
  },
  {
    icon: HomeIcon,
    title: "Diverse Architecture",
    description: "From contemporary to traditional, Awbrey Butte welcomes various architectural styles that complement the natural terrain.",
  },
];

const awbreyProjects = [
  {
    name: "Contemporary Hillside Estate",
    description: "Modern design maximizing panoramic views",
    image: "/images/hero-portfolio.jpg",
  },
  {
    name: "Mountain View Retreat",
    description: "Timeless elegance with Cascade Mountain backdrop",
    image: "/images/LlxE9731ghDy.jpg",
  },
];

export default function AwbreyButteBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Awbrey Butte Custom Home Builder"
        description="Build your luxury custom home on Awbrey Butte with Kevin Rea. 45+ years experience, panoramic views of Bend and the Cascades. Call 541-390-9848."
        keywords={["Awbrey Butte builder", "Awbrey Butte custom homes", "Bend Oregon home builder", "luxury homes Bend", "Awbrey Butte real estate"]}
        ogImage="/images/hero-portfolio.jpg"
        canonicalUrl="/awbrey-butte-builder"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-portfolio.jpg')" }}
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
              Awbrey Butte Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream home in one of Bend's most prestigious neighborhoods. 
              Awbrey Butte offers unparalleled views, central location, and an 
              established community. Kevin Rea brings 45+ years of expertise to 
              create homes that capture the essence of Central Oregon living.
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

      {/* Why Build at Awbrey Butte */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Awbrey Butte
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Hillside Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Awbrey Butte rises above Bend, offering homeowners stunning views, 
              convenient access to downtown, and a sense of privacy and exclusivity. 
              As an experienced Awbrey Butte builder, Kevin Rea understands how to 
              design homes that maximize views while integrating with the natural terrain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awbreyFeatures.map((feature, index) => (
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
              Our Awbrey Butte Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Luxury Homes on Awbrey Butte
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {awbreyProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Awbrey Butte Custom Home`}
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
                Start Your Awbrey Butte Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home on Awbrey Butte
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you have a lot ready to build or are searching for the 
                perfect Awbrey Butte homesite, Kevin Rea can help you create a 
                home that captures the stunning views and lifestyle this 
                neighborhood offers.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Hillside Building Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Specialized experience with sloped lots and view optimization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Local Knowledge</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Deep understanding of Bend's permitting and building requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Premium Craftsmanship</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Award-winning quality that stands the test of time.
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
              <LeadCaptureForm source="awbrey-butte-landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Communities */}
      <RelatedCommunities currentCommunity="awbrey-butte" />

      <Footer />
    </div>
  );
}
