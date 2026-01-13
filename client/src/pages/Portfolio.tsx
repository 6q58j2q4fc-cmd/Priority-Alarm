/**
 * Portfolio Page - High Desert Modernism Design
 * Showcases Rea Co Homes custom home projects with lightbox gallery
 * All images sourced from reacohomes.com with accurate descriptions
 */

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, MapPin, ExternalLink, Expand, Grid3X3 } from "lucide-react";

// Portfolio projects with accurate data from reacohomes.com
const projects = [
  {
    name: "Chiaramonte Residence",
    location: "Tetherow Rim, Bend",
    description: "Tetherow Rim Showplace featuring stunning mountain views and modern luxury design. Designed by James Rozewski with expansive west-facing glass walls, swim spa, and Batu hardwood decks.",
    image: "/images/chiaramonte-exterior-dusk.webp",
    additionalImages: [
      "/images/chiaramonte-outdoor-living.webp",
      "/images/chiaramonte-pool-deck.webp",
    ],
    features: ["Contemporary Luxury", "Mountain Views", "Glass Walls"],
    sqft: "5,200+",
    style: "Modern Contemporary",
  },
  {
    name: "1st Street Rapids",
    location: "Bend, Oregon",
    description: "A contemporary riverside residence showcasing modern architecture with expansive glass walls, natural materials, and stunning river views.",
    image: "/images/1st-street-rapids-full-exterior.webp",
    additionalImages: [
      "/images/1st-street-rapids-full-interior.webp",
    ],
    features: ["Riverside Location", "Modern Design", "City Living"],
    style: "Modern Contemporary",
  },
  {
    name: "Underwood Residence",
    location: "Brasada Ranch",
    description: "Modern ranch design by Liz Dexter, AIA featuring a non-reflective metal roof, wall of glass, and 1,500 sq ft of outdoor decks with pool.",
    image: "/images/underwood-residence-hero-exterior.webp",
    additionalImages: [
      "/images/underwood-residence-great-room.webp",
      "/images/underwood-residence-pool-view.webp",
      "/images/underwood-residence-dining.webp",
      "/images/underwood-residence-game-room.webp",
      "/images/underwood-residence-kitchen.webp",
    ],
    features: ["Modern Ranch", "Pool & Spa", "4,311 Sq Ft"],
    sqft: "4,311",
    style: "Modern Ranch",
  },
  {
    name: "McCartney Residence",
    location: "Brasada Ranch",
    description: "Modern Ranch Contemporary with expansive views of the Cascade Mountain Range. Features wall of glass facing west and pedestal paver decks.",
    image: "/images/mccartney-exterior-night.webp",
    additionalImages: [
      "/images/mccartney-deck-view.webp",
      "/images/mccartney-kitchen.webp",
      "/images/mccartney-bedroom.webp",
      "/images/mccartney-living-room.webp",
      "/images/mccartney-dining-sunset.webp",
    ],
    features: ["Modern Ranch", "Mountain Views", "3,800 Sq Ft"],
    sqft: "3,800 + 2,000 deck",
    style: "Modern Ranch Contemporary",
  },
  {
    name: "O'Neil Residence",
    location: "Deschutes River Ranch",
    description: "Contemporary Agrarian design on the edge of a pasture bordering the Deschutes River. Features expansive walls of glass and unique barn vernacular style.",
    image: "/images/oneil-exterior.webp",
    additionalImages: [
      "/images/oneil-living-room.webp",
      "/images/oneil-kitchen.webp",
      "/images/oneil-dining.webp",
      "/images/oneil-firepit.webp",
    ],
    features: ["River Views", "Agrarian Style", "4,800 Sq Ft"],
    sqft: "4,800",
    style: "Contemporary Agrarian",
  },
  {
    name: "Von Schlegell Residence",
    location: "Fort Klamath, Oregon",
    description: "Ranch House Contemporary on Seven Mile Creek. Three connected buildings using Aspen trees from the property, reclaimed boxcar wood, and custom sugar pine.",
    image: "/images/vonschlegell-exterior.webp",
    additionalImages: [
      "/images/vonschlegell-deck.webp",
      "/images/vonschlegell-kitchen.webp",
      "/images/vonschlegell-living-room.webp",
    ],
    features: ["Ranch House", "9,000 Sq Ft", "Remote Location"],
    sqft: "9,000",
    style: "Ranch House Contemporary",
  },
  {
    name: "Rozewski Residence",
    location: "Brasada Ranch",
    description: "Custom Ranch Contemporary with L-shaped footprint. Features lava rock fireplace, hand-hewn flooring, and ADU above the garage with Cascade Mountain views.",
    image: "/images/rozewski-living.webp",
    additionalImages: [
      "/images/rozewski-living-room.webp",
      "/images/rozewski-kitchen-dining.webp",
      "/images/rozewski-deck-outdoor.webp",
    ],
    features: ["Ranch Style", "ADU Suite", "3,100 Sq Ft"],
    sqft: "3,100 + 1,500 deck",
    style: "Custom Ranch Contemporary",
  },
  {
    name: "Brown Residence",
    location: "Awbrey Butte, Bend",
    description: "Award-winning ICF home designed by Scott and June Brown. Won Best of Show at Realtors Tour of Homes and OCAPA Excellence in Concrete award.",
    image: "/images/brown-residence-hero-exterior.webp",
    additionalImages: [
      "/images/brown-residence-fireplace-detail.webp",
      "/images/brown-residence-living-room.webp",
      "/images/brown-residence-bedroom.webp",
      "/images/brown-residence-kitchen-view.webp",
    ],
    features: ["Best of Show", "ICF Construction", "4,500 Sq Ft"],
    sqft: "4,500",
    style: "Contemporary ICF",
  },
  {
    name: "Ladkin's Craft Residence",
    location: "Bend, Oregon",
    description: "Luxurious estate with gourmet kitchen, timber frame details, and stunning pond-side setting in a serene Bend neighborhood.",
    image: "/images/craft-exterior.webp",
    additionalImages: [
      "/images/ladkin-kitchen.webp",
      "/images/craft-living.webp",
    ],
    features: ["Luxury Estate", "Pond Setting", "Gourmet Kitchen"],
    style: "Craftsman Luxury",
  },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Flatten all images for lightbox - remove duplicates
  const allImages = useMemo(() => {
    const images: { src: string; alt: string; title: string; description: string }[] = [];
    const seenSrcs = new Set<string>();
    
    projects.forEach((project) => {
      // Add main image
      if (!seenSrcs.has(project.image)) {
        seenSrcs.add(project.image);
        images.push({
          src: project.image,
          alt: `${project.name} - Exterior`,
          title: project.name,
          description: `${project.location} - ${project.description}`,
        });
      }
      
      // Add additional images
      if (project.additionalImages) {
        project.additionalImages.forEach((img, idx) => {
          if (!seenSrcs.has(img)) {
            seenSrcs.add(img);
            images.push({
              src: img,
              alt: `${project.name} - View ${idx + 2}`,
              title: project.name,
              description: `${project.location} - ${project.style || 'Custom Home'}`,
            });
          }
        });
      }
    });
    return images;
  }, []);

  const openLightbox = (projectIndex: number) => {
    // Calculate the correct index in the flattened array
    let index = 0;
    for (let i = 0; i < projectIndex; i++) {
      index++; // main image
      if (projects[i].additionalImages) {
        index += projects[i].additionalImages.length;
      }
    }
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Get image count for a project
  const getProjectImageCount = (project: typeof projects[0]) => {
    let count = 1; // main image
    if (project.additionalImages) {
      count += project.additionalImages.length;
    }
    return count;
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
                {/* Main Image - Properly centered with object-fit */}
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/90 via-timber/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Expand className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Image count badge */}
                  {getProjectImageCount(project) > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Grid3X3 className="w-3 h-3" />
                      {getProjectImageCount(project)} photos
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-timber mb-1">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-stone flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </p>
                    </div>
                    <button
                      onClick={() => openLightbox(index)}
                      className="p-2 rounded-full bg-sand/50 hover:bg-amber/20 transition-colors"
                      aria-label="View interior"
                    >
                      <Expand className="w-4 h-4 text-timber" />
                    </button>
                  </div>

                  <p className="font-body text-stone text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-body text-xs px-3 py-1 bg-sand/50 text-timber rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-timber text-timber hover:bg-timber hover:text-white"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              VIEW ALL PHOTOS ({allImages.length})
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-timber text-white">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
            Want to see more of our work?
          </h2>
          <p className="font-body text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Visit our official portfolio for the complete collection of custom homes, or start your own project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.reacohomes.com/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-timber"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                VIEW FULL PORTFOLIO
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90"
              >
                START YOUR PROJECT
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
