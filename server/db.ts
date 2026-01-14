import { eq, desc, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  InsertLead, leads, 
  InsertSubscriber, subscribers,
  InsertArticle, articles,
  InsertMarketingMetric, marketingMetrics,
  InsertBotActivityLog, botActivityLog,
  InsertBotLearningState, botLearningState,
  InsertDistributionQueue, distributionQueue,
  InsertTestimonial, testimonials
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Lead management functions
export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(leads).values(lead);
  return result;
}

export async function getLeads() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "qualified" | "converted" | "closed") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

export async function markLeadNotified(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(leads).set({ notificationSent: true }).where(eq(leads.id, id));
}

// Subscriber management functions
export async function createSubscriber(subscriber: InsertSubscriber) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(subscribers).values(subscriber);
    // Get the inserted ID
    const insertId = Number(result[0].insertId);
    return { success: true, subscriberId: insertId, isNew: true };
  } catch (error: unknown) {
    // Check for duplicate email
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      // Get existing subscriber ID
      const [existing] = await db.select().from(subscribers).where(eq(subscribers.email, subscriber.email)).limit(1);
      return { success: true, message: "Already subscribed", subscriberId: existing?.id, isNew: false };
    }
    throw error;
  }
}

export async function getSubscribers() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(subscribers).where(eq(subscribers.active, true));
}

// Article management functions
export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(articles).values(article);
  return result;
}

export async function getArticles(limit?: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  const query = db.select().from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt));
  
  if (limit) {
    return await query.limit(limit);
  }
  return await query;
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateArticle(id: number, data: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(articles).set(data).where(eq(articles.id, id));
}

export async function incrementArticleViews(id: number) {
  const db = await getDb();
  if (!db) {
    return;
  }

  await db.update(articles).set({ views: sql`${articles.views} + 1` }).where(eq(articles.id, id));
}

export async function incrementArticleClicks(id: number) {
  const db = await getDb();
  if (!db) {
    return;
  }

  await db.update(articles).set({ clicks: sql`${articles.clicks} + 1` }).where(eq(articles.id, id));
}

export async function getAllArticles() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(articles).orderBy(desc(articles.createdAt));
}

// Marketing metrics functions
export async function createMarketingMetric(metric: InsertMarketingMetric) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(marketingMetrics).values(metric);
}

export async function getMarketingMetrics(articleId?: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  if (articleId) {
    return await db.select().from(marketingMetrics)
      .where(eq(marketingMetrics.articleId, articleId))
      .orderBy(desc(marketingMetrics.createdAt));
  }
  
  return await db.select().from(marketingMetrics).orderBy(desc(marketingMetrics.createdAt));
}

export async function getAggregatedMetrics() {
  const db = await getDb();
  if (!db) {
    return { totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalReach: 0 };
  }

  const result = await db.select({
    totalImpressions: sql<number>`SUM(${marketingMetrics.impressions})`,
    totalClicks: sql<number>`SUM(${marketingMetrics.clicks})`,
    totalConversions: sql<number>`SUM(${marketingMetrics.conversions})`,
    totalReach: sql<number>`SUM(${marketingMetrics.reach})`,
  }).from(marketingMetrics);

  return result[0] || { totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalReach: 0 };
}

// Bot activity log functions
export async function createBotActivity(activity: InsertBotActivityLog) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(botActivityLog).values(activity);
  return result;
}

export async function getBotActivities(limit?: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  const query = db.select().from(botActivityLog).orderBy(desc(botActivityLog.createdAt));
  
  if (limit) {
    return await query.limit(limit);
  }
  return await query;
}

export async function updateBotActivity(id: number, data: Partial<InsertBotActivityLog>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(botActivityLog).set(data).where(eq(botActivityLog.id, id));
}

export async function getBotStats() {
  const db = await getDb();
  if (!db) {
    return { 
      totalActivities: 0, 
      articlesGenerated: 0, 
      leadsGenerated: 0,
      completedTasks: 0,
      failedTasks: 0
    };
  }

  const result = await db.select({
    totalActivities: sql<number>`COUNT(*)`,
    articlesGenerated: sql<number>`SUM(${botActivityLog.articlesGenerated})`,
    leadsGenerated: sql<number>`SUM(${botActivityLog.leadsGenerated})`,
    completedTasks: sql<number>`SUM(CASE WHEN ${botActivityLog.status} = 'completed' THEN 1 ELSE 0 END)`,
    failedTasks: sql<number>`SUM(CASE WHEN ${botActivityLog.status} = 'failed' THEN 1 ELSE 0 END)`,
  }).from(botActivityLog);

  return result[0] || { totalActivities: 0, articlesGenerated: 0, leadsGenerated: 0, completedTasks: 0, failedTasks: 0 };
}

// Bot learning state functions
export async function upsertBotLearning(category: string, key: string, value: string, score?: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(botLearningState).values({ category, key, value, score: score || 0 })
    .onDuplicateKeyUpdate({ set: { value, score: score || 0 } });
}

export async function getBotLearningByCategory(category: string) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(botLearningState)
    .where(eq(botLearningState.category, category))
    .orderBy(desc(botLearningState.score));
}

export async function getTopPerformingKeywords(limit: number = 10) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(botLearningState)
    .where(eq(botLearningState.category, "keywords"))
    .orderBy(desc(botLearningState.score))
    .limit(limit);
}

// Distribution queue functions
export async function addToDistributionQueue(item: InsertDistributionQueue) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(distributionQueue).values(item);
}

export async function getPendingDistributions() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(distributionQueue)
    .where(eq(distributionQueue.status, "pending"))
    .orderBy(distributionQueue.scheduledFor);
}

export async function updateDistributionStatus(
  id: number, 
  status: "pending" | "processing" | "completed" | "failed",
  result?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updateData: Partial<InsertDistributionQueue> = { status };
  if (status === "completed" || status === "failed") {
    updateData.processedAt = new Date();
  }
  if (result) {
    updateData.result = result;
  }

  await db.update(distributionQueue).set(updateData).where(eq(distributionQueue.id, id));
}

// Dashboard statistics
export async function getDashboardStats() {
  const db = await getDb();
  if (!db) {
    return {
      totalLeads: 0,
      newLeads: 0,
      totalArticles: 0,
      publishedArticles: 0,
      totalViews: 0,
      totalClicks: 0,
    };
  }

  const leadStats = await db.select({
    total: sql<number>`COUNT(*)`,
    newCount: sql<number>`SUM(CASE WHEN ${leads.status} = 'new' THEN 1 ELSE 0 END)`,
  }).from(leads);

  const articleStats = await db.select({
    total: sql<number>`COUNT(*)`,
    published: sql<number>`SUM(CASE WHEN ${articles.status} = 'published' THEN 1 ELSE 0 END)`,
    totalViews: sql<number>`SUM(${articles.views})`,
    totalClicks: sql<number>`SUM(${articles.clicks})`,
  }).from(articles);

  return {
    totalLeads: leadStats[0]?.total || 0,
    newLeads: leadStats[0]?.newCount || 0,
    totalArticles: articleStats[0]?.total || 0,
    publishedArticles: articleStats[0]?.published || 0,
    totalViews: articleStats[0]?.totalViews || 0,
    totalClicks: articleStats[0]?.totalClicks || 0,
  };
}


// Testimonials functions
export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(testimonials).values(testimonial);
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(testimonials)
    .where(eq(testimonials.status, "approved"))
    .orderBy(desc(testimonials.createdAt));
}

export async function getFeaturedTestimonials(limit: number = 3) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(testimonials)
    .where(and(
      eq(testimonials.status, "approved"),
      eq(testimonials.featured, true)
    ))
    .orderBy(desc(testimonials.createdAt))
    .limit(limit);
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(testimonials)
    .orderBy(desc(testimonials.createdAt));
}

export async function getPendingTestimonials() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(testimonials)
    .where(eq(testimonials.status, "pending"))
    .orderBy(desc(testimonials.createdAt));
}

export async function updateTestimonialStatus(
  id: number, 
  status: "pending" | "approved" | "rejected",
  featured?: boolean
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updateData: Partial<InsertTestimonial> = { status };
  if (status === "approved") {
    updateData.approvedAt = new Date();
  }
  if (featured !== undefined) {
    updateData.featured = featured;
  }

  await db.update(testimonials).set(updateData).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(testimonials).where(eq(testimonials.id, id));
}
