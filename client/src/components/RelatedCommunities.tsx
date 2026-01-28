/**
 * Related Communities Component
 * Displays links to related/nearby communities for internal SEO linking
 */

import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Community {
  name: string;
  href: string;
  location: string;
  image: string;
  description: string;
}

// All communities with their relationships
const allCommunities: Record<string, Community> = {
  "brasada-ranch": {
    name: "Brasada Ranch",
    href: "/brasada-ranch-builder",
    location: "Powell Butte",
    image: "/images/hero-neighborhoods.jpg",
    description: "1,800-acre resort community with golf, spa, and Cascade views",
  },
  "tetherow": {
    name: "Tetherow",
    href: "/tetherow-custom-homes",
    location: "Bend",
    image: "/images/qHKfAGVqL6Y8.jpg",
    description: "Award-winning golf community with modern mountain architecture",
  },
  "pronghorn": {
    name: "Pronghorn",
    href: "/pronghorn-builder",
    location: "Bend",
    image: "/images/asoZsc8CLN0r.jpg",
    description: "36 holes of championship golf with luxury amenities",
  },
  "broken-top": {
    name: "Broken Top",
    href: "/broken-top-builder",
    location: "Bend",
    image: "/images/WkNH38aWPs08.jpg",
    description: "Established golf community with mature landscaping",
  },
  "caldera-springs": {
    name: "Caldera Springs",
    href: "/caldera-springs-builder",
    location: "Sunriver",
    image: "/images/UCoE7gADVKD9.jpg",
    description: "Family-friendly resort with pools and recreation",
  },
  "awbrey-butte": {
    name: "Awbrey Butte",
    href: "/awbrey-butte-builder",
    location: "Bend",
    image: "/images/LlxE9731ghDy.jpg",
    description: "Hillside luxury with panoramic city and mountain views",
  },
  "sunriver": {
    name: "Sunriver",
    href: "/sunriver-builder",
    location: "Sunriver",
    image: "/images/hero-portfolio.jpg",
    description: "Premier resort destination with year-round activities",
  },
  "awbrey-glen": {
    name: "Awbrey Glen",
    href: "/awbrey-glen-builder",
    location: "Bend",
    image: "/images/qHKfAGVqL6Y8.jpg",
    description: "Private golf club with stunning mountain views",
  },
  "black-butte-ranch": {
    name: "Black Butte Ranch",
    href: "/black-butte-ranch-builder",
    location: "Sisters",
    image: "/images/hero-neighborhoods.jpg",
    description: "1,800-acre ranch resort with two golf courses",
  },
  "juniper-preserve": {
    name: "Juniper Preserve",
    href: "/juniper-preserve-builder",
    location: "Bend",
    image: "/images/asoZsc8CLN0r.jpg",
    description: "Exclusive community with Tom Fazio golf course",
  },
  "northwest-crossing": {
    name: "Northwest Crossing",
    href: "/northwest-crossing-builder",
    location: "Bend",
    image: "/images/WkNH38aWPs08.jpg",
    description: "Walkable urban village with parks and trails",
  },
  "highlands-broken-top": {
    name: "The Highlands",
    href: "/highlands-broken-top-builder",
    location: "Bend",
    image: "/images/LlxE9731ghDy.jpg",
    description: "Elevated homesites above Broken Top golf course",
  },
  "old-mill": {
    name: "Old Mill District",
    href: "/old-mill-builder",
    location: "Bend",
    image: "/images/hero-portfolio.jpg",
    description: "Urban riverfront living with shops and dining",
  },
  "sisters": {
    name: "Sisters",
    href: "/sisters-builder",
    location: "Sisters",
    image: "/images/hero-neighborhoods.jpg",
    description: "Charming western town with mountain backdrop",
  },
  "la-pine": {
    name: "La Pine",
    href: "/la-pine-builder",
    location: "La Pine",
    image: "/images/UCoE7gADVKD9.jpg",
    description: "Affordable luxury with Newberry Volcanic Monument access",
  },
  "prineville": {
    name: "Prineville",
    href: "/prineville-builder",
    location: "Prineville",
    image: "/images/asoZsc8CLN0r.jpg",
    description: "Historic ranching community with Ochoco views",
  },
  "redmond": {
    name: "Redmond",
    href: "/redmond-builder",
    location: "Redmond",
    image: "/images/qHKfAGVqL6Y8.jpg",
    description: "Growing city with airport access and family amenities",
  },
};

// Define related communities for each location
const communityRelationships: Record<string, string[]> = {
  "brasada-ranch": ["pronghorn", "tetherow", "sunriver", "black-butte-ranch"],
  "tetherow": ["pronghorn", "broken-top", "awbrey-glen", "northwest-crossing"],
  "pronghorn": ["juniper-preserve", "tetherow", "brasada-ranch", "broken-top"],
  "broken-top": ["highlands-broken-top", "awbrey-butte", "tetherow", "pronghorn"],
  "caldera-springs": ["sunriver", "la-pine", "brasada-ranch", "black-butte-ranch"],
  "awbrey-butte": ["awbrey-glen", "broken-top", "northwest-crossing", "old-mill"],
  "sunriver": ["caldera-springs", "la-pine", "brasada-ranch", "black-butte-ranch"],
  "awbrey-glen": ["awbrey-butte", "broken-top", "tetherow", "pronghorn"],
  "black-butte-ranch": ["sisters", "brasada-ranch", "sunriver", "caldera-springs"],
  "juniper-preserve": ["pronghorn", "tetherow", "broken-top", "brasada-ranch"],
  "northwest-crossing": ["old-mill", "awbrey-butte", "tetherow", "broken-top"],
  "highlands-broken-top": ["broken-top", "awbrey-butte", "tetherow", "pronghorn"],
  "old-mill": ["northwest-crossing", "awbrey-butte", "tetherow", "broken-top"],
  "sisters": ["black-butte-ranch", "brasada-ranch", "sunriver", "redmond"],
  "la-pine": ["sunriver", "caldera-springs", "brasada-ranch", "prineville"],
  "prineville": ["redmond", "brasada-ranch", "pronghorn", "sisters"],
  "redmond": ["prineville", "sisters", "tetherow", "pronghorn"],
};

interface RelatedCommunitiesProps {
  /** Current community key (e.g., "brasada-ranch") */
  currentCommunity: string;
  /** Maximum number of related communities to show */
  maxItems?: number;
}

export default function RelatedCommunities({
  currentCommunity,
  maxItems = 4,
}: RelatedCommunitiesProps) {
  const relatedKeys = communityRelationships[currentCommunity] || [];
  const relatedCommunities = relatedKeys
    .slice(0, maxItems)
    .map((key) => allCommunities[key])
    .filter(Boolean);

  if (relatedCommunities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-stone">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-3">
            Explore More Communities
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-timber mb-3">
            Related Central Oregon Neighborhoods
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Discover other premier communities where Kevin Rea builds award-winning custom homes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCommunities.map((community) => (
            <Link key={community.href} href={community.href}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={community.image}
                    alt={`${community.name} Custom Homes`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-timber/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-body text-white/80 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {community.location}, Oregon
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-semibold text-timber mb-1 group-hover:text-amber transition-colors flex items-center gap-2">
                    {community.name}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">
                    {community.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/neighborhoods">
            <span className="font-body text-amber hover:text-timber transition-colors inline-flex items-center gap-2 font-medium">
              View All Neighborhoods
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
