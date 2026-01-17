/**
 * Content Freshness Component
 * Displays last updated dates for content freshness signals
 * Helps with SEO by showing search engines content is maintained
 */

import { Calendar, RefreshCw } from "lucide-react";

interface ContentFreshnessProps {
  publishedAt: string;
  updatedAt?: string;
  className?: string;
  variant?: "inline" | "block";
}

export default function ContentFreshness({
  publishedAt,
  updatedAt,
  className = "",
  variant = "inline",
}: ContentFreshnessProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isUpdated = updatedAt && new Date(updatedAt) > new Date(publishedAt);

  if (variant === "block") {
    return (
      <div className={`bg-stone/50 rounded-lg p-4 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-body text-sm">
              Published: <span className="text-timber font-medium">{formatDate(publishedAt)}</span>
            </span>
          </div>
          {isUpdated && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4 text-amber" />
              <span className="font-body text-sm">
                Updated: <span className="text-amber font-medium">{formatDate(updatedAt!)}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        <span className="font-body">{formatDate(publishedAt)}</span>
      </div>
      {isUpdated && (
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-amber" />
          <span className="font-body">
            Updated {formatDate(updatedAt!)}
          </span>
        </div>
      )}
    </div>
  );
}
