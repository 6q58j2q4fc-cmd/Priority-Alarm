/**
 * Generated Article Page - Displays AI-generated SEO articles
 * Each article has its own URL for search engine indexing
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleSchema from "@/components/ArticleSchema";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { ArrowLeft, Phone, Mail, Globe, Calendar, Eye, Tag, User } from "lucide-react";
import { Streamdown } from "streamdown";

export default function GeneratedArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery({ slug: slug || "" });
  // Views are already tracked in getBySlug query

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-stone/50 rounded w-3/4 mb-4" />
            <div className="h-4 bg-stone/50 rounded w-1/2 mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-stone/50 rounded" />
              <div className="h-4 bg-stone/50 rounded" />
              <div className="h-4 bg-stone/50 rounded w-5/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl text-timber mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/articles">
            <Button className="bg-amber text-timber hover:bg-amber/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title={article.title}
        description={article.metaDescription || article.excerpt || ""}
        keywords={article.metaKeywords || ""}
        ogImage={article.featuredImage || "/images/hero-main.jpg"}
        ogType="article"
        canonicalUrl={`/articles/${slug}`}
        articlePublishedTime={article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined}
        articleAuthor="Kevin Rea"
        articleCategory={article.category}
        articleTags={article.tags || ""}
      />
      <ArticleSchema
        title={article.title}
        description={article.metaDescription || article.excerpt || ""}
        url={`https://reacohomes.com/articles/${slug}`}
        image={article.featuredImage || "https://reacohomes.com/images/hero-main.jpg"}
        datePublished={article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString()}
        dateModified={article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined}
        authorName={article.authorName || "Kevin Rea"}
        keywords={article.tags?.split(",").map((t: string) => t.trim()) || []}
        wordCount={article.content?.split(/\s+/).length}
        category={article.category}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-timber">
        <div className="container">
          <Link href="/articles">
            <Button variant="outline" className="mb-6 border-white/30 text-white hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-amber text-timber px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.tags?.split(",").slice(0, 3).map((tag) => (
                <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {tag.trim()}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              {article.title}
            </h1>

            <p className="font-body text-lg text-white/80 mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Draft"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views} views</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <SocialShareButtons
                url={typeof window !== "undefined" ? window.location.href : `https://reacohomes.com/articles/${slug}`}
                title={article.title}
                description={article.excerpt || ""}
                image={article.featuredImage || "/images/hero-main.jpg"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-timber prose-p:text-muted-foreground prose-a:text-amber prose-a:no-underline hover:prose-a:underline">
                    <Streamdown>{article.content}</Streamdown>
                  </article>
                </CardContent>
              </Card>

              {/* Tags */}
              {article.tags && (
                <div className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber" />
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="bg-stone px-4 py-2 rounded-full text-sm text-timber hover:bg-amber hover:text-timber transition-colors cursor-pointer"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact CTA */}
              <Card className="bg-timber text-white border-0 shadow-xl sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">
                    Ready to Build Your Dream Home?
                  </h3>
                  <p className="text-white/80 mb-6 text-sm">
                    Contact Kevin Rea, Central Oregon's premier custom home builder with over 45 years of experience.
                  </p>

                  <div className="space-y-4 mb-6">
                    <a
                      href="tel:541-390-9848"
                      className="flex items-center gap-3 text-white hover:text-amber transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-amber" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Call Kevin</p>
                        <p className="font-semibold">541-390-9848</p>
                      </div>
                    </a>

                    <a
                      href="mailto:kevin@reacohomes.com"
                      className="flex items-center gap-3 text-white hover:text-amber transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-amber" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Email</p>
                        <p className="font-semibold">kevin@reacohomes.com</p>
                      </div>
                    </a>

                    <a
                      href="https://www.reacohomes.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-amber transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-amber" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Website</p>
                        <p className="font-semibold">www.reacohomes.com</p>
                      </div>
                    </a>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-amber text-timber hover:bg-amber/90 font-semibold">
                      Request Free Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card className="bg-white border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/images/kevin-rea.webp"
                      alt="Kevin Rea"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-display font-semibold text-timber">Kevin Rea</h4>
                      <p className="text-sm text-muted-foreground">Master Custom Home Builder</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Building award-winning custom homes in Central Oregon since 1977. 
                    Specializing in luxury residences at Brasada Ranch, Tetherow, and Bend's finest communities.
                  </p>
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
