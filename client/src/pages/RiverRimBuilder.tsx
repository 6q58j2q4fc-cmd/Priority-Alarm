/**
 * River Rim Builder Landing Page
 * Location-specific SEO landing page for "River Rim custom home builder" searches
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
  Waves,
  TreePine,
  Lock,
} from "lucide-react";

const riverRimFeatures = [
  {
    icon: Waves,
    title: "Deschutes River Access",
    description: "Build your dream home with direct access to the legendary Deschutes River, perfect for fishing, kayaking, and riverside living.",
  },
  {
    icon: Lock,
    title: "Exclusive Privacy",
    description: "River Rim offers large, private homesites with mature landscaping and a sense of seclusion rarely found this close to Bend.",
  },
  {
    icon: TreePine,
    title: "Natural Setting",
    description: "Surrounded by towering pines and native vegetation, River Rim homes blend seamlessly with the Central Oregon landscape.",
  },
  {
    icon: HomeIcon,
    title: "Prime Location",
    description: "Minutes from downtown Bend while feeling worlds away, River Rim offers the best of both convenience and tranquility.",
  },
];

export default function RiverRimBuilder() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="River Rim Custom Home Builder | Bend Oregon Riverfront"
        description="Build your luxury riverfront home at River Rim on the Deschutes River in Bend, Oregon with Kevin Rea. 45+ years experience. Call 541-390-9848."
        keywords={["River Rim builder", "Deschutes River homes", "Bend riverfront property", "luxury riverfront homes Oregon", "River Rim real estate", "waterfront homes Bend"]}
        ogImage="/images/hero-portfolio.jpg"
        canonicalUrl="/river-rim-builder"
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
              River Rim Custom Home Builder
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Build your dream riverfront home at River Rim on the Deschutes River. 
              Kevin Rea brings 45+ years of custom home building expertise to create 
              exceptional residences with direct river access and unmatched privacy.
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

      {/* Why Build at River Rim */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Why River Rim
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-4">
              Bend's Premier Riverfront Community
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              River Rim offers a rare opportunity to build a custom home with direct 
              Deschutes River access just minutes from downtown Bend. These exclusive 
              homesites combine privacy, natural beauty, and convenience in a way that's 
              truly unique to Central Oregon. Kevin Rea understands how to design homes 
              that honor this exceptional setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riverRimFeatures.map((feature, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-timber">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Start Your Project
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Build Your Dream Riverfront Home
              </h2>
              <p className="font-body text-lg text-white/80 mb-8 leading-relaxed">
                River Rim homesites are rare and highly sought after. If you own a lot 
                or are considering purchasing, Kevin Rea can help you design and build 
                a custom home that maximizes your river views and creates the ultimate 
                Central Oregon retreat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:541-390-9848">
                  <Button
                    size="lg"
                    className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    541-390-9848
                  </Button>
                </a>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide bg-transparent"
                  >
                    View Portfolio
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <h3 className="font-display text-2xl font-semibold text-timber mb-6 text-center">
                Request a Consultation
              </h3>
              <LeadCaptureForm source="river-rim-builder" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
