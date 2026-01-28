/**
 * Compare Communities Tool
 * Interactive tool to compare 2-3 Central Oregon neighborhoods side-by-side
 */

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import {
  MapPin,
  DollarSign,
  Home,
  TreePine,
  Mountain,
  Waves,
  Car,
  Phone,
  ArrowRight,
  Plus,
  X,
  Check,
  Minus,
} from "lucide-react";

interface CommunityData {
  id: string;
  name: string;
  location: string;
  image: string;
  href: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  distanceToBend: string;
  distanceMinutes: number;
  lotSizes: string;
  amenities: string[];
  style: string;
  golfCourse: boolean;
  spa: boolean;
  pool: boolean;
  tennis: boolean;
  trails: boolean;
  equestrian: boolean;
  skiing: string;
  views: string[];
  description: string;
}

const communities: CommunityData[] = [
  {
    id: "brasada-ranch",
    name: "Brasada Ranch",
    location: "Powell Butte",
    image: "/images/hero-neighborhoods.jpg",
    href: "/brasada-ranch-builder",
    priceRange: "$1.5M - $5M+",
    priceMin: 1500000,
    priceMax: 5000000,
    distanceToBend: "25 min",
    distanceMinutes: 25,
    lotSizes: "1-5+ acres",
    amenities: ["Golf", "Spa", "Equestrian", "Trails", "Pool", "Tennis"],
    style: "High Desert Contemporary",
    golfCourse: true,
    spa: true,
    pool: true,
    tennis: true,
    trails: true,
    equestrian: true,
    skiing: "45 min to Mt. Bachelor",
    views: ["Cascade Mountains", "High Desert", "Golf Course"],
    description: "1,800-acre resort community with world-class amenities",
  },
  {
    id: "tetherow",
    name: "Tetherow",
    location: "Bend",
    image: "/images/qHKfAGVqL6Y8.jpg",
    href: "/tetherow-custom-homes",
    priceRange: "$1.2M - $4M+",
    priceMin: 1200000,
    priceMax: 4000000,
    distanceToBend: "10 min",
    distanceMinutes: 10,
    lotSizes: "0.25-1 acre",
    amenities: ["Golf", "Spa", "Pool", "Trails", "Restaurant"],
    style: "Modern Mountain",
    golfCourse: true,
    spa: true,
    pool: true,
    tennis: false,
    trails: true,
    equestrian: false,
    skiing: "25 min to Mt. Bachelor",
    views: ["Cascade Mountains", "Golf Course", "Deschutes River"],
    description: "Award-winning golf community with modern architecture",
  },
  {
    id: "pronghorn",
    name: "Pronghorn",
    location: "Bend",
    image: "/images/asoZsc8CLN0r.jpg",
    href: "/pronghorn-builder",
    priceRange: "$1.5M - $6M+",
    priceMin: 1500000,
    priceMax: 6000000,
    distanceToBend: "15 min",
    distanceMinutes: 15,
    lotSizes: "0.5-2 acres",
    amenities: ["Golf (2 courses)", "Spa", "Pool", "Tennis", "Fitness"],
    style: "High Desert Luxury",
    golfCourse: true,
    spa: true,
    pool: true,
    tennis: true,
    trails: true,
    equestrian: false,
    skiing: "30 min to Mt. Bachelor",
    views: ["Cascade Mountains", "Golf Course", "High Desert"],
    description: "Premier golf resort with Nicklaus & Fazio courses",
  },
  {
    id: "broken-top",
    name: "Broken Top",
    location: "Bend",
    image: "/images/WkNH38aWPs08.jpg",
    href: "/broken-top-builder",
    priceRange: "$900K - $3M+",
    priceMin: 900000,
    priceMax: 3000000,
    distanceToBend: "5 min",
    distanceMinutes: 5,
    lotSizes: "0.25-0.75 acre",
    amenities: ["Golf", "Pool", "Tennis", "Trails"],
    style: "Northwest Contemporary",
    golfCourse: true,
    spa: false,
    pool: true,
    tennis: true,
    trails: true,
    equestrian: false,
    skiing: "20 min to Mt. Bachelor",
    views: ["Cascade Mountains", "Golf Course", "Forest"],
    description: "Established golf community with mature landscaping",
  },
  {
    id: "caldera-springs",
    name: "Caldera Springs",
    location: "Sunriver",
    image: "/images/UCoE7gADVKD9.jpg",
    href: "/caldera-springs-builder",
    priceRange: "$800K - $2.5M+",
    priceMin: 800000,
    priceMax: 2500000,
    distanceToBend: "35 min",
    distanceMinutes: 35,
    lotSizes: "0.25-0.5 acre",
    amenities: ["Pool", "Trails", "Lake", "Recreation"],
    style: "Mountain Lodge",
    golfCourse: false,
    spa: false,
    pool: true,
    tennis: false,
    trails: true,
    equestrian: false,
    skiing: "40 min to Mt. Bachelor",
    views: ["Forest", "Lake", "Mountains"],
    description: "Family-friendly resort with year-round recreation",
  },
  {
    id: "awbrey-butte",
    name: "Awbrey Butte",
    location: "Bend",
    image: "/images/LlxE9731ghDy.jpg",
    href: "/awbrey-butte-builder",
    priceRange: "$1M - $4M+",
    priceMin: 1000000,
    priceMax: 4000000,
    distanceToBend: "5 min",
    distanceMinutes: 5,
    lotSizes: "0.25-1 acre",
    amenities: ["Trails", "Views", "Parks"],
    style: "Hillside Contemporary",
    golfCourse: false,
    spa: false,
    pool: false,
    tennis: false,
    trails: true,
    equestrian: false,
    skiing: "20 min to Mt. Bachelor",
    views: ["City Views", "Cascade Mountains", "Sunset"],
    description: "Hillside luxury with panoramic views of Bend",
  },
  {
    id: "sunriver",
    name: "Sunriver",
    location: "Sunriver",
    image: "/images/hero-portfolio.jpg",
    href: "/sunriver-builder",
    priceRange: "$600K - $3M+",
    priceMin: 600000,
    priceMax: 3000000,
    distanceToBend: "30 min",
    distanceMinutes: 30,
    lotSizes: "0.25-1 acre",
    amenities: ["Golf (3 courses)", "Pool", "Tennis", "Trails", "Marina"],
    style: "Mountain Resort",
    golfCourse: true,
    spa: true,
    pool: true,
    tennis: true,
    trails: true,
    equestrian: true,
    skiing: "35 min to Mt. Bachelor",
    views: ["Forest", "River", "Mountains"],
    description: "Premier resort destination with endless activities",
  },
  {
    id: "black-butte-ranch",
    name: "Black Butte Ranch",
    location: "Sisters",
    image: "/images/hero-neighborhoods.jpg",
    href: "/black-butte-ranch-builder",
    priceRange: "$700K - $3M+",
    priceMin: 700000,
    priceMax: 3000000,
    distanceToBend: "30 min",
    distanceMinutes: 30,
    lotSizes: "0.5-2 acres",
    amenities: ["Golf (2 courses)", "Pool", "Tennis", "Trails", "Equestrian"],
    style: "Ranch Contemporary",
    golfCourse: true,
    spa: false,
    pool: true,
    tennis: true,
    trails: true,
    equestrian: true,
    skiing: "45 min to Hoodoo",
    views: ["Black Butte", "Cascades", "Meadows"],
    description: "1,800-acre ranch resort with two golf courses",
  },
  {
    id: "northwest-crossing",
    name: "Northwest Crossing",
    location: "Bend",
    image: "/images/WkNH38aWPs08.jpg",
    href: "/northwest-crossing-builder",
    priceRange: "$600K - $1.5M+",
    priceMin: 600000,
    priceMax: 1500000,
    distanceToBend: "5 min",
    distanceMinutes: 5,
    lotSizes: "0.1-0.25 acre",
    amenities: ["Parks", "Trails", "Shops", "Restaurants"],
    style: "Urban Village",
    golfCourse: false,
    spa: false,
    pool: false,
    tennis: false,
    trails: true,
    equestrian: false,
    skiing: "20 min to Mt. Bachelor",
    views: ["Mountain Views", "Parks"],
    description: "Walkable urban village with parks and trails",
  },
  {
    id: "sisters",
    name: "Sisters",
    location: "Sisters",
    image: "/images/hero-neighborhoods.jpg",
    href: "/sisters-builder",
    priceRange: "$500K - $2M+",
    priceMin: 500000,
    priceMax: 2000000,
    distanceToBend: "25 min",
    distanceMinutes: 25,
    lotSizes: "0.25-5+ acres",
    amenities: ["Downtown", "Trails", "Arts", "Events"],
    style: "Western Contemporary",
    golfCourse: false,
    spa: false,
    pool: false,
    tennis: false,
    trails: true,
    equestrian: true,
    skiing: "40 min to Hoodoo",
    views: ["Three Sisters", "Mountains", "Forest"],
    description: "Charming western town with mountain backdrop",
  },
  {
    id: "redmond",
    name: "Redmond",
    location: "Redmond",
    image: "/images/qHKfAGVqL6Y8.jpg",
    href: "/redmond-builder",
    priceRange: "$400K - $1.2M+",
    priceMin: 400000,
    priceMax: 1200000,
    distanceToBend: "20 min",
    distanceMinutes: 20,
    lotSizes: "0.25-2 acres",
    amenities: ["Airport", "Golf", "Parks", "Schools"],
    style: "Traditional & Contemporary",
    golfCourse: true,
    spa: false,
    pool: false,
    tennis: false,
    trails: true,
    equestrian: true,
    skiing: "35 min to Mt. Bachelor",
    views: ["High Desert", "Mountains"],
    description: "Growing city with airport access and family amenities",
  },
  {
    id: "la-pine",
    name: "La Pine",
    location: "La Pine",
    image: "/images/UCoE7gADVKD9.jpg",
    href: "/la-pine-builder",
    priceRange: "$350K - $1M+",
    priceMin: 350000,
    priceMax: 1000000,
    distanceToBend: "35 min",
    distanceMinutes: 35,
    lotSizes: "1-10+ acres",
    amenities: ["State Park", "Trails", "River Access"],
    style: "Mountain Cabin & Contemporary",
    golfCourse: false,
    spa: false,
    pool: false,
    tennis: false,
    trails: true,
    equestrian: true,
    skiing: "45 min to Mt. Bachelor",
    views: ["Forest", "Newberry Volcano", "River"],
    description: "Affordable luxury with Newberry Volcanic Monument access",
  },
];

function AmenityIcon({ has }: { has: boolean }) {
  return has ? (
    <Check className="w-5 h-5 text-green-600" />
  ) : (
    <Minus className="w-5 h-5 text-gray-300" />
  );
}

export default function CompareCommunities() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "brasada-ranch",
    "tetherow",
  ]);

  const selectedCommunities = useMemo(
    () =>
      selectedIds
        .map((id) => communities.find((c) => c.id === id))
        .filter(Boolean) as CommunityData[],
    [selectedIds]
  );

  const availableCommunities = useMemo(
    () => communities.filter((c) => !selectedIds.includes(c.id)),
    [selectedIds]
  );

  const handleSelect = (index: number, value: string) => {
    const newSelected = [...selectedIds];
    newSelected[index] = value;
    setSelectedIds(newSelected);
  };

  const handleAdd = () => {
    if (selectedIds.length < 3 && availableCommunities.length > 0) {
      setSelectedIds([...selectedIds, availableCommunities[0].id]);
    }
  };

  const handleRemove = (index: number) => {
    if (selectedIds.length > 2) {
      const newSelected = selectedIds.filter((_, i) => i !== index);
      setSelectedIds(newSelected);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <PageSEO
        title="Compare Central Oregon Communities"
        description="Compare luxury neighborhoods in Central Oregon side-by-side. Evaluate amenities, price ranges, and proximity to Bend for Brasada Ranch, Tetherow, Pronghorn, and more."
        keywords={[
          "compare Central Oregon neighborhoods",
          "Bend Oregon communities comparison",
          "luxury neighborhoods Bend",
          "golf communities Central Oregon",
          "custom home communities Oregon",
        ]}
        canonicalUrl="/compare-communities"
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-timber py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Community Comparison Tool
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Compare Central Oregon Communities
            </h1>
            <p className="font-body text-lg text-white/80">
              Select 2-3 neighborhoods to compare amenities, price ranges, and
              proximity to Bend. Find the perfect community for your custom
              home.
            </p>
          </div>
        </div>
      </section>

      {/* Selection Bar */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-40 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {selectedIds.map((id, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={id}
                  onValueChange={(value) => handleSelect(index, value)}
                >
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {communities
                      .filter(
                        (c) => c.id === id || !selectedIds.includes(c.id)
                      )
                      .map((community) => (
                        <SelectItem key={community.id} value={community.id}>
                          {community.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {selectedIds.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(index)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {selectedIds.length < 3 && availableCommunities.length > 0 && (
              <Button
                variant="outline"
                onClick={handleAdd}
                className="border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Community
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-12">
        <div className="container">
          <div
            className={`grid gap-6 ${
              selectedCommunities.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            }`}
          >
            {selectedCommunities.map((community) => (
              <Card
                key={community.id}
                className="bg-white border-0 shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="font-display text-xl font-semibold text-white">
                      {community.name}
                    </h2>
                    <p className="font-body text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {community.location}, Oregon
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Price Range
                      </span>
                    </div>
                    <p className="font-display text-2xl font-semibold text-timber">
                      {community.priceRange}
                    </p>
                  </div>

                  {/* Distance to Bend */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Distance to Bend
                      </span>
                    </div>
                    <p className="font-body text-lg text-muted-foreground">
                      {community.distanceToBend}
                    </p>
                  </div>

                  {/* Lot Sizes */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Lot Sizes
                      </span>
                    </div>
                    <p className="font-body text-lg text-muted-foreground">
                      {community.lotSizes}
                    </p>
                  </div>

                  {/* Style */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TreePine className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Architectural Style
                      </span>
                    </div>
                    <p className="font-body text-lg text-muted-foreground">
                      {community.style}
                    </p>
                  </div>

                  {/* Views */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mountain className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Views
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {community.views.map((view) => (
                        <span
                          key={view}
                          className="bg-stone px-3 py-1 rounded-full text-sm font-body text-timber"
                        >
                          {view}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skiing */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Waves className="w-5 h-5 text-amber" />
                      <span className="font-body font-semibold text-timber">
                        Skiing Access
                      </span>
                    </div>
                    <p className="font-body text-lg text-muted-foreground">
                      {community.skiing}
                    </p>
                  </div>

                  {/* Amenities Grid */}
                  <div>
                    <p className="font-body font-semibold text-timber mb-3">
                      Amenities
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.golfCourse} />
                        <span className="font-body text-sm">Golf Course</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.spa} />
                        <span className="font-body text-sm">Spa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.pool} />
                        <span className="font-body text-sm">Pool</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.tennis} />
                        <span className="font-body text-sm">Tennis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.trails} />
                        <span className="font-body text-sm">Trails</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AmenityIcon has={community.equestrian} />
                        <span className="font-body text-sm">Equestrian</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t">
                    <Link href={community.href}>
                      <Button className="w-full bg-timber text-white hover:bg-timber/90 font-body">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Kevin Rea has built custom homes in all of Central Oregon's
              premier communities. Schedule a free consultation to discuss which
              neighborhood is right for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:541-390-9848">
                <Button
                  size="lg"
                  className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 541-390-9848
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold uppercase tracking-wide bg-transparent"
                >
                  Request Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
