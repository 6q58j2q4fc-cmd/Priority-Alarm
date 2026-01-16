/**
 * SocialProofNotification Component
 * Shows recent activity notifications to build trust and urgency
 */

import { useState, useEffect } from "react";
import { X, MapPin, Clock, Home, Users, Star } from "lucide-react";

interface Notification {
  id: number;
  type: "consultation" | "project" | "testimonial" | "visitor";
  message: string;
  location: string;
  time: string;
}

// Simulated recent activity data
const notifications: Notification[] = [
  {
    id: 1,
    type: "consultation",
    message: "Someone scheduled a consultation",
    location: "Brasada Ranch",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "project",
    message: "New project started",
    location: "Tetherow",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "testimonial",
    message: "New 5-star review received",
    location: "Bend, OR",
    time: "3 days ago",
  },
  {
    id: 4,
    type: "visitor",
    message: "12 people viewing this page",
    location: "Central Oregon",
    time: "Right now",
  },
  {
    id: 5,
    type: "consultation",
    message: "Someone requested a quote",
    location: "Pronghorn",
    time: "4 hours ago",
  },
  {
    id: 6,
    type: "project",
    message: "Custom home completed",
    location: "Broken Top",
    time: "Last week",
  },
];

export default function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem("socialProofDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Initial delay before showing first notification
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 15000); // 15 seconds after page load

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    // Cycle through notifications
    const interval = setInterval(() => {
      showNotification();
    }, 45000); // Show new notification every 45 seconds

    return () => clearInterval(interval);
  }, [notificationIndex, isDismissed]);

  const showNotification = () => {
    if (isDismissed) return;
    
    const notification = notifications[notificationIndex % notifications.length];
    setCurrentNotification(notification);
    setIsVisible(true);

    // Auto-hide after 8 seconds
    setTimeout(() => {
      setIsVisible(false);
      setNotificationIndex((prev) => prev + 1);
    }, 8000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("socialProofDismissed", "true");
  };

  if (!isVisible || !currentNotification || isDismissed) return null;

  const getIcon = () => {
    switch (currentNotification.type) {
      case "consultation":
        return <Users className="w-5 h-5 text-amber" />;
      case "project":
        return <Home className="w-5 h-5 text-amber" />;
      case "testimonial":
        return <Star className="w-5 h-5 text-amber" />;
      case "visitor":
        return <Users className="w-5 h-5 text-amber" />;
      default:
        return <Home className="w-5 h-5 text-amber" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-slideUp max-w-sm">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-4 pr-10 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-timber/10 rounded-full flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-timber text-sm">
              {currentNotification.message}
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentNotification.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentNotification.time}
              </span>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Verified by Rea Co Homes
          </p>
        </div>
      </div>
    </div>
  );
}
