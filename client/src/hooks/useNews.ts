/**
 * useNews Hook - Fetches and manages news articles
 * 
 * This hook provides simulated news data that can be extended to fetch
 * from real RSS feeds or news APIs in a backend implementation.
 * 
 * To implement real news fetching:
 * 1. Upgrade to web-db-user with webdev_add_feature
 * 2. Create a backend endpoint that fetches from RSS feeds
 * 3. Replace the static data with API calls
 */

import { useState, useEffect, useMemo } from "react";

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  source: string;
  image: string;
  tags: string[];
  url?: string;
}

// Simulated news data - replace with API call in production
const generateNewsArticles = (): NewsArticle[] => {
  const baseArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Central Oregon Housing Market Shows Strong Growth in Luxury Segment",
      excerpt: "The custom home market in Bend and surrounding areas continues to see increased demand for high-end properties, with Brasada Ranch and Tetherow leading the way.",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Market Trends",
      source: "Bend Bulletin",
      image: "/images/hero-neighborhoods.jpg",
      tags: ["Bend Oregon", "Luxury Homes", "Market Trends"],
    },
    {
      id: 2,
      title: "Sustainable Building Practices Gain Traction in High Desert Construction",
      excerpt: "Central Oregon builders are increasingly incorporating energy-efficient designs and sustainable materials in custom home construction.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Industry News",
      source: "Oregon Home Magazine",
      image: "/images/hero-main.jpg",
      tags: ["Sustainable Building", "Green Homes", "Central Oregon"],
    },
    {
      id: 3,
      title: "Brasada Ranch Announces New Phase of Development",
      excerpt: "The popular Powell Butte community continues to expand with new homesites offering stunning Cascade Mountain views.",
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Development News",
      source: "Central Oregon Daily",
      image: "/images/oov3bdfkfk6B.jpg",
      tags: ["Brasada Ranch", "New Development", "Powell Butte"],
    },
    {
      id: 4,
      title: "Indoor-Outdoor Living Trends Dominate Central Oregon Home Design",
      excerpt: "Large glass walls, covered patios, and seamless transitions between indoor and outdoor spaces are the most requested features in new custom homes.",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Design Trends",
      source: "Architectural Digest",
      image: "/images/hero-portfolio.jpg",
      tags: ["Home Design", "Indoor-Outdoor", "Architecture"],
    },
    {
      id: 5,
      title: "Tetherow Resort Community Sees Record Home Sales",
      excerpt: "The Bend golf resort community reports strong demand for custom homesites with mountain views and resort amenities.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Market Trends",
      source: "Bend Source",
      image: "/images/qHKfAGVqL6Y8.jpg",
      tags: ["Tetherow", "Golf Community", "Home Sales"],
    },
    {
      id: 6,
      title: "Central Oregon Named Top Destination for Remote Workers",
      excerpt: "The region's natural beauty and quality of life continue to attract professionals seeking custom homes with dedicated office spaces.",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Lifestyle",
      source: "Forbes",
      image: "/images/cascade-mountains.jpg",
      tags: ["Remote Work", "Lifestyle", "Central Oregon"],
    },
    {
      id: 7,
      title: "Pronghorn Resort Expands Luxury Home Offerings",
      excerpt: "The exclusive Bend community announces new homesites with access to two championship golf courses and world-class amenities.",
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Development News",
      source: "Golf Digest",
      image: "/images/asoZsc8CLN0r.jpg",
      tags: ["Pronghorn", "Golf", "Luxury Living"],
    },
    {
      id: 8,
      title: "Award-Winning Builders Showcase Innovation at Central Oregon Home Show",
      excerpt: "Local custom home builders demonstrate the latest in sustainable construction and smart home technology.",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: "Industry News",
      source: "The Source Weekly",
      image: "/images/WkNH38aWPs08.jpg",
      tags: ["Home Show", "Innovation", "Custom Builders"],
    },
  ];

  return baseArticles;
};

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setArticles(generateNewsArticles());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setArticles(generateNewsArticles());
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  };

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return ["All News", ...Array.from(cats)];
  }, [articles]);

  return {
    articles,
    isLoading,
    lastUpdated,
    refresh,
    categories,
  };
}

/**
 * RSS Feed Sources for Real Implementation
 * 
 * To implement real news fetching, create a backend service that fetches from these sources:
 * 
 * Local News:
 * - Bend Bulletin: https://www.bendbulletin.com/rss/
 * - Central Oregon Daily: https://centraloregondaily.com/feed/
 * - The Source Weekly: https://www.bendsource.com/bend/Rss.xml
 * 
 * Real Estate News:
 * - Realtor.com News: https://www.realtor.com/news/feed/
 * - Inman News: https://www.inman.com/feed/
 * 
 * Architecture/Design:
 * - Architectural Digest: https://www.architecturaldigest.com/feed/rss
 * - Dwell: https://www.dwell.com/feed/rss
 * 
 * Filter articles by keywords:
 * - "Central Oregon", "Bend", "custom home", "luxury home"
 * - "Brasada Ranch", "Tetherow", "Pronghorn"
 * - "home builder", "construction", "real estate"
 */
