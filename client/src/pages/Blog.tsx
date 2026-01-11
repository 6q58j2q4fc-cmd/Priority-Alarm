/**
 * Blog Page - High Desert Modernism Design
 * SEO-optimized blog posts about Central Oregon custom homes
 * Links back to reacohomes.com for authority building
 */

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Tag,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Brasada Ranch is Central Oregon's Premier Custom Home Community",
    excerpt: "Discover why discerning homeowners choose Brasada Ranch for their luxury custom home. From world-class amenities to stunning high desert views, learn what makes this community exceptional.",
    content: "Brasada Ranch represents the pinnacle of Central Oregon living...",
    date: "2026-01-09",
    author: "Kevin Rea",
    readTime: "5 min read",
    image: "/images/hero-neighborhoods.jpg",
    tags: ["Brasada Ranch", "Custom Homes", "Central Oregon"],
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Building Custom Homes in the High Desert",
    excerpt: "Building in Central Oregon's high desert requires specialized knowledge and experience. Learn about the unique considerations for custom home construction in this beautiful but challenging environment.",
    content: "The Oregon high desert presents unique opportunities and challenges...",
    date: "2026-01-06",
    author: "Kevin Rea",
    readTime: "7 min read",
    image: "/images/hero-main.jpg",
    tags: ["High Desert", "Construction", "Building Tips"],
    featured: false,
  },
  {
    id: 3,
    title: "Tetherow vs Pronghorn: Choosing Your Central Oregon Golf Community",
    excerpt: "Both Tetherow and Pronghorn offer exceptional golf and luxury living. We compare these two premier Bend communities to help you make the right choice for your custom home.",
    content: "When it comes to golf community living in Central Oregon...",
    date: "2026-01-03",
    author: "Kevin Rea",
    readTime: "6 min read",
    image: "/images/qHKfAGVqL6Y8.jpg",
    tags: ["Tetherow", "Pronghorn", "Golf Communities"],
    featured: false,
  },
  {
    id: 4,
    title: "Top 10 Features Luxury Home Buyers Want in Central Oregon",
    excerpt: "From floor-to-ceiling windows to outdoor living spaces, discover the most requested features in Central Oregon custom homes and how to incorporate them into your dream home.",
    content: "Central Oregon's natural beauty inspires unique home features...",
    date: "2025-12-28",
    author: "Kevin Rea",
    readTime: "8 min read",
    image: "/images/hero-portfolio.jpg",
    tags: ["Home Features", "Luxury Homes", "Design"],
    featured: true,
  },
  {
    id: 5,
    title: "Understanding the Custom Home Building Process with Rea Co Homes",
    excerpt: "Our four-step process has been refined over 45+ years to ensure your custom home experience is seamless and enjoyable. Learn what to expect when building with Kevin Rea.",
    content: "Building a custom home should be an exciting journey...",
    date: "2025-12-20",
    author: "Kevin Rea",
    readTime: "10 min read",
    image: "/images/hero-about.jpg",
    tags: ["Building Process", "Rea Co Homes", "Custom Homes"],
    featured: false,
  },
  {
    id: 6,
    title: "Awbrey Butte: Bend's Most Prestigious Neighborhood",
    excerpt: "With stunning views of the Cascade Mountains and proximity to downtown Bend, Awbrey Butte remains one of the most sought-after locations for custom homes in Central Oregon.",
    content: "Awbrey Butte has long been recognized as one of Bend's finest neighborhoods...",
    date: "2025-12-15",
    author: "Kevin Rea",
    readTime: "5 min read",
    image: "/images/WkNH38aWPs08.jpg",
    tags: ["Awbrey Butte", "Bend Oregon", "Neighborhoods"],
    featured: false,
  },
  {
    id: 7,
    title: "Sustainable Building Practices for Central Oregon Custom Homes",
    excerpt: "Learn how modern custom homes in Central Oregon incorporate sustainable materials and energy-efficient designs while maintaining luxury and comfort.",
    content: "Sustainability and luxury are not mutually exclusive...",
    date: "2025-12-10",
    author: "Kevin Rea",
    readTime: "6 min read",
    image: "/images/UCoE7gADVKD9.jpg",
    tags: ["Sustainability", "Green Building", "Energy Efficiency"],
    featured: false,
  },
  {
    id: 8,
    title: "The Benefits of Working with an Experienced Custom Home Builder",
    excerpt: "With over 45 years of experience, Kevin Rea brings unmatched expertise to every project. Discover why experience matters when building your dream home.",
    content: "Experience in custom home building cannot be understated...",
    date: "2025-12-05",
    author: "Kevin Rea",
    readTime: "4 min read",
    image: "/images/asoZsc8CLN0r.jpg",
    tags: ["Experience", "Custom Builder", "Quality"],
    featured: false,
  },
];

const popularTags = [
  "Brasada Ranch",
  "Tetherow",
  "Pronghorn",
  "Custom Homes",
  "Central Oregon",
  "Bend Oregon",
  "Luxury Homes",
  "High Desert",
  "Building Process",
  "Home Design",
];

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-portfolio.jpg')" }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10 text-center">
          <p className="font-body text-amber uppercase tracking-widest text-sm mb-4 animate-fade-in">
            Insights & Expertise
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 animate-fade-in-up">
            Rea Co Homes Blog
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Expert insights on custom home building, Central Oregon communities, and luxury living from Kevin Rea.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Posts */}
              {!selectedTag && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-semibold text-timber mb-6">
                    Featured Articles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="font-body text-xs bg-amber text-timber px-3 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-display text-lg font-semibold text-timber mb-2 line-clamp-2 group-hover:text-amber transition-colors">
                            {post.title}
                          </h3>
                          <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-semibold text-timber">
                    {selectedTag ? `Articles tagged "${selectedTag}"` : "All Articles"}
                  </h2>
                  {selectedTag && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className="border-timber text-timber"
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>

                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="md:w-2/3 p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-semibold text-timber mb-3 group-hover:text-amber transition-colors">
                            {post.title}
                          </h3>
                          <p className="font-body text-muted-foreground mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="font-body text-xs bg-stone px-2 py-1 rounded text-timber hover:bg-amber transition-colors flex items-center gap-1"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </button>
                            ))}
                          </div>
                          <span className="font-body text-sm text-amber font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* About Author */}
              <Card className="border-0 shadow-lg mb-8">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-stone overflow-hidden">
                      <img
                        src="/images/hero-about.jpg"
                        alt="Kevin Rea"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-timber">
                        Kevin Rea
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        Master Builder
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    With over 45 years of experience building luxury custom homes
                    in Central Oregon, Kevin shares his expertise and insights on
                    the art of home building.
                  </p>
                  <a
                    href="https://www.reacohomes.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-amber flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Visit Official Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-lg mb-8">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4">
                    Popular Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`font-body text-sm px-3 py-1 rounded-full transition-colors ${
                          selectedTag === tag
                            ? "bg-amber text-timber"
                            : "bg-stone text-timber hover:bg-amber"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-0 shadow-lg bg-timber">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-semibold text-white mb-4">
                    Ready to Build?
                  </h3>
                  <p className="font-body text-white/80 text-sm mb-6">
                    Contact Kevin Rea for a free consultation about your custom
                    home project.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <p className="font-body text-white/60 text-xs mt-4">
                    Call: 541-390-9848
                  </p>
                </CardContent>
              </Card>

              {/* SEO Links */}
              <div className="mt-8">
                <h4 className="font-display text-sm font-semibold text-timber mb-3 uppercase tracking-wide">
                  Related Searches
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    "custom home builder Bend Oregon",
                    "luxury homes Brasada Ranch",
                    "Tetherow custom home builder",
                    "Central Oregon home construction",
                    "high desert architecture",
                    "Pronghorn luxury homes",
                  ].map((term) => (
                    <p
                      key={term}
                      className="font-body text-muted-foreground hover:text-amber cursor-pointer transition-colors"
                    >
                      {term}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
