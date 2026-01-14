/**
 * Design Inspiration Gallery Page
 * Showcases kitchen, bathroom, and outdoor living features users can select
 * Includes SEO-friendly structure and advertising integration
 */

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  UtensilsCrossed,
  Bath,
  TreePine,
  Flame,
  Sparkles,
  Check,
  ArrowRight,
  Heart,
  Share2,
  ChefHat,
  Droplets,
  Sun,
  Mountain,
} from "lucide-react";

interface FeatureItem {
  id: string;
  name: string;
  description: string;
  image: string;
  priceRange: string;
  popular?: boolean;
}

interface FeatureCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  metaDescription: string;
  features: FeatureItem[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "kitchens",
    name: "Gourmet Kitchens",
    slug: "kitchen-designs",
    description: "Chef-inspired kitchens with premium appliances and custom cabinetry",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    metaDescription: "Explore luxury kitchen designs for Central Oregon custom homes. From professional-grade appliances to custom cabinetry, find inspiration for your dream kitchen.",
    features: [
      {
        id: "chef-kitchen",
        name: "Professional Chef's Kitchen",
        description: "Commercial-grade appliances, 48\" range, pot filler, and walk-in pantry",
        image: "/images/chiaramonte-living-room.webp",
        priceRange: "$75,000 - $150,000",
        popular: true,
      },
      {
        id: "modern-minimal",
        name: "Modern Minimalist Kitchen",
        description: "Clean lines, integrated appliances, waterfall countertops",
        image: "/images/mccartney-kitchen.webp",
        priceRange: "$50,000 - $100,000",
      },
      {
        id: "rustic-gourmet",
        name: "Rustic Gourmet Kitchen",
        description: "Reclaimed wood, copper accents, farmhouse sink",
        image: "/images/vonschlegell-kitchen.webp",
        priceRange: "$60,000 - $120,000",
      },
      {
        id: "open-concept",
        name: "Open Concept Kitchen",
        description: "Seamless flow to living areas, large island with seating",
        image: "/images/1ststreet-kitchen.webp",
        priceRange: "$55,000 - $110,000",
        popular: true,
      },
      {
        id: "butler-pantry",
        name: "Kitchen with Butler's Pantry",
        description: "Hidden prep kitchen, wine storage, additional sink",
        image: "/images/underwood-kitchen.webp",
        priceRange: "$40,000 - $80,000",
      },
      {
        id: "outdoor-kitchen",
        name: "Indoor-Outdoor Kitchen",
        description: "Bi-fold doors to outdoor cooking area, pizza oven",
        image: "/images/chiaramonte-pool-deck.webp",
        priceRange: "$80,000 - $160,000",
      },
    ],
  },
  {
    id: "bathrooms",
    name: "Spa Bathrooms",
    slug: "bathroom-designs",
    description: "Resort-style bathrooms with luxury fixtures and finishes",
    icon: <Bath className="w-6 h-6" />,
    metaDescription: "Discover spa-inspired bathroom designs for your Central Oregon luxury home. Soaking tubs, steam showers, and heated floors create your private retreat.",
    features: [
      {
        id: "master-spa",
        name: "Master Spa Retreat",
        description: "Freestanding soaking tub, dual rain showers, heated floors",
        image: "/images/vonschlegell-bedroom.webp",
        priceRange: "$45,000 - $90,000",
        popular: true,
      },
      {
        id: "steam-shower",
        name: "Steam Shower Suite",
        description: "Full steam room, body jets, chromotherapy lighting",
        image: "/images/chiaramonte-interior-entry.webp",
        priceRange: "$35,000 - $70,000",
      },
      {
        id: "japanese-bath",
        name: "Japanese Soaking Bath",
        description: "Deep soaking tub, natural materials, zen garden view",
        image: "/images/brown-living-room-windows.webp",
        priceRange: "$30,000 - $60,000",
      },
      {
        id: "outdoor-shower",
        name: "Indoor-Outdoor Bathroom",
        description: "Private outdoor shower, living wall, natural light",
        image: "/images/chiaramonte-living-room.webp",
        priceRange: "$40,000 - $80,000",
      },
      {
        id: "his-hers",
        name: "His & Hers Vanities",
        description: "Separate vanity areas, custom storage, makeup station",
        image: "/images/mccartney-kitchen.webp",
        priceRange: "$25,000 - $50,000",
        popular: true,
      },
      {
        id: "guest-bath",
        name: "Luxury Guest Bath",
        description: "Vessel sinks, designer tile, smart mirror",
        image: "/images/oneil-bedroom.webp",
        priceRange: "$20,000 - $40,000",
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Living",
    slug: "outdoor-living-spaces",
    description: "Extend your living space with covered patios, pools, and fire features",
    icon: <TreePine className="w-6 h-6" />,
    metaDescription: "Design your perfect outdoor living space in Central Oregon. From covered patios with mountain views to infinity pools and outdoor kitchens.",
    features: [
      {
        id: "covered-patio",
        name: "Covered Outdoor Room",
        description: "Timber frame structure, fireplace, ceiling fans, heaters",
        image: "/images/chiaramonte-deck-sunset.webp",
        priceRange: "$60,000 - $120,000",
        popular: true,
      },
      {
        id: "infinity-pool",
        name: "Infinity Edge Pool",
        description: "Vanishing edge with mountain views, spa, sun shelf",
        image: "/images/underwood-hero-exterior.webp",
        priceRange: "$150,000 - $300,000",
      },
      {
        id: "fire-pit",
        name: "Fire Pit Gathering Area",
        description: "Built-in seating, gas fire pit, stargazing views",
        image: "/images/1ststreet-deck-firepit.webp",
        priceRange: "$25,000 - $50,000",
        popular: true,
      },
      {
        id: "outdoor-kitchen",
        name: "Full Outdoor Kitchen",
        description: "Built-in grill, pizza oven, refrigeration, bar seating",
        image: "/images/chiaramonte-outdoor-living.webp",
        priceRange: "$75,000 - $150,000",
      },
      {
        id: "hot-tub",
        name: "Hot Tub Retreat",
        description: "Built-in spa, privacy screening, mountain views",
        image: "/images/rozewski-adu-deck.webp",
        priceRange: "$30,000 - $60,000",
      },
      {
        id: "sport-court",
        name: "Sport Court & Recreation",
        description: "Multi-sport court, bocce ball, putting green",
        image: "/images/underwood-game-room.webp",
        priceRange: "$50,000 - $100,000",
      },
    ],
  },
  {
    id: "fireplaces",
    name: "Fireplace Features",
    slug: "fireplace-designs",
    description: "Statement fireplaces that anchor your living spaces",
    icon: <Flame className="w-6 h-6" />,
    metaDescription: "Explore stunning fireplace designs for Central Oregon homes. From floor-to-ceiling stone to modern linear gas fireplaces.",
    features: [
      {
        id: "floor-ceiling",
        name: "Floor-to-Ceiling Stone",
        description: "Natural stone, timber mantel, built-in wood storage",
        image: "/images/brown-fireplace-night.webp",
        priceRange: "$25,000 - $50,000",
        popular: true,
      },
      {
        id: "linear-modern",
        name: "Modern Linear Fireplace",
        description: "72\" linear gas, clean surround, LED accent lighting",
        image: "/images/1ststreet-fireplace.webp",
        priceRange: "$15,000 - $30,000",
      },
      {
        id: "double-sided",
        name: "Double-Sided Fireplace",
        description: "See-through design connecting indoor and outdoor",
        image: "/images/rozewski-living-room.webp",
        priceRange: "$30,000 - $60,000",
      },
      {
        id: "outdoor-fireplace",
        name: "Outdoor Fireplace",
        description: "Covered patio fireplace with seating alcoves",
        image: "/images/mccartney-deck-sunset.webp",
        priceRange: "$35,000 - $70,000",
        popular: true,
      },
    ],
  },
];

export default function DesignInspiration() {
  const [selectedCategory, setSelectedCategory] = useState<string>("kitchens");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const currentCategory = FEATURE_CATEGORIES.find((c) => c.id === selectedCategory);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const toggleFavorite = (featureId: string) => {
    setFavorites((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Calculate total estimated cost
  const totalEstimate = selectedFeatures.reduce((total, featureId) => {
    for (const category of FEATURE_CATEGORIES) {
      const feature = category.features.find((f) => f.id === featureId);
      if (feature) {
        const avgPrice = feature.priceRange
          .split(" - ")
          .map((p) => parseInt(p.replace(/[$,]/g, "")))
          .reduce((a, b) => a + b, 0) / 2;
        return total + avgPrice;
      }
    }
    return total;
  }, 0);

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${currentCategory?.name} Design Inspiration`,
    description: currentCategory?.metaDescription,
    itemListElement: currentCategory?.features.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: feature.name,
        description: feature.description,
        image: `https://reacohomes.com${feature.image}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: feature.priceRange.split(" - ")[0].replace(/[$,]/g, ""),
          highPrice: feature.priceRange.split(" - ")[1].replace(/[$,]/g, ""),
        },
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{currentCategory?.name} Design Inspiration | Rea Co Homes | Central Oregon Custom Homes</title>
        <meta name="description" content={currentCategory?.metaDescription} />
        <meta name="keywords" content={`${currentCategory?.name}, custom home design, Central Oregon, luxury homes, Bend Oregon, home builder`} />
        <link rel="canonical" href={`https://reacohomes.com/inspiration/${currentCategory?.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${currentCategory?.name} Design Inspiration | Rea Co Homes`} />
        <meta property="og:description" content={currentCategory?.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://reacohomes.com/inspiration/${currentCategory?.slug}`} />
        <meta property="og:image" content={`https://reacohomes.com${currentCategory?.features[0]?.image}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentCategory?.name} Design Inspiration`} />
        <meta name="twitter:description" content={currentCategory?.metaDescription} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Google Ads Remarketing Tag Placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script> */}
      </Helmet>

      <div className="min-h-screen bg-cream">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-timber to-timber/90">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="bg-amber/20 text-amber border-0 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Design Inspiration Gallery
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
                Curate Your Dream Home Features
              </h1>
              <p className="font-body text-lg text-white/80">
                Browse our gallery of premium features and select the elements you'd like
                to include in your custom Central Oregon home.
              </p>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="sticky top-0 z-40 bg-white shadow-md">
          <div className="container py-4">
            <div className="flex flex-wrap justify-center gap-2">
              {FEATURE_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-amber text-timber hover:bg-amber/90"
                      : "border-timber/30 text-timber hover:bg-timber/10"
                  }
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Features Summary */}
        {selectedFeatures.length > 0 && (
          <section className="bg-amber/10 border-b border-amber/20">
            <div className="container py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-timber">
                    <strong>{selectedFeatures.length}</strong> features selected
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Estimated total: <strong className="text-timber">${totalEstimate.toLocaleString()}</strong>
                  </span>
                </div>
                <Link href="/dream-home-builder">
                  <Button className="bg-timber text-white hover:bg-timber/90">
                    Add to Dream Home
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Feature Gallery */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-timber mb-2">
                {currentCategory?.name}
              </h2>
              <p className="text-muted-foreground">{currentCategory?.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory?.features.map((feature) => (
                <Card
                  key={feature.id}
                  className={`group overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedFeatures.includes(feature.id)
                      ? "border-amber shadow-lg"
                      : "border-transparent hover:border-amber/50"
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {feature.popular && (
                      <Badge className="absolute top-3 left-3 bg-amber text-timber">
                        Popular Choice
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(feature.id);
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(feature.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-timber hover:bg-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(feature.id) ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.share?.({
                            title: feature.name,
                            text: feature.description,
                            url: window.location.href,
                          });
                        }}
                        className="p-2 rounded-full bg-white/80 text-timber hover:bg-white transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    {selectedFeatures.includes(feature.id) && (
                      <div className="absolute inset-0 bg-amber/20 flex items-center justify-center">
                        <div className="bg-amber text-timber rounded-full p-3">
                          <Check className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display text-lg font-semibold text-timber mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber">
                        {feature.priceRange}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          selectedFeatures.includes(feature.id)
                            ? "text-amber"
                            : "text-timber"
                        }
                      >
                        {selectedFeatures.includes(feature.id) ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-timber">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-white mb-4">
                Ready to Design Your Dream Home?
              </h2>
              <p className="text-white/80 mb-8">
                Use our AI Dream Home Builder to combine your selected features
                with custom floor plans and get a complete cost estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dream-home-builder">
                  <Button
                    size="lg"
                    className="bg-amber text-timber hover:bg-amber/90 font-semibold"
                  >
                    Start Building Your Dream
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
