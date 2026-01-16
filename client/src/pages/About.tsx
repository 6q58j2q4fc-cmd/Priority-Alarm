/**
 * About Page - High Desert Modernism Design
 * Showcases Kevin Rea's experience and expertise
 */

import Header from "@/components/Header";
import PageSEO from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  Clock,
  Home,
  Users,
  Star,
  Phone,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

const milestones = [
  { year: "1977", event: "Kevin Rea begins building custom homes in Central Oregon" },
  { year: "1990s", event: "Establishes reputation for quality craftsmanship in Bend area" },
  { year: "2000s", event: "Expands into premier communities including Brasada Ranch" },
  { year: "2010s", event: "Wins Best of Show at Realtors Tour of Homes" },
  { year: "2020s", event: "Continues legacy of excellence with 100+ completed homes" },
];

const values = [
  {
    icon: Star,
    title: "Uncompromising Quality",
    description:
      "Every detail matters. From foundation to finish, we maintain the highest standards of craftsmanship.",
  },
  {
    icon: Users,
    title: "Client-Centered Approach",
    description:
      "Your vision drives every decision. We listen, collaborate, and deliver homes that exceed expectations.",
  },
  {
    icon: Home,
    title: "Artistic Touch",
    description:
      "Building is both science and art. We bring creative solutions and aesthetic excellence to every project.",
  },
  {
    icon: CheckCircle,
    title: "Personal Management",
    description:
      "Kevin personally manages every project, ensuring consistent quality and communication throughout.",
  },
];

const awards = [
  {
    title: "National Best of Show",
    organization: "National Home Builders Association",
    description: "First national recognition for exceptional custom home design and craftsmanship",
  },
  {
    title: "National Best of Show",
    organization: "National Home Builders Association",
    description: "Second national award recognizing continued excellence in luxury home building",
  },
  {
    title: "Earth Hero Award",
    organization: "Local Environmental Council",
    description: "Recognition for sustainable building practices and environmental stewardship",
  },
  {
    title: "Governor's Livability Award",
    organization: "State of Oregon",
    description: "Village Wistoria - Honored for creating livable, community-focused development",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="About Kevin Rea - Master Custom Home Builder"
        description="Meet Kevin Rea, Central Oregon's premier custom home builder since 1977. 45+ years experience, 100+ homes built, award-winning craftsmanship."
        keywords={["custom homes Central Oregon", "luxury home builder Bend"]}
        ogImage="/images/kevin-rea.webp"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-about.jpg')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Meet the Builder
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Kevin Rea
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            A master builder of relationships, ideas, teams, and spaces. Building luxury custom homes in Central Oregon since 1977.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                45+ Years of Building Excellence
              </h2>
              <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  Each home we have completed is unique and creative in its own
                  way. All of our custom homes have one thing in common:
                  satisfied happy homeowners. We satisfy our clients time and
                  time again with our well-managed team of professionals pushed
                  to do their best and make creative contributions to our
                  projects.
                </p>
                <p>
                  Kevin personally manages every project. Good people management
                  skills along with a natural engineering aptitude complement
                  his artful creative seasoned eye for fine details. With every
                  project comes new and exciting challenges. Our purpose is to
                  do everything we can to meet our client's desires.
                </p>
                <p>
                  We are able to do this by always respecting and putting our
                  collective best efforts into our projects. These are the core
                  values that we apply to everything we build.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                    Contact Kevin
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="tel:541-390-9848">
                  <Button
                    variant="outline"
                    className="border-timber text-timber hover:bg-timber hover:text-white font-body font-semibold uppercase tracking-wide"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    541-390-9848
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
               src="/images/kevin-rea.webp"
                alt="Rea Co Homes Custom Home"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-timber text-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber" />
                  <div>
                    <div className="font-display text-3xl font-semibold">
                      1977
                    </div>
                    <div className="font-body text-sm text-white/80">
                      Building Since
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Approach
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="border-0 shadow-lg bg-white animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-amber" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-timber mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Our Journey
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Building Legacy
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="flex gap-6 mb-8 last:mb-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-24">
                  <span className="font-display text-2xl font-semibold text-amber">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-amber/30 pl-6 relative">
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-amber" />
                  <p className="font-body text-lg text-timber">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Recognition
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Awards & Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <Card
                key={award.title}
                className="border-0 shadow-lg bg-white/10 backdrop-blur animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-amber flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-timber" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-1">
                      {award.title}
                    </h3>
                    <p className="font-body text-amber text-sm mb-2">
                      {award.organization}
                    </p>
                    <p className="font-body text-white/70 text-sm">
                      {award.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              How We Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Our Four-Step Process
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              With over forty years of experience, Kevin has shaped this
              framework to perfection. The process is flexible by design to meet
              the needs of any client.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We learn about your vision, lifestyle, and requirements for your dream home.",
              },
              {
                step: "02",
                title: "Design",
                description:
                  "Collaborate with architects and designers to create your perfect floor plan.",
              },
              {
                step: "03",
                title: "Build",
                description:
                  "Kevin personally manages construction with our team of skilled craftsmen.",
              },
              {
                step: "04",
                title: "Deliver",
                description:
                  "Move into your completed home with our continued support and warranty.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-display text-5xl font-bold text-amber/30 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-timber mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.reacohomes.com/our-process"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-amber hover:text-amber/80 transition-colors"
            >
              Learn more about our process
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
            Ready to Build Your Dream Home?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact Kevin Rea today for a free consultation. Let's discuss your
            vision and how we can bring it to life in Central Oregon's most
            beautiful communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                Request Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:541-390-9848">
              <Button
                size="lg"
                variant="outline"
                className="border-timber text-timber hover:bg-timber hover:text-white font-body font-semibold uppercase tracking-wide"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 541-390-9848
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
