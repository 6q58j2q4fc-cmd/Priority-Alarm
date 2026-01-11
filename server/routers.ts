import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, getLeads, getLeadById, updateLeadStatus, markLeadNotified, createSubscriber, getSubscribers } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Lead management
  leads: router({
    // Submit a new lead (public - from contact forms)
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        neighborhood: z.string().optional(),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        message: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Create the lead in the database
        await createLead({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone || null,
          neighborhood: input.neighborhood || null,
          budget: input.budget || null,
          timeline: input.timeline || null,
          message: input.message || null,
          source: input.source || "website",
        });

        // Send notification to Kevin Rea
        const notificationTitle = `🏠 New Lead: ${input.firstName} ${input.lastName}`;
        const notificationContent = `
**New Custom Home Lead Received**

**Contact Information:**
- Name: ${input.firstName} ${input.lastName}
- Email: ${input.email}
- Phone: ${input.phone || "Not provided"}

**Project Details:**
- Neighborhood: ${input.neighborhood || "Not specified"}
- Budget: ${input.budget || "Not specified"}
- Timeline: ${input.timeline || "Not specified"}

**Message:**
${input.message || "No message provided"}

---
*This lead was submitted through the Rea Co Homes website.*
*Contact Kevin directly: 541-390-9848 | kevin@reacohomes.com*
        `.trim();

        try {
          await notifyOwner({
            title: notificationTitle,
            content: notificationContent,
          });
        } catch (error) {
          console.error("[Leads] Failed to send notification:", error);
          // Don't fail the lead submission if notification fails
        }

        return { success: true, message: "Thank you for your interest! Kevin will contact you soon." };
      }),

    // Get all leads (protected - admin only)
    list: protectedProcedure.query(async () => {
      return await getLeads();
    }),

    // Get a single lead by ID (protected)
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getLeadById(input.id);
      }),

    // Update lead status (protected)
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Newsletter subscription
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Valid email is required"),
      }))
      .mutation(async ({ input }) => {
        const result = await createSubscriber({ email: input.email });
        return { success: true, message: result.message || "Successfully subscribed to the newsletter!" };
      }),

    // Get all subscribers (protected - admin only)
    list: protectedProcedure.query(async () => {
      return await getSubscribers();
    }),
  }),
});

export type AppRouter = typeof appRouter;
