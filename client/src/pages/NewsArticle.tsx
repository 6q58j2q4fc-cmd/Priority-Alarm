/**
 * News Article Detail Page
 * Full readable news article with all content
 */

import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getNewsArticleBySlug, newsArticles } from "@/data/newsArticles";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  Phone,
  ExternalLink,
} from "lucide-react";

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="py-20 bg-cream">
          <div className="container text-center">
            <h1 className="font-display text-4xl font-semibold text-timber mb-4">
              Article Not Found
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              The news article you're looking for doesn't exist.
            </p>
            <Link href="/news">
              <Button className="bg-timber text-white hover:bg-timber/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Get related articles (same category or tags, excluding current)
  const relatedArticles = newsArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category ||
          a.tags.some((tag) => article.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${article.image}')` }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10">
          <Link href="/news">
            <Button
              variant="outline"
              size="sm"
              className="mb-6 border-white text-white hover:bg-white/10 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-body text-xs bg-amber text-timber px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 max-w-4xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Source: {article.source}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none">
                    <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div
                      className="font-body text-foreground leading-relaxed news-content"
                      dangerouslySetInnerHTML={{
                        __html: article.content
                          .split("\n")
                          .map((line) => {
                            if (line.startsWith("## ")) {
                              return `<h2 class="font-display text-2xl font-semibold text-timber mt-10 mb-4">${line.slice(3)}</h2>`;
                            }
                            if (line.startsWith("### ")) {
                              return `<h3 class="font-display text-xl font-semibold text-timber mt-8 mb-3">${line.slice(4)}</h3>`;
                            }
                            if (line.startsWith("**") && line.endsWith("**")) {
                              return `<p class="font-body font-semibold text-timber mt-6 mb-2">${line.slice(2, -2)}</p>`;
                            }
                            if (line.startsWith("- ")) {
                              return `<li class="font-body text-muted-foreground ml-4 mb-2">${line.slice(2)}</li>`;
                            }
                            if (line.trim() === "") {
                              return "";
                            }
                            return `<p class="font-body text-muted-foreground mb-4 leading-relaxed">${line}</p>`;
                          })
                          .join(""),
                      }}
                    />
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h4 className="font-display text-sm font-semibold text-timber mb-3 uppercase tracking-wide">
                      Related Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-sm bg-stone px-3 py-1 rounded-full text-timber flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-semibold text-timber mb-6">
                    Related News
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={`/news/${relatedArticle.slug}`}
                      >
                        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="font-body text-xs bg-amber text-timber px-2 py-0.5 rounded-full font-medium">
                                {relatedArticle.category}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-display text-sm font-semibold text-timber line-clamp-2 group-hover:text-amber transition-colors">
                              {relatedArticle.title}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground mt-2">
                              {new Date(relatedArticle.date).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-timber sticky top-24">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-semibold text-white mb-4">
                    Ready to Build Your Dream Home?
                  </h3>
                  <p className="font-body text-white/80 text-sm mb-6">
                    Contact Kevin Rea, Central Oregon's premier custom home
                    builder, for a free consultation.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold uppercase tracking-wide mb-4">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <a
                    href="tel:541-390-9848"
                    className="font-body text-white/80 text-sm flex items-center justify-center gap-2 hover:text-white"
                  >
                    <Phone className="w-4 h-4" />
                    541-390-9848
                  </a>
                </CardContent>
              </Card>

              {/* About Rea Co Homes */}
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4">
                    About Rea Co Homes
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    With over 45 years of experience, Kevin Rea is Central
                    Oregon's most trusted custom home builder. From Brasada
                    Ranch to Tetherow, we've built award-winning homes
                    throughout the region.
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

              {/* More News */}
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4">
                    More News
                  </h3>
                  <div className="space-y-4">
                    {newsArticles
                      .filter((a) => a.id !== article.id)
                      .slice(0, 4)
                      .map((newsItem) => (
                        <Link
                          key={newsItem.id}
                          href={`/news/${newsItem.slug}`}
                        >
                          <div className="group cursor-pointer">
                            <h4 className="font-body text-sm text-timber group-hover:text-amber transition-colors line-clamp-2">
                              {newsItem.title}
                            </h4>
                            <p className="font-body text-xs text-muted-foreground mt-1">
                              {new Date(newsItem.date).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      ))}
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
