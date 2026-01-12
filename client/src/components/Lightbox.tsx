/**
 * Enhanced Lightbox Component
 * Full-screen image viewer with smooth animations and intuitive navigation
 * Features: swipe gestures, touch support, smooth transitions, thumbnail navigation
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Grid3X3, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe distance for navigation
  const minSwipeDistance = 50;

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setIsLoading(true);
      setSlideDirection(null);
    }
  }, [isOpen, initialIndex]);

  // Auto-scroll thumbnails to keep current image visible
  useEffect(() => {
    if (thumbnailsRef.current && showThumbnails) {
      const thumbnail = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex, showThumbnails]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && isOpen) {
      autoPlayRef.current = setInterval(() => {
        setSlideDirection('left');
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        setIsLoading(true);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isOpen, images.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          setSlideDirection('right');
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
          setIsZoomed(false);
          setIsLoading(true);
          setIsAutoPlaying(false);
          break;
        case "ArrowRight":
        case " ": // Space bar
          e.preventDefault();
          setSlideDirection('left');
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
          setIsZoomed(false);
          setIsLoading(true);
          setIsAutoPlaying(false);
          break;
        case "g":
          setShowThumbnails((prev) => !prev);
          break;
        case "p":
          setIsAutoPlaying((prev) => !prev);
          break;
      }
    },
    [isOpen, images.length, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      setIsZoomed(false);
      setIsLoading(true);
      setIsAutoPlaying(false);
    }
    if (isRightSwipe) {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      setIsZoomed(false);
      setIsLoading(true);
      setIsAutoPlaying(false);
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
    setIsLoading(true);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
    setIsLoading(true);
    setIsAutoPlaying(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const goToImage = (index: number) => {
    setSlideDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
    setIsZoomed(false);
    setIsLoading(true);
    setIsAutoPlaying(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/98 flex flex-col"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage.title && (
            <h3 className="font-display text-lg font-semibold hidden sm:block animate-fade-in">
              {currentImage.title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Auto-play toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-white hover:bg-white/10 ${isAutoPlaying ? 'bg-white/20' : ''}`}
            title={isAutoPlaying ? "Pause slideshow (P)" : "Play slideshow (P)"}
          >
            {isAutoPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>
          
          {/* Thumbnail toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`text-white hover:bg-white/10 ${showThumbnails ? 'bg-white/20' : ''}`}
            title="Toggle thumbnails (G)"
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          
          {/* Zoom toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className={`text-white hover:bg-white/10 ${isZoomed ? 'bg-white/20' : ''}`}
            title={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? (
              <ZoomOut className="w-5 h-5" />
            ) : (
              <ZoomIn className="w-5 h-5" />
            )}
          </Button>
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10 ml-2"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative px-4 pb-4 overflow-hidden">
        {/* Previous Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 z-10 text-white hover:bg-white/10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:scale-110"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Image Container with Animation */}
        <div
          className={`relative max-w-full max-h-full overflow-auto transition-all duration-300 ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          } ${slideDirection === 'left' ? 'animate-slide-in-right' : slideDirection === 'right' ? 'animate-slide-in-left' : ''}`}
          onClick={toggleZoom}
        >
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            onLoad={() => setIsLoading(false)}
            className={`transition-all duration-500 ${
              isZoomed
                ? "max-w-none w-auto h-auto scale-150"
                : "max-w-full max-h-[calc(100vh-200px)] object-contain"
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 sm:right-4 z-10 text-white hover:bg-white/10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:scale-110"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
        
        {/* Progress bar for auto-play */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-amber animate-progress"
              style={{ animationDuration: '4s' }}
            />
          </div>
        )}
      </div>

      {/* Description */}
      {currentImage.description && (
        <div className="p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
          <p className="font-body text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            {currentImage.description}
          </p>
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && showThumbnails && (
        <div className="p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
          <div 
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
            style={{ scrollBehavior: 'smooth' }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-amber ring-offset-2 ring-offset-black opacity-100 scale-105"
                    : "opacity-50 hover:opacity-80 hover:scale-105"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          
          {/* Keyboard hints */}
          <div className="flex justify-center gap-4 mt-2 text-xs text-white/40">
            <span>← → Navigate</span>
            <span>Space Next</span>
            <span>G Grid</span>
            <span>P Play</span>
            <span>Esc Close</span>
          </div>
        </div>
      )}
    </div>
  );
}
