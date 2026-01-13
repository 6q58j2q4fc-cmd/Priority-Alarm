/**
 * SocialShare Component - Social Media Sharing & Auto-Post Hooks
 * Enables easy sharing of content and tracks engagement
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Link2, 
  Mail, 
  Share2,
  Check,
  MessageCircle
} from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  variant?: "buttons" | "icons" | "compact";
  showCopyLink?: boolean;
  onShare?: (platform: string) => void;
}

export default function SocialShare({
  url,
  title,
  description = "",
  image,
  hashtags = ["ReaCoHomes", "CentralOregon", "CustomHomes", "BendOregon"],
  variant = "buttons",
  showCopyLink = true,
  onShare,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(",");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: image 
      ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(image)}&description=${encodedTitle}`
      : `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0ARead more: ${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    // Track share event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "share", {
        event_category: "Social",
        event_label: platform,
        content_type: "article",
        item_id: url,
      });
    }

    // Call onShare callback if provided
    onShare?.(platform);

    // Open share dialog
    if (platform === "email") {
      window.location.href = shareLinks[platform];
    } else {
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      
      // Track copy event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "copy_link", {
          event_category: "Social",
          event_label: "clipboard",
          content_type: "article",
          item_id: url,
        });
      }

      onShare?.("copy");
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Native share API for mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
        
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "share", {
            event_category: "Social",
            event_label: "native",
            content_type: "article",
            item_id: url,
          });
        }

        onShare?.("native");
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  // Compact variant - just icons
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleShare("facebook")}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        {showCopyLink && (
          <button
            onClick={handleCopyLink}
            className="p-2 text-gray-500 hover:text-amber hover:bg-amber/10 rounded-full transition-colors"
            aria-label="Copy link"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    );
  }

  // Icons variant - larger icons with labels on hover
  if (variant === "icons") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 mr-2">Share:</span>
        <button
          onClick={() => handleShare("facebook")}
          className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="p-2 bg-sky-100 text-sky-500 hover:bg-sky-500 hover:text-white rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare("whatsapp")}
          className="p-2 bg-green-100 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare("email")}
          className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg transition-colors"
          aria-label="Share via Email"
        >
          <Mail className="w-5 h-5" />
        </button>
        {showCopyLink && (
          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-lg transition-colors ${
              copied 
                ? "bg-green-100 text-green-600" 
                : "bg-amber/20 text-amber hover:bg-amber hover:text-timber"
            }`}
            aria-label="Copy link"
          >
            {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
          </button>
        )}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="p-2 bg-timber/10 text-timber hover:bg-timber hover:text-white rounded-lg transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  // Buttons variant - full buttons with text
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">Share this article:</p>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleShare("facebook")}
          variant="outline"
          className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
        <Button
          onClick={() => handleShare("twitter")}
          variant="outline"
          className="bg-sky-50 border-sky-200 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </Button>
        <Button
          onClick={() => handleShare("linkedin")}
          variant="outline"
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700"
        >
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
        <Button
          onClick={() => handleShare("email")}
          variant="outline"
          className="bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-600 hover:text-white hover:border-gray-600"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
        {showCopyLink && (
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className={copied 
              ? "bg-green-50 border-green-200 text-green-600" 
              : "bg-amber/10 border-amber/30 text-amber hover:bg-amber hover:text-timber hover:border-amber"
            }
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Generate social media post content for auto-posting
 */
export function generateSocialPost(article: {
  title: string;
  excerpt: string;
  url: string;
  category?: string;
}) {
  const hashtags = ["#ReaCoHomes", "#CentralOregon", "#CustomHomes", "#BendOregon", "#LuxuryHomes"];
  
  if (article.category) {
    hashtags.push(`#${article.category.replace(/\s+/g, "")}`);
  }

  return {
    twitter: `${article.title}\n\n${article.excerpt.substring(0, 200)}...\n\n${article.url}\n\n${hashtags.slice(0, 4).join(" ")}`,
    facebook: `🏠 ${article.title}\n\n${article.excerpt}\n\nRead more: ${article.url}\n\n${hashtags.join(" ")}`,
    linkedin: `${article.title}\n\n${article.excerpt}\n\nDiscover more about custom home building in Central Oregon:\n${article.url}\n\n${hashtags.join(" ")}`,
  };
}
