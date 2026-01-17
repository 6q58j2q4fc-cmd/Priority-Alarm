/**
 * Trust Badges Component
 * Display certifications, awards, and trust signals for social proof
 */

import { Award, Shield, CheckCircle, Star, Building2, Users } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

const badges = [
  {
    icon: Award,
    title: "Best of Show Winner",
    subtitle: "Central Oregon Builders Association",
    color: "text-amber",
  },
  {
    icon: Shield,
    title: "CCB Licensed",
    subtitle: "#193427",
    color: "text-timber",
  },
  {
    icon: CheckCircle,
    title: "Fully Insured",
    subtitle: "Liability & Workers Comp",
    color: "text-green-600",
  },
  {
    icon: Star,
    title: "5-Star Rated",
    subtitle: "Google Reviews",
    color: "text-amber",
  },
  {
    icon: Building2,
    title: "45+ Years",
    subtitle: "Building Excellence",
    color: "text-timber",
  },
  {
    icon: Users,
    title: "100+ Homes",
    subtitle: "Custom Built",
    color: "text-amber",
  },
];

export default function TrustBadges({ variant = "horizontal", className = "" }: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {badges.slice(0, 4).map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg shadow-sm"
          >
            <badge.icon className={`w-5 h-5 ${badge.color}`} />
            <span className="text-sm font-medium text-timber">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-border"
          >
            <div className={`p-3 rounded-full bg-cream ${badge.color}`}>
              <badge.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-timber">{badge.title}</p>
              <p className="text-sm text-muted-foreground">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default horizontal variant
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`p-3 rounded-full bg-cream mb-3 ${badge.color}`}>
            <badge.icon className="w-6 h-6" />
          </div>
          <p className="font-semibold text-timber text-sm">{badge.title}</p>
          <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
