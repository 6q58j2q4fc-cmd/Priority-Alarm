/**
 * Blog Post Detail Page
 * Full readable blog post with all content
 */

import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Tag,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="py-20 bg-cream">
          <div className="container text-center">
            <h1 className="font-display text-4xl font-semibold text-timber mb-4">
              Article Not Found
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button className="bg-timber text-white hover:bg-timber/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Get related posts (same tags, excluding current)
  const relatedPosts = blogPosts
    .filter(
      (p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={post.title}
        description={post.excerpt.slice(0, 155)}
        keywords={post.tags.join(", ")}
        ogImage={post.image}
        ogType="article"
      />
      <Header />
      <ReadingProgressBar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.image}')` }}
        >
          <div className="absolute inset-0 bg-timber/80" />
        </div>

        <div className="container relative z-10">
          <Link href="/blog">
            <Button
              variant="outline"
              size="sm"
              className="mb-6 border-white text-white hover:bg-white/10 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs bg-amber text-timber px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Social Share Buttons */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <SocialShareButtons
              url={typeof window !== "undefined" ? window.location.href : `https://reacohomes.com/blog/${slug}`}
              title={post.title}
              description={post.excerpt}
              image={post.image}
            />
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
                      {post.excerpt}
                    </p>
                    <div
                      className="font-body text-foreground leading-relaxed blog-content"
                      dangerouslySetInnerHTML={{
                        __html: post.content
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
                </CardContent>
              </Card>

              {/* Author Box */}
              <Card className="border-0 shadow-lg mt-8">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-stone overflow-hidden flex-shrink-0">
                      <img
                        src="/images/kevin-rea.webp"
                        alt="Kevin Rea"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-timber mb-2">
                        About Kevin Rea
                      </h3>
                      <p className="font-body text-muted-foreground mb-4">
                        With over 45 years of experience building luxury custom
                        homes in Central Oregon, Kevin Rea is the region's most
                        trusted custom home builder. His passion for
                        craftsmanship and attention to detail have earned him
                        numerous awards and the loyalty of countless satisfied
                        clients.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href="tel:541-390-9848"
                          className="flex items-center gap-2 font-body text-sm text-amber hover:text-amber/80"
                        >
                          <Phone className="w-4 h-4" />
                          541-390-9848
                        </a>
                        <a
                          href="mailto:kevin@reacohomes.com"
                          className="flex items-center gap-2 font-body text-sm text-amber hover:text-amber/80"
                        >
                          <Mail className="w-4 h-4" />
                          kevin@reacohomes.com
                        </a>
                        <a
                          href="https://www.reacohomes.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-body text-sm text-amber hover:text-amber/80"
                        >
                          <ExternalLink className="w-4 h-4" />
                          reacohomes.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-semibold text-timber mb-6">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                      >
                        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-display text-sm font-semibold text-timber line-clamp-2 group-hover:text-amber transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground mt-2">
                              {relatedPost.readTime}
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
                    Contact Kevin Rea for a free consultation about your custom
                    home project in Central Oregon.
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

              {/* Tags */}
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-timber mb-4">
                    Topics in This Article
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                        <span className="font-body text-sm bg-stone px-3 py-1 rounded-full text-timber hover:bg-amber transition-colors cursor-pointer flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
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
