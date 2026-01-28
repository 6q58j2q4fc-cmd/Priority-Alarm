/**
 * Reading Time Component
 * Displays estimated reading time for articles and blog posts
 */

import { Clock } from "lucide-react";

interface ReadingTimeProps {
  /** The content to calculate reading time for */
  content: string;
  /** Average words per minute (default: 200 for general audience) */
  wordsPerMinute?: number;
  /** Whether to show the clock icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Calculate estimated reading time from content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Reading speed (default 200 wpm)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  // Strip HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, "");
  
  // Count words (split by whitespace)
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  
  const wordCount = words.length;
  
  // Calculate minutes, minimum 1 minute
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return minutes;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export default function ReadingTime({
  content,
  wordsPerMinute = 200,
  showIcon = true,
  className = "",
}: ReadingTimeProps) {
  const minutes = calculateReadingTime(content, wordsPerMinute);
  const formattedTime = formatReadingTime(minutes);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-muted-foreground ${className}`}
    >
      {showIcon && <Clock className="w-4 h-4" />}
      <span>{formattedTime}</span>
    </span>
  );
}
