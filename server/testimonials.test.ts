import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", async () => {
  const actual = await vi.importActual("./db");
  return {
    ...actual,
    createTestimonial: vi.fn().mockResolvedValue(undefined),
    getApprovedTestimonials: vi.fn().mockResolvedValue([
      {
        id: 1,
        clientName: "John Smith",
        clientEmail: "john@example.com",
        location: "Brasada Ranch",
        projectType: "Custom Home",
        rating: 5,
        testimonial: "Kevin built our dream home. Exceptional quality and attention to detail.",
        status: "approved",
        featured: true,
        createdAt: new Date(),
        approvedAt: new Date(),
      },
    ]),
    getFeaturedTestimonials: vi.fn().mockResolvedValue([
      {
        id: 1,
        clientName: "John Smith",
        location: "Brasada Ranch",
        rating: 5,
        testimonial: "Kevin built our dream home.",
        status: "approved",
        featured: true,
      },
    ]),
    getAllTestimonials: vi.fn().mockResolvedValue([
      {
        id: 1,
        clientName: "John Smith",
        status: "approved",
        featured: true,
      },
      {
        id: 2,
        clientName: "Jane Doe",
        status: "pending",
        featured: false,
      },
    ]),
    getPendingTestimonials: vi.fn().mockResolvedValue([
      {
        id: 2,
        clientName: "Jane Doe",
        status: "pending",
        featured: false,
      },
    ]),
    updateTestimonialStatus: vi.fn().mockResolvedValue(undefined),
    deleteTestimonial: vi.fn().mockResolvedValue(undefined),
  };
});

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

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
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

describe("testimonials router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("submit (public)", () => {
    it("should submit a new testimonial successfully", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.submit({
        clientName: "Test Client",
        clientEmail: "test@example.com",
        location: "Tetherow",
        projectType: "Custom Home",
        rating: 5,
        testimonial: "Amazing experience working with Kevin Rea!",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("Thank you");
    });

    it("should submit testimonial without optional fields", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.submit({
        clientName: "Simple Client",
        rating: 4,
        testimonial: "Great builder, highly recommend!",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("getApproved (public)", () => {
    it("should return approved testimonials", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getApproved();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].status).toBe("approved");
    });
  });

  describe("getFeatured (public)", () => {
    it("should return featured testimonials", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getFeatured();

      expect(Array.isArray(result)).toBe(true);
      expect(result[0].featured).toBe(true);
    });

    it("should accept limit parameter", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getFeatured({ limit: 5 });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getAll (protected)", () => {
    it("should return all testimonials for admin", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });
  });

  describe("getPending (protected)", () => {
    it("should return pending testimonials for admin", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getPending();

      expect(Array.isArray(result)).toBe(true);
      expect(result[0].status).toBe("pending");
    });
  });

  describe("updateStatus (protected)", () => {
    it("should update testimonial status", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.updateStatus({
        id: 2,
        status: "approved",
        featured: true,
      });

      expect(result.success).toBe(true);
    });
  });

  describe("delete (protected)", () => {
    it("should delete a testimonial", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.delete({ id: 2 });

      expect(result.success).toBe(true);
    });
  });
});
