/**
 * FAQ Page - Custom Home Building Frequently Asked Questions
 * Features JSON-LD FAQ schema markup for Google's "People Also Ask" featured snippets
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DollarSign,
  Clock,
  Home,
  Users,
  FileText,
  Hammer,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";

// FAQ data organized by category
const faqCategories = [
  {
    id: "cost",
    title: "Cost & Budget",
    icon: DollarSign,
    faqs: [
      {
        question: "How much does it cost to build a custom home in Bend, Oregon?",
        answer: "Custom home construction costs in Bend, Oregon typically range from $350 to $600+ per square foot, depending on the level of finishes, site conditions, and complexity of the design. A 3,000 square foot custom home generally costs between $1.05 million and $1.8 million or more. Factors affecting cost include lot preparation, architectural complexity, material selections, and current market conditions. We provide detailed cost estimates during our initial consultation to help you understand the investment required for your specific vision."
      },
      {
        question: "What is included in the cost per square foot?",
        answer: "Our cost per square foot typically includes architectural design coordination, all permits and fees, site preparation, foundation, framing, roofing, exterior finishes, insulation, HVAC systems, plumbing, electrical, interior finishes (drywall, paint, trim), flooring, cabinets, countertops, appliances, fixtures, and landscaping allowances. It does not typically include the land purchase, well or septic systems (if required), extensive site work, or furniture. We provide a comprehensive breakdown during our planning phase."
      },
      {
        question: "How do I finance a custom home build?",
        answer: "Custom home construction typically requires a construction loan, which converts to a traditional mortgage upon completion. You'll need 20-25% down payment, good credit, and proof of income. We recommend working with local lenders experienced in construction financing, such as Washington Federal, Summit Bank, or Mid Oregon Credit Union. Some clients also use home equity lines of credit, cash from selling an existing home, or investment portfolios. We can provide referrals to trusted lending partners."
      },
      {
        question: "Are there hidden costs in custom home building?",
        answer: "Transparency is our priority. Common additional costs that homeowners should budget for include: permit fees ($15,000-$40,000), utility connections ($5,000-$20,000), landscaping beyond basic allowances, window treatments, furniture, and potential site challenges discovered during construction. We provide detailed allowances and contingency recommendations (typically 5-10% of total budget) to help you plan for the unexpected. Our fixed-price contracts minimize surprises."
      }
    ]
  },
  {
    id: "timeline",
    title: "Timeline & Process",
    icon: Clock,
    faqs: [
      {
        question: "How long does it take to build a custom home?",
        answer: "A typical custom home in Central Oregon takes 12-18 months from groundbreaking to move-in, depending on size, complexity, and weather conditions. The complete process including design and permitting adds another 4-8 months. Larger or more complex homes may take 18-24 months for construction alone. Our project management approach keeps builds on schedule, and we provide regular updates throughout the process."
      },
      {
        question: "What is the custom home building process?",
        answer: "Our process includes: 1) Initial consultation and site evaluation, 2) Design development with your architect, 3) Budgeting and value engineering, 4) Permit acquisition (8-12 weeks), 5) Site preparation and foundation, 6) Framing and exterior envelope, 7) Mechanical systems (HVAC, plumbing, electrical), 8) Interior finishes and fixtures, 9) Final inspections and punch list, 10) Walkthrough and move-in. We guide you through each phase with clear communication and milestone meetings."
      },
      {
        question: "When is the best time to start building in Central Oregon?",
        answer: "The ideal time to break ground in Central Oregon is late spring (April-May) after the ground thaws and before summer heat. This allows foundation work in good weather and framing to be completed before winter. However, with proper planning, we can start construction year-round. Starting the design and permitting process in fall positions you well for a spring groundbreaking."
      },
      {
        question: "How involved will I be during construction?",
        answer: "Your involvement level is up to you. At minimum, we schedule weekly progress meetings and key milestone walkthroughs. Many clients visit the site regularly, while others prefer updates via photos and video calls. We encourage involvement during selection phases (fixtures, finishes, colors) and provide a dedicated project manager as your single point of contact throughout the build."
      }
    ]
  },
  {
    id: "design",
    title: "Design & Architecture",
    icon: Home,
    faqs: [
      {
        question: "Do I need an architect for a custom home?",
        answer: "While not legally required for residential construction in Oregon, we strongly recommend working with an architect for custom homes. Architects bring design expertise, ensure structural integrity, navigate building codes, and often save money through efficient design. We have established relationships with several talented Central Oregon architects and can provide referrals based on your style preferences and budget."
      },
      {
        question: "What architectural styles work best in Central Oregon?",
        answer: "Central Oregon's high desert landscape inspires several popular styles: Mountain Contemporary (clean lines, large windows, natural materials), Northwest Modern (timber accents, stone, indoor-outdoor living), Craftsman (detailed woodwork, covered porches), and Ranch/Western (single-story, rustic elements). The best style complements your lifestyle, the specific site, and any HOA or architectural review requirements in communities like Brasada Ranch, Tetherow, or Pronghorn."
      },
      {
        question: "Can I bring my own house plans?",
        answer: "Absolutely. We can build from plans you've purchased or had designed elsewhere. We'll review them for constructability, local code compliance, and provide value engineering suggestions. Some modifications may be needed for Central Oregon's climate, soil conditions, or specific site requirements. We can also connect you with local architects to modify existing plans or create custom designs from scratch."
      },
      {
        question: "How do you handle energy efficiency and sustainability?",
        answer: "We incorporate energy efficiency into every build through: high-performance insulation (R-38+ walls, R-60+ ceilings), triple-pane windows, heat pump systems, LED lighting, Energy Star appliances, and smart home integration. We're experienced with Earth Advantage certification, LEED principles, and can incorporate solar panels, geothermal systems, and EV charging. Kevin Rea has won the Earth Hero Award for sustainable building practices."
      }
    ]
  },
  {
    id: "location",
    title: "Location & Land",
    icon: MapPin,
    faqs: [
      {
        question: "Where does Rea Co Homes build custom homes?",
        answer: "We build throughout Central Oregon, with particular expertise in Bend's premier communities: Brasada Ranch, Tetherow, Pronghorn, Broken Top, Awbrey Butte, and Northwest Crossing. We also build in Sunriver, Caldera Springs, Black Butte Ranch, Sisters, Redmond, and Tumalo. Our 45+ years of experience means we understand the unique requirements, architectural guidelines, and building conditions of each area."
      },
      {
        question: "Can you help me find land to build on?",
        answer: "While we're not real estate agents, we can provide guidance on evaluating lots for buildability, including slope, soil conditions, utility access, and view potential. We have relationships with local real estate professionals who specialize in land sales and can provide referrals. We're also happy to walk potential lots with you to discuss construction considerations before you purchase."
      },
      {
        question: "What should I consider when buying a lot for a custom home?",
        answer: "Key considerations include: zoning and setback requirements, utility availability (water, sewer/septic, power, gas, internet), slope and drainage, soil conditions, sun exposure and views, HOA or architectural review requirements, fire-wise landscaping needs, and access during construction. We recommend a site feasibility study before purchasing to identify potential challenges and costs."
      },
      {
        question: "Do you build in HOA communities with architectural review?",
        answer: "Yes, we have extensive experience building in communities with architectural review committees (ARCs), including Brasada Ranch, Tetherow, Pronghorn, and Broken Top. We understand each community's design guidelines and work closely with ARCs to ensure smooth approvals. Our portfolio includes many award-winning homes in these communities, and we can guide you through the approval process."
      }
    ]
  },
  {
    id: "builder",
    title: "Choosing a Builder",
    icon: Users,
    faqs: [
      {
        question: "Why should I choose Rea Co Homes?",
        answer: "Kevin Rea brings 45+ years of custom home building experience in Central Oregon, with over 100 homes completed. We've won multiple Best of Show awards, the Earth Hero Award for sustainability, and maintain a 100% client satisfaction record. Kevin personally manages every project, ensuring attention to detail and clear communication. Our fixed-price contracts, transparent processes, and commitment to quality craftsmanship set us apart."
      },
      {
        question: "What questions should I ask a custom home builder?",
        answer: "Key questions include: How long have you been building in this area? Can I visit current job sites and completed homes? How do you handle change orders and budget overruns? Who will manage my project day-to-day? What is your warranty coverage? Can you provide references from recent clients? Are you licensed, bonded, and insured? How do you communicate during the build? What sets you apart from other builders?"
      },
      {
        question: "What is your warranty coverage?",
        answer: "We provide a comprehensive warranty: 1-year coverage on workmanship and materials, 2-year coverage on mechanical systems (HVAC, plumbing, electrical), and 10-year structural warranty. We also facilitate manufacturer warranties on appliances, roofing, windows, and other components. Our commitment to quality means most warranty calls are minor adjustments, and we respond promptly to any concerns."
      },
      {
        question: "How do you handle change orders during construction?",
        answer: "Changes happen, and we handle them transparently. All change orders are documented in writing with clear cost and schedule impacts before work proceeds. We use a formal change order process that requires your approval. To minimize changes, we invest significant time in the pre-construction planning phase to finalize selections and anticipate needs. Our goal is no surprises."
      }
    ]
  },
  {
    id: "permits",
    title: "Permits & Regulations",
    icon: FileText,
    faqs: [
      {
        question: "What permits are required to build a custom home in Oregon?",
        answer: "Required permits typically include: building permit, electrical permit, plumbing permit, mechanical permit, and potentially septic permit, well permit, and driveway access permit. In Deschutes County, you may also need land use approval, fire district approval, and HOA architectural approval. We handle all permit applications and coordinate with inspectors throughout the build process."
      },
      {
        question: "How long does the permitting process take?",
        answer: "In Deschutes County, building permit review typically takes 8-12 weeks for a complete application. Land use permits, if required, add 4-8 weeks. HOA architectural review varies by community (2-8 weeks). We recommend starting the permit process 4-6 months before your desired groundbreaking date. Our experience with local jurisdictions helps expedite approvals and avoid delays."
      },
      {
        question: "What are the building codes in Central Oregon?",
        answer: "Central Oregon follows the Oregon Residential Specialty Code, based on the International Residential Code with state amendments. Key requirements include: seismic design for Zone D, snow load design (varies by elevation, typically 30-50 psf), energy code compliance (Oregon Reach Code), fire-resistant construction in wildfire interface zones, and radon mitigation. We ensure all designs meet or exceed code requirements."
      }
    ]
  }
];

// Flatten FAQs for JSON-LD schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs);

// Generate JSON-LD FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQ() {
  // Inject FAQ schema into head
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    script.id = 'faq-schema';
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <PageSEO
        title="Custom Home Building FAQ"
        description="Get answers to frequently asked questions about building a custom home in Central Oregon. Learn about costs, timelines, design, permits, and choosing the right builder."
        keywords={["custom home FAQ", "Bend Oregon builder questions", "custom home cost", "building timeline", "home building process", "Central Oregon construction"]}
        canonicalUrl="https://reacohomes.com/faq"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-timber">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" },
                { label: "FAQ" }
              ]} 
              className="justify-center mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-amber [&_span]:text-white" 
            />
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Frequently Asked Questions
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
              Custom Home Building FAQ
            </h1>
            <p className="font-body text-lg text-white/90 leading-relaxed">
              Find answers to common questions about building your dream custom home 
              in Central Oregon. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-stone border-b border-border">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow font-body text-sm text-timber hover:text-amber"
              >
                <category.icon className="w-4 h-4" />
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.id} id={category.id} className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber/10 rounded-lg">
                  <category.icon className="w-6 h-6 text-amber" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-timber">
                  {category.title}
                </h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${category.id}-${faqIndex}`}
                    className="bg-white rounded-lg shadow-sm border border-border px-6"
                  >
                    <AccordionTrigger className="text-left font-body font-medium text-timber hover:text-amber py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-timber">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="font-body text-lg text-white/90 mb-8">
              We're here to help. Contact Kevin Rea directly to discuss your custom home project 
              and get personalized answers to your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:541-390-9848">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  541-390-9848
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
