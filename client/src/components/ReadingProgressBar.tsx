/**
 * Reading Progress Bar Component
 * Shows a progress bar at the top of the page indicating how far the user has scrolled
 * Improves user engagement on blog posts and articles
 */

import { useState, useEffect } from "react";

interface ReadingProgressBarProps {
  /** Color of the progress bar (default: amber) */
  color?: string;
  /** Height of the progress bar in pixels (default: 3) */
  height?: number;
  /** Z-index of the progress bar (default: 50) */
  zIndex?: number;
}

export default function ReadingProgressBar({
  color = "bg-amber",
  height = 3,
  zIndex = 60,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight <= 0) {
        setProgress(100);
        return;
      }
      
      const scrollProgress = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    // Calculate initial progress
    calculateProgress();

    // Add scroll listener
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full"
      style={{ zIndex, height: `${height}px` }}
    >
      <div
        className={`h-full ${color} transition-all duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
