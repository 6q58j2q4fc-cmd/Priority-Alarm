/**
 * Referral Program Component
 * Viral marketing through referral tracking and social sharing incentives
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Share2, Gift, Users, Copy, Check, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

interface ReferralProgramProps {
  userEmail?: string;
  className?: string;
}

export default function ReferralProgram({ userEmail, className = "" }: ReferralProgramProps) {
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Generate or retrieve referral code
  useEffect(() => {
    const storedCode = localStorage.getItem("rea_referral_code");
    if (storedCode) {
      setReferralCode(storedCode);
    } else {
      // Generate new referral code
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "REA-";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setReferralCode(code);
      localStorage.setItem("rea_referral_code", code);
    }

    // Get referral count from localStorage
    const count = parseInt(localStorage.getItem("rea_referral_count") || "0");
    setReferralCount(count);
  }, []);

  const referralUrl = `https://reacohomes.com?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setNotification("Link copied! Share with friends interested in building their dream home.");
      setTimeout(() => setNotification(null), 3000);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      setNotification("Copy failed. Please manually copy the link.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const shareOnSocial = (platform: string) => {
    const message = encodeURIComponent(
      "I'm exploring custom home building in Central Oregon with Rea Co Homes! Check them out:"
    );
    const url = encodeURIComponent(referralUrl);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent("Check out Rea Co Homes - Custom Home Builder")}&body=${message}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const rewards = [
    { count: 1, reward: "Free Custom Home Building Guide PDF" },
    { count: 3, reward: "Priority Consultation Scheduling" },
    { count: 5, reward: "Exclusive Design Consultation ($500 value)" },
    { count: 10, reward: "VIP Home Tour Experience" },
  ];

  return (
    <Card className={`bg-gradient-to-br from-amber/10 to-timber/5 border-amber/20 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-timber">
          <Gift className="w-5 h-5 text-amber" />
          Refer Friends & Earn Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Stats */}
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-amber" />
            <div>
              <p className="text-2xl font-bold text-timber">{referralCount}</p>
              <p className="text-sm text-muted-foreground">Successful Referrals</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-timber">Your Code</p>
            <p className="text-lg font-mono font-bold text-amber">{referralCode}</p>
          </div>
        </div>

        {/* Share Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-timber">Your Referral Link</label>
          <div className="flex gap-2">
            <Input
              value={referralUrl}
              readOnly
              className="font-mono text-sm bg-white"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="shrink-0 border-amber text-amber hover:bg-amber hover:text-timber"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-timber">Share on Social Media</label>
          <div className="flex gap-2">
            <Button
              onClick={() => shareOnSocial("facebook")}
              size="sm"
              className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90"
            >
              <Facebook className="w-4 h-4 mr-1" />
              Facebook
            </Button>
            <Button
              onClick={() => shareOnSocial("twitter")}
              size="sm"
              className="flex-1 bg-black hover:bg-black/90"
            >
              <Twitter className="w-4 h-4 mr-1" />
              X
            </Button>
            <Button
              onClick={() => shareOnSocial("linkedin")}
              size="sm"
              className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90"
            >
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </Button>
            <Button
              onClick={() => shareOnSocial("email")}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
        </div>

        {/* Rewards Tiers */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-timber">Referral Rewards</label>
          <div className="space-y-2">
            {rewards.map((tier) => (
              <div
                key={tier.count}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  referralCount >= tier.count
                    ? "bg-amber/20 border-amber"
                    : "bg-white/50 border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      referralCount >= tier.count
                        ? "bg-amber text-timber"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tier.count}
                  </div>
                  <span
                    className={`text-sm ${
                      referralCount >= tier.count ? "text-timber font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {tier.reward}
                  </span>
                </div>
                {referralCount >= tier.count && (
                  <Check className="w-4 h-4 text-amber" />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          When someone uses your link to contact us about building their dream home,
          you'll earn rewards and they'll receive priority service.
        </p>
      </CardContent>
    </Card>
  );
}
