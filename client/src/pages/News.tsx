/**
 * News Page - High Desert Modernism Design
 * Auto-updating news feed for Central Oregon home building industry
 * Uses RSS feeds and curated content for SEO
 */

import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Breadcrumb, { breadcrumbConfigs } from "@/components/Breadcrumb";
import PageSEO from "@/components/PageSEO";
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
  ChevronRight,
} from "lucide-react";
import { newsArticles, categories } from "@/data/newsArticles";

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch AI-generated articles from database
  const { data: generatedArticles, refetch: refetchArticles } = trpc.articles.list.useQuery(
    { limit: 20 },
    { staleTime: 60000 }
  );

  // Combine static and dynamic articles
  const allArticles = useMemo(() => {
    const dbArticles = (generatedArticles || []).map((a: any, idx: number) => ({
      id: 1000 + idx,
      slug: a.slug,
      title: a.title,
      excerpt: a.content?.substring(0, 200) + '...' || '',
      content: a.content,
      date: a.createdAt,
      category: a.category || 'Industry News',
      source: 'Rea Co Homes',
      image: '/images/hero-main.jpg',
      tags: a.keywords?.split(',').slice(0, 3) || ['Central Oregon', 'Custom Homes'],
    }));
    return [...newsArticles, ...dbArticles];
  }, [generatedArticles]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article: any) => {
      const matchesCategory =
        selectedCategory === "All News" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags || []).some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchArticles();
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageSEO
        title="Central Oregon Home Building News"
        description="Latest news and trends in Central Oregon luxury custom home building. Market updates, community developments, and industry insights."
        keywords={["custom homes Central Oregon", "luxury home builder Bend"]}
        ogImage="/images/cascade-mountains.jpg"
      />
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
          <Breadcrumb items={breadcrumbConfigs.news} className="justify-center mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-amber [&_span]:text-white" />
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
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground mb-8">
            Last updated: {lastUpdated.toLocaleString()}
          </p>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up cursor-pointer h-full"
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(article.tags || []).slice(0, 3).map((tag: string) => (
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
                </Card>
              </Link>
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
