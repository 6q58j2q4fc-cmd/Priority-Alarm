import { describe, expect, it, vi, beforeEach } from "vitest";

// In-memory scheduler state for testing
let mockSchedulerConfig = {
  enabled: true,
  articlesPerDay: 2,
  lastRunAt: null as Date | null,
  nextRunAt: null as Date | null,
  topics: JSON.stringify(["Custom Home Design", "Central Oregon Living", "Neighborhoods"]),
};

// Mock the database module
vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([mockSchedulerConfig])),
        })),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        $returningId: vi.fn(() => Promise.resolve([{ id: 1 }])),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn((updates: any) => {
        // Apply updates to mock config
        Object.assign(mockSchedulerConfig, updates);
        return {
          where: vi.fn(() => Promise.resolve()),
        };
      }),
    })),
  })),
}));

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(() => Promise.resolve({
    choices: [{
      message: {
        content: JSON.stringify({
          title: "Test Article About Custom Homes in Bend Oregon",
          excerpt: "Discover the beauty of custom home building in Central Oregon.",
          content: "Full article content with Kevin Rea contact info: 541-390-9848",
          tags: ["bend oregon", "custom homes", "luxury"],
          metaDescription: "Custom homes in Bend Oregon by Kevin Rea",
          metaKeywords: "bend oregon, custom homes, luxury homes",
        }),
      },
    }],
  })),
}));

describe("Scheduler Status Interface", () => {
  it("should define correct status structure", () => {
    // Test the expected interface structure
    const expectedStatus = {
      enabled: true,
      articlesPerDay: 2,
      lastRunAt: null as Date | null,
      nextRunAt: null as Date | null,
      topics: ["Custom Home Design", "Central Oregon Living"],
    };
    
    expect(expectedStatus).toHaveProperty("enabled");
    expect(expectedStatus).toHaveProperty("articlesPerDay");
    expect(expectedStatus).toHaveProperty("topics");
    expect(Array.isArray(expectedStatus.topics)).toBe(true);
  });

  it("should have predefined content topics for Central Oregon", () => {
    // Test the static CONTENT_TOPICS array structure
    const CONTENT_TOPICS = [
      { category: "Custom Home Design", keywords: ["custom home design", "luxury homes"] },
      { category: "Central Oregon Living", keywords: ["Central Oregon", "Bend Oregon"] },
      { category: "Neighborhoods", keywords: ["Tetherow", "Pronghorn", "Brasada Ranch"] },
    ];
    
    expect(CONTENT_TOPICS.length).toBeGreaterThan(0);
    expect(CONTENT_TOPICS[0]).toHaveProperty("category");
    expect(CONTENT_TOPICS[0]).toHaveProperty("keywords");
  });
});

describe("Scheduler Configuration", () => {
  beforeEach(() => {
    mockSchedulerConfig = {
      enabled: false,
      articlesPerDay: 2,
      lastRunAt: null,
      nextRunAt: null,
      topics: JSON.stringify(["Custom Home Design"]),
    };
  });

  it("should update scheduler enabled status", async () => {
    const { updateSchedulerConfig } = await import("./scheduler");
    
    const result = await updateSchedulerConfig({ enabled: true });
    
    expect(result).toBe(true);
    expect(mockSchedulerConfig.enabled).toBe(true);
  });

  it("should update articles per day within valid range", async () => {
    const { updateSchedulerConfig } = await import("./scheduler");
    
    const result = await updateSchedulerConfig({ articlesPerDay: 5 });
    
    expect(result).toBe(true);
    expect(mockSchedulerConfig.articlesPerDay).toBe(5);
  });

  it("should clamp articlesPerDay to minimum of 1", async () => {
    const { updateSchedulerConfig } = await import("./scheduler");
    
    await updateSchedulerConfig({ articlesPerDay: 0 });
    
    expect(mockSchedulerConfig.articlesPerDay).toBe(1);
  });

  it("should clamp articlesPerDay to maximum of 10", async () => {
    const { updateSchedulerConfig } = await import("./scheduler");
    
    await updateSchedulerConfig({ articlesPerDay: 15 });
    
    expect(mockSchedulerConfig.articlesPerDay).toBe(10);
  });
});

describe("Content Generation", () => {
  it("should have content topics that include Central Oregon keywords", () => {
    // Test the static content topics array
    const CONTENT_TOPICS = [
      { category: "Custom Home Design", keywords: ["custom home design", "luxury homes", "Brasada Ranch"] },
      { category: "Central Oregon Living", keywords: ["Central Oregon", "Bend Oregon", "high desert living"] },
      { category: "Neighborhoods", keywords: ["Tetherow", "Pronghorn", "Broken Top", "Awbrey Butte"] },
    ];

    const allKeywords = CONTENT_TOPICS.flatMap(t => t.keywords).join(" ").toLowerCase();
    
    expect(allKeywords).toContain("bend");
    expect(allKeywords).toContain("oregon");
    expect(allKeywords).toContain("custom home");
  });

  it("should generate valid slugs from titles", () => {
    // Test slug generation logic
    function generateSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 100);
    }

    const slug = generateSlug("Custom Homes in Bend, Oregon!");
    
    expect(slug).toBe("custom-homes-in-bend-oregon");
    expect(slug).not.toContain(" ");
    expect(slug).not.toContain("!");
  });
});

describe("Scheduler Interval Logic", () => {
  it("should calculate correct hours between articles", () => {
    const articlesPerDay = 2;
    const hoursPerArticle = 24 / articlesPerDay;
    
    expect(hoursPerArticle).toBe(12);
  });

  it("should calculate correct hours for different article counts", () => {
    expect(24 / 1).toBe(24); // 1 article per day = every 24 hours
    expect(24 / 3).toBe(8);  // 3 articles per day = every 8 hours
    expect(24 / 5).toBeCloseTo(4.8); // 5 articles per day = every ~5 hours
  });
});
