/**
 * Related Articles Component
 * Displays related articles for internal linking and SEO juice flow
 * Helps keep visitors engaged and improves page authority
 */

import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  image?: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
  className?: string;
}

export default function RelatedArticles({
  articles,
  title = "Related Articles",
  className = "",
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-timber mb-2">
          {title}
        </h2>
        <div className="w-16 h-1 bg-amber rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              {article.image && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {article.category && (
                    <span className="absolute top-3 left-3 bg-amber text-timber text-xs font-semibold px-2 py-1 rounded">
                      {article.category}
                    </span>
                  )}
                </div>
              )}
              <CardContent className="p-4">
                {article.publishedAt && (
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                )}
                <h3 className="font-display text-lg font-semibold text-timber group-hover:text-amber transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-amber text-sm font-medium group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {articles.length > 3 && (
        <div className="text-center mt-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-timber hover:text-amber font-medium transition-colors">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
