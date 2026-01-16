/**
 * Tetherow Custom Homes Landing Page
 * Location-specific SEO landing page for "Tetherow custom home builder" searches
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
  Waves,
  TreePine,
  ExternalLink,
} from "lucide-react";

const tetherowFeatures = [
  {
    icon: Mountain,
    title: "Cascade Mountain Views",
    description: "Tetherow offers unobstructed views of Mt. Bachelor, Broken Top, and the Three Sisters from nearly every homesite in the community.",
  },
  {
    icon: Waves,
    title: "Golf Course Living",
    description: "Build your dream home adjacent to the award-winning David McLay Kidd-designed golf course, consistently ranked among Oregon's best.",
  },
  {
    icon: TreePine,
    title: "Modern Mountain Design",
    description: "Tetherow's contemporary architectural guidelines allow for innovative designs that complement the high desert landscape.",
  },
  {
    icon: HomeIcon,
    title: "Resort Amenities",
    description: "Enjoy access to The Lodge, spa, fitness center, pools, and miles of trails connecting to Bend's extensive trail network.",
  },
];

const tetherowProjects = [
  {
    name: "Contemporary Mountain Retreat",
    description: "Glass, steel, and stone harmonizing with the landscape",
    image: "/images/qHKfAGVqL6Y8.jpg",
  },
  {
    name: "Golf Course Estate",
    description: "Luxury living with panoramic fairway views",
    image: "/images/asoZsc8CLN0r.jpg",
  },
];

const testimonials = [
  {
    quote: "Kevin is a master builder – of relationships, ideas, teams and spaces. I have known Kevin for a decade and have enjoyed his vision, energy, talents and company every time we've connected.",
    author: "Barbara Sumner",
    location: "Tetherow",
  },
];

export default function TetherowCustomHomes() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Tetherow Custom Home Builder"
        description="Build your luxury custom home at Tetherow with Kevin Rea, Bend's premier home builder. Modern mountain design, golf course living. Call 541-390-9848."
        keywords={["Tetherow builder", "Tetherow custom homes", "Bend Oregon home builder", "Tetherow real estate", "luxury homes Bend"]}
        ogImage="/images/qHKfAGVqL6Y8.jpg"
        canonicalUrl="/tetherow-custom-homes"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/qHKfAGVqL6Y8.jpg')" }}
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
              Tetherow Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Create your modern mountain masterpiece in Bend's most prestigious 
              golf community. Kevin Rea brings 45+ years of custom home building 
              expertise to Tetherow, crafting homes that seamlessly blend 
              contemporary design with the stunning Central Oregon landscape.
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
                  Best of Show Winner
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber" />
                <span className="font-body text-white/80 text-sm">
                  CCB #193427
                </span>
              </div>
              <a
                href="https://www.tetherow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-white/80 text-sm hover:text-amber transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Tetherow
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build at Tetherow */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why Tetherow
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Golf & Resort Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Tetherow combines world-class golf with stunning Cascade Mountain views 
              and easy access to downtown Bend. As an experienced Tetherow builder, 
              Kevin Rea understands the community's architectural vision and how to 
              maximize every lot's potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tetherowFeatures.map((feature, index) => (
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

      {/* Featured Tetherow Projects */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Tetherow Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Modern Luxury at Tetherow
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {tetherowProjects.map((project, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={`${project.name} - Tetherow Custom Home`}
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

      {/* Testimonials */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Client Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg p-6 relative">
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                  ))}
                </div>
                <CardContent className="p-0 pt-8">
                  <p className="font-body text-muted-foreground italic mb-6 leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-display font-semibold text-timber">
                      {testimonial.author}
                    </p>
                    <p className="font-body text-sm text-amber flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Tetherow Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Build Your Dream Home at Tetherow
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Whether you're drawn to Tetherow's golf course homesites, mountain 
                view lots, or The Estates, Kevin Rea can help you create a home 
                that perfectly captures the Tetherow lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Contemporary Design Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      We specialize in the modern mountain aesthetic that defines Tetherow.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Design Review Navigation</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Streamlined approval process with our proven Tetherow experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Premium Finishes</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Access to the finest materials and craftsmen in Central Oregon.
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
              <LeadCaptureForm source="tetherow-landing" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
