/**
 * Home Page - High Desert Modernism Design
 * Main landing page for Rea Co Homes lead generation
 * Features: Hero, About, Portfolio preview, Neighborhoods, Testimonials, CTA
 */

import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Phone,
  Award,
  Home as HomeIcon,
  Users,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "Kevin's passion for building is unmatched. His attention to detail, his professionalism and the artful nature with which he approaches every project rings of the highest order.",
    author: "Jim Rozewski",
    location: "Brasada Ranch",
  },
  {
    quote:
      "Kevin is a master builder – of relationships, ideas, teams and spaces. I have known Kevin for a decade and have enjoyed his vision, energy, talents and company every time we've connected.",
    author: "Barbara Sumner",
    location: "O'Neil Residence",
  },
  {
    quote:
      "We knew immediately upon meeting with Kevin that we found our builder. Clear, present and trustworthy are just a few of the many attributes we enjoyed during our build process.",
    author: "McCartney Family",
    location: "Brasada Ranch",
  },
];

const stats = [
  { value: "45+", label: "Years Experience", icon: Clock },
  { value: "100+", label: "Custom Homes Built", icon: HomeIcon },
  { value: "19", label: "Neighborhoods Served", icon: MapPin },
  { value: "100%", label: "Client Satisfaction", icon: Star },
];

const neighborhoods = [
  { name: "Brasada Ranch", location: "Powell Butte", image: "/images/reaco-mccartney-exterior.webp" },
  { name: "Tetherow", location: "Bend", image: "/images/reaco-chiaramonte-exterior.webp" },
  { name: "Pronghorn", location: "Bend", image: "/images/reaco-underwood-aerial.webp" },
  { name: "Broken Top", location: "Bend", image: "/images/reaco-harrington-living.webp" },
  { name: "Awbrey Butte", location: "Bend", image: "/images/reaco-rozewski-porch.webp" },
  { name: "Caldera Springs", location: "Sunriver", image: "/images/reaco-brown-sunroom.webp" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Central Oregon Custom Home Builder"
        description="Award-winning custom home builder in Central Oregon since 1977. Kevin Rea builds luxury homes in Bend's premier communities. Call 541-390-9848."
        keywords="custom home builder Bend Oregon, Central Oregon luxury homes, Brasada Ranch builder, Tetherow custom homes, Kevin Rea, Rea Co Homes"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-main.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-timber/90 via-timber/70 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
              Central Oregon's Premier Custom Home Builder
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 animate-fade-in-up">
              Award-Winning Custom Homes in Central Oregon
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Since 1977, Kevin Rea has been crafting exceptional luxury homes
              with uncompromising dedication to detail and an artistic touch.
              From Brasada Ranch to Tetherow, we bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide text-base px-8"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:541-390-9848">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide text-base px-8 bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  541-390-9848
                </Button>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 animate-fade-in-up animation-delay-400">
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
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-stone py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-amber mx-auto mb-3" />
                <div className="font-display text-4xl font-semibold text-timber mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                About Kevin Rea
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                A Master Builder of Relationships, Ideas & Spaces
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Each home we have completed is unique and creative in its own
                way. All of our custom homes have one thing in common: satisfied
                happy homeowners. We satisfy our clients time and time again
                with our well-managed team of professionals pushed to do their
                best and make creative contributions to our projects.
              </p>
              <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                Kevin personally manages every project. Good people management
                skills along with a natural engineering aptitude complement his
                artful creative seasoned eye for fine details.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Award className="w-5 h-5 text-amber" />
                  <span className="font-body text-sm font-medium text-timber">
                    Realtors Tour Best of Show
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Award className="w-5 h-5 text-amber" />
                  <span className="font-body text-sm font-medium text-timber">
                    ACA Award Winner
                  </span>
                </div>
              </div>

              <Link href="/about">
                <Button className="bg-timber text-white hover:bg-timber/90 font-body font-semibold uppercase tracking-wide">
                  Learn More About Kevin
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="/images/kevin-rea.webp"
                alt="Kevin Rea - Master Custom Home Builder"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber text-timber p-6 rounded-lg shadow-xl">
                <div className="font-display text-3xl font-semibold">1977</div>
                <div className="font-body text-sm uppercase tracking-wide">
                  Building Since
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-timber diagonal-top">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Selected Custom Home Projects
            </h2>
            <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
              Explore our portfolio of award-winning luxury homes across Central
              Oregon's most prestigious communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 lg:col-span-2 relative group overflow-hidden rounded-lg">
              <img
                src="/images/hero-portfolio.jpg"
                alt="Luxury Custom Home Interior"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-timber/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    Brasada Ranch Residence
                  </h3>
                  <p className="font-body text-white/80 text-sm">
                    Modern mountain contemporary with panoramic views
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/images/oov3bdfkfk6B.jpg"
                alt="Brasada Ranch Custom Home"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-timber/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">
                    Tetherow Showplace
                  </h3>
                  <p className="font-body text-white/80 text-sm">
                    Glass, wood & stone harmony
                  </p>
                </div>
              </div>
            </div>
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

      {/* Neighborhoods Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Where We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Central Oregon's Premier Communities
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              From Brasada Ranch to Tetherow, we build luxury custom homes in
              Central Oregon's most sought-after neighborhoods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {neighborhoods.map((neighborhood) => (
              <Card
                key={neighborhood.name}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/60 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-semibold text-timber">
                    {neighborhood.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {neighborhood.location}, Oregon
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/neighborhoods">
              <Button className="bg-timber text-white hover:bg-timber/90 font-body font-semibold uppercase tracking-wide">
                Explore All Neighborhoods
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg p-6 relative"
              >
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber text-amber"
                    />
                  ))}
                </div>
                <CardContent className="p-0 pt-8">
                  <p className="font-body text-muted-foreground italic mb-6 leading-relaxed">
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
                Start Your Journey
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                Ready to Build Your Dream Home?
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                Contact Kevin Rea today for a free consultation. With over 45
                years of experience building luxury custom homes in Central
                Oregon, we'll help bring your vision to life.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">
                      Call Kevin directly
                    </p>
                    <a
                      href="tel:541-390-9848"
                      className="font-display text-xl font-semibold text-timber hover:text-amber transition-colors"
                    >
                      541-390-9848
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">
                      Email us
                    </p>
                    <a
                      href="mailto:kevin@reacohomes.com"
                      className="font-display text-xl font-semibold text-timber hover:text-amber transition-colors"
                    >
                      kevin@reacohomes.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.reacohomes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-amber hover:text-amber/80 transition-colors"
              >
                Visit our official website
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <Card className="bg-white border-0 shadow-xl p-8">
              <h3 className="font-display text-2xl font-semibold text-timber mb-6">
                Request a Free Consultation
              </h3>
              <LeadCaptureForm />
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
