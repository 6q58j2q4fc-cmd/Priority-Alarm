/**
 * Portfolio Page - High Desert Modernism Design
 * Showcases Rea Co Homes custom home projects with lightbox gallery
 */

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, MapPin, ExternalLink, Expand, Image } from "lucide-react";

const projects = [
  {
    name: "Chiaramonte Residence",
    location: "Tetherow Rim",
    description: "A stunning showplace featuring floor-to-ceiling glass walls with panoramic mountain views.",
    image: "/images/reaco-chiaramonte-exterior.webp",
    interiorImage: "/images/reaco-chiaramonte-interior.webp",
    features: ["Modern Contemporary", "Mountain Views", "Glass Walls"],
  },
  {
    name: "1st Street Rapids",
    location: "Bend, Oregon",
    description: "Modern elegance meets riverside living in the heart of Bend.",
    image: "/images/reaco-1st-street-exterior.webp",
    interiorImage: "/images/reaco-1st-street-interior.webp",
    features: ["Riverside Location", "Modern Design", "City Living"],
  },
  {
    name: "Underwood Residence",
    location: "Brasada Ranch",
    description: "A masterpiece of timber and stone with dramatic covered outdoor spaces.",
    image: "/images/reaco-underwood-aerial.webp",
    interiorImage: "/images/reaco-underwood-timber.webp",
    features: ["Timber Frame", "Stone Accents", "Outdoor Living"],
  },
  {
    name: "McCartney Residence",
    location: "Brasada Ranch",
    description: "Where trust and craftsmanship come together in perfect harmony.",
    image: "/images/reaco-mccartney-exterior.webp",
    interiorImage: "/images/reaco-mccartney-kitchen.webp",
    features: ["Craftsman Style", "Quality Build", "Family Home"],
  },
  {
    name: "O'Neil Residence",
    location: "Deschutes River Ranch",
    description: "A creative masterpiece with amazing details and amenities throughout.",
    image: "/images/reaco-oneil-living.webp",
    features: ["River Views", "Custom Details", "Luxury Amenities"],
  },
  {
    name: "Von Schlegell Residence",
    location: "Fort Klamath",
    description: "A unique and challenging project showcasing Kevin's ability to handle complex builds.",
    image: "/images/reaco-vonschlegell-exterior.webp",
    features: ["Custom Design", "Complex Build", "Remote Location"],
  },
  {
    name: "Rozewski Residence",
    location: "Brasada Ranch",
    description: "Exceptional craftsmanship with stunning outdoor living spaces and gourmet kitchen.",
    image: "/images/reaco-rozewski-porch.webp",
    interiorImage: "/images/reaco-rozewski-kitchen.webp",
    features: ["Outdoor Living", "Gourmet Kitchen", "Mountain Views"],
  },
  {
    name: "Harrington Residence",
    location: "Central Oregon",
    description: "Beautiful living spaces with expansive deck areas perfect for entertaining.",
    image: "/images/reaco-harrington-living.webp",
    interiorImage: "/images/reaco-harrington-deck.webp",
    features: ["Open Floor Plan", "Deck Living", "Natural Light"],
  },
  {
    name: "Brown Residence",
    location: "Awbrey Butte",
    description: "Best of Show winner featuring innovative ICF construction and designer interiors.",
    image: "/images/reaco-brown-sunroom.webp",
    features: ["Award Winner", "ICF Construction", "Designer Interior"],
  },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Flatten all images for lightbox
  const allImages = useMemo(() => {
    const images: { src: string; alt: string; title: string; description: string }[] = [];
    projects.forEach((project) => {
      images.push({
        src: project.image,
        alt: `${project.name} - Exterior`,
        title: project.name,
        description: `${project.location} - ${project.description}`,
      });
      if (project.interiorImage) {
        images.push({
          src: project.interiorImage,
          alt: `${project.name} - Interior`,
          title: `${project.name} - Interior`,
          description: `${project.location} - Interior view`,
        });
      }
    });
    return images;
  }, []);

  const openLightbox = (projectIndex: number, isInterior: boolean = false) => {
    // Calculate the correct index in the flattened array
    let index = 0;
    for (let i = 0; i < projectIndex; i++) {
      index++; // exterior image
      if (projects[i].interiorImage) {
        index++; // interior image
      }
    }
    if (isInterior && projects[projectIndex].interiorImage) {
      index++; // move to interior image
    }
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Custom Home Portfolio"
        description="Explore our portfolio of award-winning luxury custom homes in Central Oregon. From Brasada Ranch to Tetherow, see Kevin Rea's finest work."
        keywords="custom home portfolio, Bend Oregon homes, luxury home gallery, Brasada Ranch homes, Tetherow custom homes"
        ogImage="/images/reaco-hero-portfolio.webp"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/reaco-hero-portfolio.webp')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Our Work
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Selected Works
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Explore our portfolio of award-winning luxury custom homes across Central Oregon's most prestigious communities.
          </p>
          <p className="font-body text-sm text-white/60 mt-4 animate-fade-in-up animation-delay-300">
            <Expand className="w-4 h-4 inline mr-1" />
            Click any image to view in full screen
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.name}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Main Image */}
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index, false)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/90 via-timber/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Expand className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-timber mb-1">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-amber flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </p>
                    </div>
                    {project.interiorImage && (
                      <button
                        onClick={() => openLightbox(index, true)}
                        className="flex items-center gap-1 text-xs text-timber/70 hover:text-amber transition-colors"
                      >
                        <Image className="w-4 h-4" />
                        Interior
                      </button>
                    )}
                  </div>
                  <p className="font-body text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-body text-xs bg-stone px-3 py-1 rounded-full text-timber"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gallery View Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              variant="outline"
              className="border-timber text-timber hover:bg-timber hover:text-white font-body font-semibold uppercase tracking-wide"
            >
              <Expand className="w-4 h-4 mr-2" />
              View All Photos ({allImages.length})
            </Button>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="font-body text-muted-foreground mb-6">
              Want to see more of our work? Visit our official portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.reacohomes.com/portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-timber text-white hover:bg-timber/90 font-body font-semibold uppercase tracking-wide">
                  View Full Portfolio
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/contact">
                <Button className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />
    </div>
  );
}
