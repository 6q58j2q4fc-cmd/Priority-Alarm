/**
 * Resources & Guides Page
 * Downloadable content for lead capture and SEO authority building
 */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Breadcrumb, { breadcrumbConfigs } from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Download,
  FileText,
  BookOpen,
  Calculator,
  MapPin,
  Home as HomeIcon,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Ruler,
  Hammer,
  X,
} from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: string[];
  pages: string;
  downloadUrl?: string;
}

const guides: Guide[] = [
  {
    id: "building-guide",
    title: "Central Oregon Custom Home Building Guide",
    description: "A comprehensive guide to building your dream home in Central Oregon. Covers everything from lot selection to move-in day.",
    icon: BookOpen,
    topics: [
      "Choosing the right lot and location",
      "Understanding Central Oregon's climate",
      "Working with architects and designers",
      "The custom home building timeline",
      "Budgeting and financing options",
      "Selecting materials and finishes",
    ],
    pages: "32 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/emKRjOIawWDHAtgx.pdf",
  },
  {
    id: "cost-guide",
    title: "Custom Home Cost Breakdown",
    description: "Understand the true costs of building a custom home in Bend, Oregon. Detailed breakdown of materials, labor, and hidden costs.",
    icon: Calculator,
    topics: [
      "Average cost per square foot in 2024",
      "Land and site preparation costs",
      "Foundation and framing expenses",
      "Interior finishes and upgrades",
      "Landscaping and outdoor living",
      "Contingency planning",
    ],
    pages: "18 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/KfPRyOYnlJXvyRvP.pdf",
  },
  {
    id: "neighborhood-guide",
    title: "Central Oregon Neighborhood Guide",
    description: "Explore the best neighborhoods for custom home building in Central Oregon. From Brasada Ranch to Sunriver.",
    icon: MapPin,
    topics: [
      "Brasada Ranch overview",
      "Tetherow community features",
      "Pronghorn Resort living",
      "Broken Top amenities",
      "Awbrey Butte views",
      "Sunriver lifestyle",
    ],
    pages: "24 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/LSZvlCnUuNnVuMgP.pdf",
  },
  {
    id: "timeline-guide",
    title: "Custom Home Building Timeline",
    description: "A month-by-month guide to the custom home building process. Know what to expect at every stage.",
    icon: Clock,
    topics: [
      "Pre-construction planning (2-4 months)",
      "Permitting and approvals (1-3 months)",
      "Foundation and framing (2-3 months)",
      "Mechanical systems (1-2 months)",
      "Interior finishes (2-4 months)",
      "Final inspections and move-in",
    ],
    pages: "16 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/HrPzArcGHmdvLGta.pdf",
  },
  {
    id: "design-guide",
    title: "Custom Home Design Inspiration",
    description: "Explore architectural styles, interior design trends, and outdoor living ideas for Central Oregon homes.",
    icon: Ruler,
    topics: [
      "Mountain contemporary design",
      "Northwest modern architecture",
      "Rustic luxury finishes",
      "Indoor-outdoor living spaces",
      "Energy-efficient features",
      "Smart home technology",
    ],
    pages: "28 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/eJXcmFgrQwKPOumd.pdf",
  },
  {
    id: "builder-selection",
    title: "How to Choose a Custom Home Builder",
    description: "Essential questions to ask and criteria to evaluate when selecting your custom home builder.",
    icon: Hammer,
    topics: [
      "Evaluating builder experience",
      "Checking references and portfolios",
      "Understanding contracts",
      "Communication expectations",
      "Warranty and post-construction support",
      "Red flags to avoid",
    ],
    pages: "14 pages",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663234433834/zsYdBUIIJOlIAXyw.pdf",
  },
];

function GuideCard({ guide }: { guide: Guide }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  const createLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! Your download is starting...");
      setShowForm(false);
      setEmail("");
      setName("");
      // Open PDF download in new tab
      if (guide.downloadUrl) {
        window.open(guide.downloadUrl, '_blank');
      }
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      await createLead.mutateAsync({
        firstName,
        lastName,
        email,
        source: `guide-download-${guide.id}`,
        message: `Requested download: ${guide.title}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="bg-amber/10 p-3 rounded-lg">
            <guide.icon className="w-8 h-8 text-amber" />
          </div>
          <div className="flex-1">
            <CardTitle className="font-display text-xl text-timber mb-2">
              {guide.title}
            </CardTitle>
            <p className="font-body text-sm text-muted-foreground">
              {guide.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-4">
          <p className="font-body text-xs text-amber uppercase tracking-wide mb-2">
            What's Inside ({guide.pages})
          </p>
          <ul className="space-y-1">
            {guide.topics.slice(0, 4).map((topic, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">
                  {topic}
                </span>
              </li>
            ))}
            {guide.topics.length > 4 && (
              <li className="font-body text-sm text-amber">
                + {guide.topics.length - 4} more topics
              </li>
            )}
          </ul>
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => setShowForm(true)}
            className="w-full bg-timber text-white hover:bg-timber/90 font-body font-semibold uppercase tracking-wide"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Free Guide
          </Button>
        </div>

        {/* Mobile-friendly Modal Form */}
        {showForm && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowForm(false);
            }}
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-timber">
                  Download Free Guide
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-stone rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6 pb-4 border-b border-border">
                  <div className="bg-amber/10 p-2 rounded-lg flex-shrink-0">
                    <guide.icon className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-timber text-sm">
                      {guide.title}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {guide.pages} • PDF Download
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor={`modal-name-${guide.id}`} className="font-body text-sm font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id={`modal-name-${guide.id}`}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      required
                      className="mt-1.5 h-12 text-base"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`modal-email-${guide.id}`} className="font-body text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id={`modal-email-${guide.id}`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="mt-1.5 h-12 text-base"
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="pt-2 space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-amber text-timber hover:bg-amber/90 font-body font-semibold text-base"
                    >
                      {isSubmitting ? "Sending..." : "Get My Free Guide"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                      className="w-full font-body text-muted-foreground"
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <p className="font-body text-xs text-muted-foreground text-center pt-2">
                    We respect your privacy and will never share your information.
                    Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Free Guides & Resources"
        description="Download free guides on custom home building in Central Oregon. Cost breakdowns, timelines, neighborhood guides, and more from Kevin Rea."
        keywords={["custom home building guide", "Bend Oregon home costs", "Central Oregon neighborhoods", "home building timeline", "custom home design"]}
        ogImage="/images/hero-portfolio.jpg"
        canonicalUrl="/resources"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-timber">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumb items={breadcrumbConfigs.resources} className="justify-center mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-amber [&_span]:text-white" />
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Free Resources
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
              Custom Home Building Guides
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed">
              Download our comprehensive guides to help you plan your custom home 
              project in Central Oregon. From cost breakdowns to neighborhood 
              comparisons, we've compiled everything you need to make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Download Section */}
      <section className="py-20 bg-stone">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
                Why Our Guides
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-timber mb-6">
                45+ Years of Building Knowledge
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                These guides are based on Kevin Rea's 45+ years of experience 
                building custom homes in Central Oregon. We've distilled decades 
                of knowledge into practical, actionable resources to help you 
                navigate the custom home building process.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Local Expertise</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Specific to Central Oregon's climate, regulations, and communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">Updated for 2024</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Current pricing, trends, and market conditions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber mt-1" />
                  <div>
                    <p className="font-body font-semibold text-timber">No Obligation</p>
                    <p className="font-body text-sm text-muted-foreground">
                      Free resources with no strings attached.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="font-display text-2xl font-semibold text-timber mb-4 text-center">
                Ready to Start Your Project?
              </h3>
              <p className="font-body text-muted-foreground text-center mb-6">
                Schedule a free consultation to discuss your custom home vision.
              </p>
              
              <div className="space-y-4">
                <a href="tel:541-390-9848" className="block">
                  <Button className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 541-390-9848
                  </Button>
                </a>
                <a href="mailto:kevin@reacohomes.com" className="block">
                  <Button variant="outline" className="w-full border-timber text-timber hover:bg-timber/10 font-body font-semibold uppercase tracking-wide">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Kevin
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-timber text-timber hover:bg-timber/10 font-body font-semibold uppercase tracking-wide">
                    Request Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
