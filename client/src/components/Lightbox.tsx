/**
 * Lightbox Component
 * Full-screen image viewer for portfolio photos
 */

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
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

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
          setIsZoomed(false);
          break;
        case "ArrowRight":
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
          setIsZoomed(false);
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

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-white/70">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage.title && (
            <h3 className="font-display text-lg font-semibold hidden sm:block">
              {currentImage.title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className="text-white hover:bg-white/10"
          >
            {isZoomed ? (
              <ZoomOut className="w-5 h-5" />
            ) : (
              <ZoomIn className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative px-4 pb-4">
        {/* Previous Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 z-10 text-white hover:bg-white/10 w-12 h-12"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Image */}
        <div
          className={`relative max-w-full max-h-full overflow-auto ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={toggleZoom}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`transition-transform duration-300 ${
              isZoomed
                ? "max-w-none w-auto h-auto"
                : "max-w-full max-h-[calc(100vh-200px)] object-contain"
            }`}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 z-10 text-white hover:bg-white/10 w-12 h-12"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
      </div>

      {/* Description */}
      {currentImage.description && (
        <div className="p-4 text-center">
          <p className="font-body text-white/80 max-w-2xl mx-auto">
            {currentImage.description}
          </p>
        </div>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-2 justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-amber opacity-100"
                    : "border-transparent opacity-50 hover:opacity-75"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
