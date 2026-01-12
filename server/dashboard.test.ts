import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Dashboard Router", () => {
  describe("dashboard.getStats", () => {
    it("returns dashboard statistics for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.dashboard.getStats();

      expect(result).toHaveProperty("totalLeads");
      expect(result).toHaveProperty("newLeads");
      expect(result).toHaveProperty("totalArticles");
      expect(result).toHaveProperty("publishedArticles");
      expect(result).toHaveProperty("totalViews");
      expect(result).toHaveProperty("totalClicks");
    });
  });

  describe("dashboard.getData", () => {
    it("returns comprehensive dashboard data for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.dashboard.getData();

      expect(result).toHaveProperty("stats");
      expect(result).toHaveProperty("botStats");
      expect(result).toHaveProperty("metrics");
      expect(result).toHaveProperty("recentActivities");
      expect(result).toHaveProperty("topKeywords");
    });
  });
});

describe("Bot Router", () => {
  describe("bot.getStats", () => {
    it("returns bot statistics for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bot.getStats();

      expect(result).toHaveProperty("totalActivities");
      expect(result).toHaveProperty("articlesGenerated");
      expect(result).toHaveProperty("leadsGenerated");
      expect(result).toHaveProperty("completedTasks");
      expect(result).toHaveProperty("failedTasks");
    });
  });

  describe("bot.getActivities", () => {
    it("returns bot activities for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bot.getActivities({ limit: 10 });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("bot.getTopKeywords", () => {
    it("returns top keywords for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bot.getTopKeywords({ limit: 5 });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("bot.runSeoOptimization", () => {
    it("runs SEO optimization and returns results", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bot.runSeoOptimization();

      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("keywordsOptimized");
      expect(result.keywordsOptimized).toBeGreaterThan(0);
    });
  });

  describe("bot.analyzeTrends", () => {
    it("analyzes trends and returns results", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bot.analyzeTrends();

      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("trends");
      expect(Array.isArray(result.trends)).toBe(true);
      expect(result.trends.length).toBeGreaterThan(0);
    });
  });
});

describe("Articles Router", () => {
  describe("articles.list", () => {
    it("returns published articles for public users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.articles.list({ limit: 5 });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("articles.listAll", () => {
    it("returns all articles for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.articles.listAll();

      expect(Array.isArray(result)).toBe(true);
    });
  });
});

describe("Marketing Router", () => {
  describe("marketing.getMetrics", () => {
    it("returns aggregated metrics for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.marketing.getMetrics();

      expect(result).toHaveProperty("totalImpressions");
      expect(result).toHaveProperty("totalClicks");
      expect(result).toHaveProperty("totalConversions");
      expect(result).toHaveProperty("totalReach");
    });
  });
});
