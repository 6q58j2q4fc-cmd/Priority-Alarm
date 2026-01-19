/**
 * Articles Page - Lists all AI-generated SEO articles
 * Search engine friendly with pagination and categories
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Calendar, Eye, Tag, Phone, Mail } from "lucide-react";

export default function Articles() {
  const { data: articles, isLoading } = trpc.articles.list.useQuery({});

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Custom Home Building Articles | Rea Co Homes | Central Oregon"
        description="Expert insights on custom home building in Central Oregon. Tips, trends, and guides for building your dream home in Bend, Brasada Ranch, Tetherow, and more."
        keywords="custom home articles, Bend Oregon building tips, Central Oregon home design, luxury home trends"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-timber">
        <div className="container">
          <div className="max-w-3xl">
            <p className="font-body text-amber uppercase tracking-widest text-sm mb-4">
              Expert Insights
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
              Custom Home Building Articles
            </h1>
            <p className="font-body text-lg text-white/80">
              Discover expert insights, design trends, and building tips for creating your dream home in Central Oregon. 
              From Brasada Ranch to Tetherow, learn what makes a truly exceptional custom home.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-white border-0 shadow-lg animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-stone/50 rounded w-3/4 mb-4" />
                        <div className="h-4 bg-stone/50 rounded w-full mb-2" />
                        <div className="h-4 bg-stone/50 rounded w-5/6" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                      {article.featuredImage && (
                        <Link href={`/articles/${article.slug}`}>
                          <div className="h-48 overflow-hidden">
                            <img
                              src={article.featuredImage}
                              alt={`${article.title} - ${article.category || 'Custom Home'} in Bend Oregon by Kevin Rea, award-winning Central Oregon luxury home builder`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-amber/20 text-amber px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          {article.tags?.split(",").slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-stone px-3 py-1 rounded-full text-xs text-timber">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>

                        <Link href={`/articles/${article.slug}`}>
                          <h2 className="font-display text-xl font-semibold text-timber mb-3 hover:text-amber transition-colors cursor-pointer">
                            {article.title}
                          </h2>
                        </Link>

                        <p className="font-body text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : "Draft"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {article.views} views
                            </span>
                          </div>

                          <Link href={`/articles/${article.slug}`}>
                            <Button variant="ghost" className="text-amber hover:text-amber/80 hover:bg-amber/10">
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Tag className="w-12 h-12 text-amber mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-timber mb-2">
                      No Articles Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Our AI marketing bot is working on generating fresh content. Check back soon!
                    </p>
                    <Link href="/blog">
                      <Button className="bg-amber text-timber hover:bg-amber/90">
                        View Our Blog
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact CTA */}
              <Card className="bg-timber text-white border-0 shadow-xl sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Build Your Dream Home
                  </h3>
                  <p className="text-white/80 mb-6 text-sm">
                    Ready to turn your vision into reality? Contact Kevin Rea, Central Oregon's premier custom home builder.
                  </p>

                  <div className="space-y-4 mb-6">
                    <a
                      href="tel:541-390-9848"
                      className="flex items-center gap-3 text-white hover:text-amber transition-colors"
                    >
                      <Phone className="w-5 h-5 text-amber" />
                      <span className="font-semibold">541-390-9848</span>
                    </a>

                    <a
                      href="mailto:kevin@reacohomes.com"
                      className="flex items-center gap-3 text-white hover:text-amber transition-colors"
                    >
                      <Mail className="w-5 h-5 text-amber" />
                      <span className="font-semibold">kevin@reacohomes.com</span>
                    </a>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-amber text-timber hover:bg-amber/90 font-semibold">
                      Request Free Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-white border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h4 className="font-display font-semibold text-timber mb-4">Explore More</h4>
                  <div className="space-y-2">
                    <Link href="/portfolio">
                      <p className="text-muted-foreground hover:text-amber transition-colors cursor-pointer">
                        → View Our Portfolio
                      </p>
                    </Link>
                    <Link href="/neighborhoods">
                      <p className="text-muted-foreground hover:text-amber transition-colors cursor-pointer">
                        → Central Oregon Neighborhoods
                      </p>
                    </Link>
                    <Link href="/blog">
                      <p className="text-muted-foreground hover:text-amber transition-colors cursor-pointer">
                        → Read Our Blog
                      </p>
                    </Link>
                    <Link href="/news">
                      <p className="text-muted-foreground hover:text-amber transition-colors cursor-pointer">
                        → Industry News
                      </p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
