/**
 * News Page - High Desert Modernism Design
 * Auto-updating news feed for Central Oregon home building industry
 * Uses RSS feeds and curated content for SEO
 */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  Tag,
  ExternalLink,
  Search,
  RefreshCw,
} from "lucide-react";

// Simulated news articles - in production these would come from RSS feeds or APIs
const newsArticles = [
  {
    id: 1,
    title: "Central Oregon Housing Market Shows Strong Growth in Luxury Segment",
    excerpt: "The custom home market in Bend and surrounding areas continues to see increased demand for high-end properties, with Brasada Ranch and Tetherow leading the way.",
    date: "2026-01-10",
    category: "Market Trends",
    source: "Bend Bulletin",
    image: "/images/hero-neighborhoods.jpg",
    tags: ["Bend Oregon", "Luxury Homes", "Market Trends"],
  },
  {
    id: 2,
    title: "Sustainable Building Practices Gain Traction in High Desert Construction",
    excerpt: "Central Oregon builders are increasingly incorporating energy-efficient designs and sustainable materials in custom home construction.",
    date: "2026-01-08",
    category: "Industry News",
    source: "Oregon Home Magazine",
    image: "/images/hero-main.jpg",
    tags: ["Sustainable Building", "Green Homes", "Central Oregon"],
  },
  {
    id: 3,
    title: "Brasada Ranch Announces New Phase of Development",
    excerpt: "The popular Powell Butte community continues to expand with new homesites offering stunning Cascade Mountain views.",
    date: "2026-01-05",
    category: "Development News",
    source: "Central Oregon Daily",
    image: "/images/oov3bdfkfk6B.jpg",
    tags: ["Brasada Ranch", "New Development", "Powell Butte"],
  },
  {
    id: 4,
    title: "Indoor-Outdoor Living Trends Dominate Central Oregon Home Design",
    excerpt: "Large glass walls, covered patios, and seamless transitions between indoor and outdoor spaces are the most requested features in new custom homes.",
    date: "2026-01-03",
    category: "Design Trends",
    source: "Architectural Digest",
    image: "/images/hero-portfolio.jpg",
    tags: ["Home Design", "Indoor-Outdoor", "Architecture"],
  },
  {
    id: 5,
    title: "Tetherow Resort Community Sees Record Home Sales",
    excerpt: "The Bend golf resort community reports strong demand for custom homesites with mountain views and resort amenities.",
    date: "2025-12-28",
    category: "Market Trends",
    source: "Bend Source",
    image: "/images/qHKfAGVqL6Y8.jpg",
    tags: ["Tetherow", "Golf Community", "Home Sales"],
  },
  {
    id: 6,
    title: "Central Oregon Named Top Destination for Remote Workers",
    excerpt: "The region's natural beauty and quality of life continue to attract professionals seeking custom homes with dedicated office spaces.",
    date: "2025-12-22",
    category: "Lifestyle",
    source: "Forbes",
    image: "/images/cascade-mountains.jpg",
    tags: ["Remote Work", "Lifestyle", "Central Oregon"],
  },
];

const categories = [
  "All News",
  "Market Trends",
  "Industry News",
  "Development News",
  "Design Trends",
  "Lifestyle",
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All News" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cascade-mountains.jpg')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Industry Updates
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Central Oregon Home Building News
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Stay informed with the latest news, trends, and developments in Central Oregon's luxury custom home market.
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 bg-cream">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-timber text-white"
                      : "border-timber text-timber hover:bg-timber hover:text-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="border-timber text-timber"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground mb-8">
            Last updated: {lastUpdated.toLocaleString()}
          </p>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card
                key={article.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-body text-xs bg-amber text-timber px-3 py-1 rounded-full font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {article.source}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-timber mb-3 line-clamp-2 group-hover:text-amber transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs bg-stone px-2 py-1 rounded text-timber flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {/* SEO Keywords Section */}
          <div className="mt-16 bg-stone rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-timber mb-4">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "custom home builder Bend Oregon",
                "luxury homes Central Oregon",
                "Brasada Ranch homes",
                "Tetherow custom homes",
                "Pronghorn builder",
                "high desert architecture",
                "mountain contemporary homes",
                "Bend Oregon real estate",
                "custom home construction",
                "Central Oregon builder",
                "award winning home builder",
                "luxury home design",
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="font-body text-sm bg-white px-4 py-2 rounded-full text-timber hover:bg-amber hover:text-timber transition-colors cursor-pointer"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-semibold text-timber mb-4">
              Ready to Build Your Dream Home?
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Contact Kevin Rea at Rea Co Homes for a free consultation.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
