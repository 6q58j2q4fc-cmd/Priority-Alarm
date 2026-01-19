/**
 * Scheduler Service for Automated Content Generation
 * Handles automatic article generation on a configurable schedule
 */

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { schedulerConfig, articles, botActivityLog } from "../drizzle/schema";
import { invokeLLM } from "./_core/llm";
import { processEmailQueue, initializeWelcomeSequence } from "./emailDrip";

let _db: ReturnType<typeof drizzle> | null = null;
let schedulerInterval: NodeJS.Timeout | null = null;

async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Scheduler] Failed to connect to database:", error);
      _db = null;
    }
  }
  return _db;
}

// Topics to rotate through for content generation - Enhanced with long-tail SEO keywords
const CONTENT_TOPICS = [
  // Core Custom Home Topics
  { category: "Custom Home Design", keywords: ["custom home design Bend Oregon", "luxury custom homes Central Oregon", "Brasada Ranch custom builder", "architectural design high desert"] },
  { category: "Central Oregon Living", keywords: ["Central Oregon lifestyle", "Bend Oregon living", "high desert living benefits", "mountain views homes"] },
  { category: "Neighborhoods", keywords: ["Tetherow homes for sale", "Pronghorn custom homes", "Broken Top luxury homes", "Awbrey Butte builders", "North Rim custom builder"] },
  { category: "Building Process", keywords: ["custom home builder Bend", "home construction process Oregon", "building timeline custom home", "how long to build custom home"] },
  { category: "Luxury Features", keywords: ["luxury home amenities", "smart home technology Oregon", "outdoor living spaces Bend", "gourmet kitchen design"] },
  { category: "Market Trends", keywords: ["Bend Oregon real estate market", "Central Oregon home values", "luxury home investment Oregon", "Central Oregon growth"] },
  { category: "Sustainability", keywords: ["sustainable building Oregon", "energy efficient homes Bend", "green homes Central Oregon", "eco-friendly custom homes"] },
  { category: "Interior Design", keywords: ["interior design Bend Oregon", "modern rustic homes", "high desert aesthetic design", "mountain modern interior"] },
  // Long-tail SEO Topics for Traffic Generation
  { category: "Cost Guide", keywords: ["cost to build custom home Bend Oregon", "custom home price per square foot", "luxury home building costs Central Oregon", "how much does it cost to build in Brasada Ranch"] },
  { category: "Lot Selection", keywords: ["best lots in Tetherow", "buying land Central Oregon", "custom home lot selection tips", "view lots Bend Oregon"] },
  { category: "Builder Selection", keywords: ["how to choose custom home builder", "best custom home builders Bend Oregon", "questions to ask custom builder", "what to look for in luxury builder"] },
  { category: "Financing", keywords: ["construction loan Oregon", "financing custom home build", "custom home mortgage options", "luxury home financing"] },
  { category: "Timeline Planning", keywords: ["custom home building timeline", "how long to build luxury home", "construction schedule Oregon", "when to start building custom home"] },
  { category: "Design Trends", keywords: ["2026 custom home trends", "modern mountain home design", "luxury home trends Oregon", "contemporary rustic design"] },
  { category: "Outdoor Living", keywords: ["outdoor living design Bend", "patio design Central Oregon", "outdoor kitchen custom home", "fire pit design high desert"] },
  { category: "Energy Efficiency", keywords: ["energy efficient home Oregon", "solar ready custom home", "passive house design Bend", "net zero home Central Oregon"] },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100) + '-' + Date.now();
}

async function generateArticleContent(topic: typeof CONTENT_TOPICS[0]): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  metaDescription: string;
  metaKeywords: string;
}> {
  const prompt = `You are an expert content writer for Rea Co Homes, a premier custom home builder in Central Oregon led by Kevin Rea. 

Generate a comprehensive, SEO-optimized blog article about: ${topic.category}

Target keywords: ${topic.keywords.join(", ")}

Requirements:
1. Title should be compelling and include primary keyword
2. Content should be 800-1200 words
3. Include sections with H2 headings
4. Naturally incorporate keywords throughout
5. Include a call-to-action mentioning Kevin Rea (541-390-9848, kevin@reacohomes.com)
6. Focus on Central Oregon locations: Bend, Brasada Ranch, Tetherow, Pronghorn, etc.
7. Highlight Kevin Rea's 45+ years of experience and award-winning work

Return JSON with this exact structure:
{
  "title": "Article title here",
  "excerpt": "2-3 sentence summary for preview",
  "content": "Full article content in markdown format",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaDescription": "SEO meta description under 160 characters",
  "metaKeywords": "comma, separated, keywords"
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert SEO content writer. Always respond with valid JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_content",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "Article title" },
              excerpt: { type: "string", description: "2-3 sentence summary" },
              content: { type: "string", description: "Full article content in markdown" },
              tags: { type: "array", items: { type: "string" }, description: "Article tags" },
              metaDescription: { type: "string", description: "SEO meta description" },
              metaKeywords: { type: "string", description: "Comma-separated keywords" }
            },
            required: ["title", "excerpt", "content", "tags", "metaDescription", "metaKeywords"],
            additionalProperties: false
          }
        }
      }
    });

    const messageContent = response.choices[0]?.message?.content;
    if (!messageContent) {
      throw new Error("No content in LLM response");
    }

    const content = typeof messageContent === 'string' 
      ? messageContent 
      : JSON.stringify(messageContent);

    return JSON.parse(content);
  } catch (error) {
    console.error("[Scheduler] Error generating content:", error);
    throw error;
  }
}

async function createScheduledArticle(): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Scheduler] Database not available");
    return false;
  }

  try {
    // Log activity start
    const [activityLog] = await db.insert(botActivityLog).values({
      activityType: "content_generation",
      description: "Scheduled automatic article generation",
      status: "started",
    }).$returningId();

    // Select a random topic
    const topic = CONTENT_TOPICS[Math.floor(Math.random() * CONTENT_TOPICS.length)];
    
    console.log(`[Scheduler] Generating article for topic: ${topic.category}`);

    // Generate content
    const articleData = await generateArticleContent(topic);
    const slug = generateSlug(articleData.title);

    // Create the article
    await db.insert(articles).values({
      slug,
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      category: topic.category,
      tags: JSON.stringify(articleData.tags),
      metaDescription: articleData.metaDescription,
      metaKeywords: articleData.metaKeywords,
      authorName: "Kevin Rea",
      authorEmail: "kevin@reacohomes.com",
      authorPhone: "541-390-9848",
      status: "published",
      publishedAt: new Date(),
    });

    // Update activity log
    await db.update(botActivityLog)
      .set({
        status: "completed",
        result: JSON.stringify({ articleSlug: slug, topic: topic.category }),
        articlesGenerated: 1,
        completedAt: new Date(),
      })
      .where(eq(botActivityLog.id, activityLog.id));

    console.log(`[Scheduler] Successfully created article: ${articleData.title}`);
    return true;
  } catch (error) {
    console.error("[Scheduler] Error creating scheduled article:", error);
    return false;
  }
}

async function runScheduledGeneration(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    // Get scheduler config
    const [config] = await db.select().from(schedulerConfig).where(eq(schedulerConfig.name, "content_generator")).limit(1);
    
    if (!config || !config.enabled) {
      console.log("[Scheduler] Content generation is disabled");
      return;
    }

    const now = new Date();
    const lastRun = config.lastRunAt ? new Date(config.lastRunAt) : null;
    
    // Calculate time between runs based on articles per day
    // For 5 articles/day = every 4.8 hours = 17,280,000 ms
    const hoursPerArticle = 24 / config.articlesPerDay;
    const minTimeBetweenRuns = hoursPerArticle * 60 * 60 * 1000; // Convert to milliseconds
    
    // FORCE RUN: If no articles created today, always generate one
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastRunDate = lastRun ? new Date(lastRun) : null;
    const lastRunWasToday = lastRunDate && lastRunDate >= today;
    
    // Only skip if we ran recently AND we ran today
    if (lastRun && lastRunWasToday && (now.getTime() - lastRun.getTime()) < minTimeBetweenRuns) {
      console.log(`[Scheduler] Not enough time since last run (${Math.round((now.getTime() - lastRun.getTime()) / 60000)} min ago), skipping`);
      return;
    }
    
    // If last run was NOT today, force generate regardless of time
    if (!lastRunWasToday) {
      console.log("[Scheduler] No articles generated today - forcing generation");
    }

    console.log("[Scheduler] Running scheduled content generation...");
    
    const success = await createScheduledArticle();
    
    if (success) {
      // Update last run time and calculate next run
      const nextRun = new Date(now.getTime() + minTimeBetweenRuns);
      await db.update(schedulerConfig)
        .set({
          lastRunAt: now,
          nextRunAt: nextRun,
        })
        .where(eq(schedulerConfig.name, "content_generator"));
      
      console.log(`[Scheduler] Next run scheduled for: ${nextRun.toISOString()}`);
    }
  } catch (error) {
    console.error("[Scheduler] Error in scheduled generation:", error);
  }
}

export async function initializeScheduler(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Scheduler] Cannot initialize: database not available");
    return;
  }

  try {
    // Create default config if it doesn't exist
    const [existing] = await db.select().from(schedulerConfig).where(eq(schedulerConfig.name, "content_generator")).limit(1);
    
    if (!existing) {
      await db.insert(schedulerConfig).values({
        name: "content_generator",
        enabled: true,
        articlesPerDay: 2,
        topics: JSON.stringify(CONTENT_TOPICS.map(t => t.category)),
      });
      console.log("[Scheduler] Created default scheduler configuration");
    }

    // Start the scheduler interval (check every hour)
    if (schedulerInterval) {
      clearInterval(schedulerInterval);
    }
    
    // Check every 30 minutes for more responsive article generation
    schedulerInterval = setInterval(runScheduledGeneration, 30 * 60 * 1000); // Every 30 minutes
    console.log("[Scheduler] Scheduler initialized, checking every 30 minutes");

    // Initialize email drip campaign
    try {
      await initializeWelcomeSequence();
      console.log("[Scheduler] Email drip campaign initialized");
    } catch (error) {
      console.warn("[Scheduler] Failed to initialize email drip:", error);
    }

    // Start email queue processor (check every 15 minutes)
    setInterval(async () => {
      try {
        const sent = await processEmailQueue();
        if (sent > 0) {
          console.log(`[Scheduler] Processed ${sent} emails from queue`);
        }
      } catch (error) {
        console.warn("[Scheduler] Email queue processing error:", error);
      }
    }, 15 * 60 * 1000); // Every 15 minutes

    // Run immediately on startup
    await runScheduledGeneration();
  } catch (error) {
    console.error("[Scheduler] Error initializing scheduler:", error);
  }
}

export async function getSchedulerStatus(): Promise<{
  enabled: boolean;
  articlesPerDay: number;
  lastRunAt: Date | null;
  nextRunAt: Date | null;
  topics: string[];
}> {
  const db = await getDb();
  if (!db) {
    return {
      enabled: false,
      articlesPerDay: 0,
      lastRunAt: null,
      nextRunAt: null,
      topics: [],
    };
  }

  const [config] = await db.select().from(schedulerConfig).where(eq(schedulerConfig.name, "content_generator")).limit(1);
  
  if (!config) {
    return {
      enabled: false,
      articlesPerDay: 0,
      lastRunAt: null,
      nextRunAt: null,
      topics: [],
    };
  }

  return {
    enabled: config.enabled,
    articlesPerDay: config.articlesPerDay,
    lastRunAt: config.lastRunAt,
    nextRunAt: config.nextRunAt,
    topics: config.topics ? JSON.parse(config.topics) : [],
  };
}

export async function updateSchedulerConfig(updates: {
  enabled?: boolean;
  articlesPerDay?: number;
}): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    // Validate and clamp articlesPerDay
    const validatedUpdates = { ...updates };
    if (validatedUpdates.articlesPerDay !== undefined) {
      validatedUpdates.articlesPerDay = Math.max(1, Math.min(10, validatedUpdates.articlesPerDay));
    }

    await db.update(schedulerConfig)
      .set(validatedUpdates)
      .where(eq(schedulerConfig.name, "content_generator"));
    return true;
  } catch (error) {
    console.error("[Scheduler] Error updating config:", error);
    return false;
  }
}

export async function triggerManualGeneration(): Promise<boolean> {
  console.log("[Scheduler] Manual generation triggered");
  return await createScheduledArticle();
}

export { runScheduledGeneration };
