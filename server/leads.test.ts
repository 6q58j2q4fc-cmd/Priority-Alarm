import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue({ insertId: 1 }),
  getLeads: vi.fn().mockResolvedValue([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "541-555-0123",
      neighborhood: "Brasada Ranch",
      budget: "$1M - $2M",
      timeline: "Within 6 Months",
      message: "Looking to build a custom home",
      source: "website",
      status: "new",
      notificationSent: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getLeadById: vi.fn().mockResolvedValue({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "new",
  }),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
  markLeadNotified: vi.fn().mockResolvedValue(undefined),
  createSubscriber: vi.fn().mockResolvedValue({ success: true }),
  getSubscribers: vi.fn().mockResolvedValue([]),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

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

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("leads.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully submits a lead with required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });

    expect(result).toEqual({
      success: true,
      message: "Thank you for your interest! Kevin will contact you soon.",
    });
  });

  it("successfully submits a lead with all fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "541-555-0123",
      neighborhood: "Tetherow",
      budget: "$2M - $3M",
      timeline: "Ready to Start",
      message: "Looking to build a modern mountain home",
      source: "contact-page",
    });

    expect(result.success).toBe(true);
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submit({
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submit({
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
      })
    ).rejects.toThrow();
  });
});

describe("leads.list", () => {
  it("returns leads for authenticated users", async () => {
    const ctx = createAuthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("firstName");
    expect(result[0]).toHaveProperty("email");
  });

  it("rejects unauthenticated access to leads list", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.leads.list()).rejects.toThrow();
  });
});

describe("leads.updateStatus", () => {
  it("updates lead status for authenticated users", async () => {
    const ctx = createAuthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.updateStatus({
      id: 1,
      status: "contacted",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects unauthenticated status updates", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.updateStatus({
        id: 1,
        status: "contacted",
      })
    ).rejects.toThrow();
  });
});

describe("newsletter.subscribe", () => {
  it("successfully subscribes with valid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.subscribe({
      email: "subscriber@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });
});
