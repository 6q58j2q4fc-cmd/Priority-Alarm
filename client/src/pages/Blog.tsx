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
import { blogPosts, popularTags } from "@/data/blogPosts";

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
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
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
                      </Link>
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
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card
                        className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up cursor-pointer"
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
                                <span
                                  key={tag}
                                  className="font-body text-xs bg-stone px-2 py-1 rounded text-timber flex items-center gap-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="font-body text-sm text-amber font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read Full Article
                              <ChevronRight className="w-4 h-4" />
                            </span>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
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
                        src="/images/kevin-rea.webp"
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
                    "high desert custom homes",
                    "Pronghorn luxury builder",
                  ].map((keyword) => (
                    <p
                      key={keyword}
                      className="font-body text-muted-foreground hover:text-amber cursor-pointer transition-colors"
                    >
                      {keyword}
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
