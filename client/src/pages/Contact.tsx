/**
 * Contact Page - High Desert Modernism Design
 * Primary lead capture page with full contact form
 */

import Header from "@/components/Header";
import PageSEO from "@/components/PageSEO";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, ExternalLink, Award } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Contact Kevin Rea - Free Consultation"
        description="Contact Kevin Rea for a free custom home consultation. Call 541-390-9848 or email kevin@reacohomes.com. Building in Central Oregon since 1977."
        keywords={["custom homes Central Oregon", "luxury home builder Bend"]}
        ogImage="/images/kevin-rea.webp"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kevin-rea.webp')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Let's Build Together
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Contact Kevin Rea
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Ready to start your custom home journey? Get in touch with Central Oregon's premier custom home builder.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-semibold text-timber mb-6">
                Get In Touch
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Contact Kevin Rea directly to discuss your custom home project.
                With over 45 years of experience, Kevin personally manages every
                project and is committed to making your dream home a reality.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      Call Kevin Directly
                    </p>
                    <a
                      href="tel:541-390-9848"
                      className="font-display text-xl font-semibold text-timber hover:text-amber transition-colors"
                    >
                      541-390-9848
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      Email Us
                    </p>
                    <a
                      href="mailto:kevin@reacohomes.com"
                      className="font-display text-lg font-semibold text-timber hover:text-amber transition-colors"
                    >
                      kevin@reacohomes.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      Service Area
                    </p>
                    <p className="font-display text-lg font-semibold text-timber">
                      Bend & Central Oregon
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Deschutes, Jefferson & Crook Counties
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-1">
                      Availability
                    </p>
                    <p className="font-display text-lg font-semibold text-timber">
                      Monday - Saturday
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-8 p-6 bg-stone rounded-lg">
                <h3 className="font-display text-lg font-semibold text-timber mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber" />
                  Credentials
                </h3>
                <ul className="space-y-2 font-body text-sm text-muted-foreground">
                  <li>CCB License #193427</li>
                  <li>Building Since 1977</li>
                  <li>Realtors Tour Best of Show Winner</li>
                  <li>American Concrete Association Award</li>
                </ul>
              </div>

              {/* Official Website */}
              <div className="mt-6">
                <a
                  href="https://www.reacohomes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-amber hover:text-amber/80 transition-colors"
                >
                  Visit Official Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-semibold text-timber mb-2">
                    Request a Free Consultation
                  </h2>
                  <p className="font-body text-muted-foreground mb-8">
                    Fill out the form below and Kevin will personally reach out
                    to discuss your custom home project within 24 hours.
                  </p>
                  <LeadCaptureForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-timber">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white text-center mb-12">
            Why Choose Rea Co Homes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "45+ Years Experience",
                description:
                  "Kevin Rea has been building luxury custom homes in Central Oregon since 1977, bringing unmatched expertise to every project.",
              },
              {
                title: "Personal Attention",
                description:
                  "Kevin personally manages every project, ensuring your vision is realized with the highest level of craftsmanship and attention to detail.",
              },
              {
                title: "Award-Winning Quality",
                description:
                  "Our homes have won prestigious awards including Best of Show at the Realtors Tour of Homes and recognition from the American Concrete Association.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="font-display text-xl font-semibold text-amber mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Served */}
      <section className="py-16 bg-stone">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-semibold text-timber mb-8">
            Neighborhoods We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Brasada Ranch",
              "Tetherow",
              "Pronghorn",
              "North Rim",
              "Highlands at Broken Top",
              "Tree Farm",
              "Northwest Crossing",
              "Awbrey Butte",
              "Caldera Springs",
              "Broken Top",
              "Sunriver",
              "Black Butte Ranch",
              "Deschutes River Ranch",
              "Shevlin Commons",
            ].map((neighborhood) => (
              <span
                key={neighborhood}
                className="font-body text-sm bg-white px-4 py-2 rounded-full text-timber shadow-sm"
              >
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
