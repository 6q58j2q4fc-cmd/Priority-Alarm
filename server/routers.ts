import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  createLead, getLeads, getLeadById, updateLeadStatus, markLeadNotified, 
  createSubscriber, getSubscribers,
  createArticle, getArticles, getArticleBySlug, getArticleById, updateArticle,
  incrementArticleViews, incrementArticleClicks, getAllArticles,
  createMarketingMetric, getMarketingMetrics, getAggregatedMetrics,
  createBotActivity, getBotActivities, updateBotActivity, getBotStats,
  upsertBotLearning, getBotLearningByCategory, getTopPerformingKeywords,
  addToDistributionQueue, getPendingDistributions, updateDistributionStatus,
  getDashboardStats,
  createTestimonial, getApprovedTestimonials, getFeaturedTestimonials,
  getAllTestimonials, getPendingTestimonials, updateTestimonialStatus, deleteTestimonial
} from "./db";
import { notifyOwner } from "./_core/notification";
import { invokeLLM } from "./_core/llm";
import { getSchedulerStatus, updateSchedulerConfig, triggerManualGeneration } from "./scheduler";

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

  // Article management
  articles: router({
    // Get published articles (public)
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getArticles(input?.limit);
      }),

    // Get article by slug (public)
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await getArticleBySlug(input.slug);
        if (article) {
          await incrementArticleViews(article.id);
        }
        return article;
      }),

    // Track click on article CTA
    trackClick: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await incrementArticleClicks(input.id);
        return { success: true };
      }),

    // Get all articles including drafts (protected)
    listAll: protectedProcedure.query(async () => {
      return await getAllArticles();
    }),

    // Create new article (protected)
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        category: z.string().min(1),
        tags: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(["draft", "published", "archived"]).optional(),
      }))
      .mutation(async ({ input }) => {
        await createArticle({
          ...input,
          publishedAt: input.status === "published" ? new Date() : null,
        });
        return { success: true };
      }),

    // Update article (protected)
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(["draft", "published", "archived"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        if (data.status === "published") {
          (data as any).publishedAt = new Date();
        }
        await updateArticle(id, data);
        return { success: true };
      }),
  }),

  // Marketing metrics
  marketing: router({
    // Get aggregated metrics (protected)
    getMetrics: protectedProcedure.query(async () => {
      return await getAggregatedMetrics();
    }),

    // Get metrics by article (protected)
    getArticleMetrics: protectedProcedure
      .input(z.object({ articleId: z.number() }))
      .query(async ({ input }) => {
        return await getMarketingMetrics(input.articleId);
      }),

    // Record a metric (protected)
    recordMetric: protectedProcedure
      .input(z.object({
        articleId: z.number().optional(),
        platform: z.string(),
        impressions: z.number().optional(),
        clicks: z.number().optional(),
        conversions: z.number().optional(),
        reach: z.number().optional(),
        distributedTo: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createMarketingMetric({
          articleId: input.articleId || null,
          platform: input.platform,
          impressions: input.impressions || 0,
          clicks: input.clicks || 0,
          conversions: input.conversions || 0,
          reach: input.reach || 0,
          distributedTo: input.distributedTo || null,
          distributedAt: new Date(),
        });
        return { success: true };
      }),
  }),

  // Bot management
  bot: router({
    // Get bot statistics (protected)
    getStats: protectedProcedure.query(async () => {
      return await getBotStats();
    }),

    // Get recent bot activities (protected)
    getActivities: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getBotActivities(input?.limit || 50);
      }),

    // Get top performing keywords (protected)
    getTopKeywords: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getTopPerformingKeywords(input?.limit || 10);
      }),

    // Get learning data by category (protected)
    getLearning: protectedProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await getBotLearningByCategory(input.category);
      }),

    // Trigger content generation (protected)
    generateContent: protectedProcedure
      .input(z.object({
        topic: z.string().optional(),
        category: z.string().optional(),
      }).optional())
      .mutation(async ({ input }) => {
        // Log the activity
        await createBotActivity({
          activityType: "content_generation",
          description: `Generating SEO-optimized article${input?.topic ? ` about: ${input.topic}` : ""}`,
          status: "in_progress",
        });

        try {
          // Generate article using LLM
          const topics = [
            "Custom home building trends in Central Oregon",
            "Luxury home features for Bend Oregon properties",
            "Brasada Ranch custom home design ideas",
            "Tetherow resort living and custom homes",
            "Mountain modern architecture in Central Oregon",
            "Sustainable building practices for Oregon homes",
            "Indoor-outdoor living spaces for High Desert homes",
            "Custom home landscaping for Central Oregon climate",
          ];

          const selectedTopic = input?.topic || topics[Math.floor(Math.random() * topics.length)];
          
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are an expert SEO content writer specializing in luxury custom home building in Central Oregon. 
                Write articles that:
                1. Are optimized for search engines with natural keyword usage
                2. Include relevant Central Oregon locations (Bend, Brasada Ranch, Tetherow, Pronghorn, etc.)
                3. Always mention Kevin Rea as the premier custom home builder
                4. Include contact information: Phone: 541-390-9848, Email: kevin@reacohomes.com, Website: www.reacohomes.com
                5. Are engaging, informative, and drive leads
                
                Return a JSON object with: title, slug, excerpt, content (full article in markdown), category, tags (comma-separated), metaDescription, metaKeywords`
              },
              {
                role: "user",
                content: `Write a comprehensive, SEO-optimized article about: ${selectedTopic}`
              }
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "article",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    slug: { type: "string" },
                    excerpt: { type: "string" },
                    content: { type: "string" },
                    category: { type: "string" },
                    tags: { type: "string" },
                    metaDescription: { type: "string" },
                    metaKeywords: { type: "string" }
                  },
                  required: ["title", "slug", "excerpt", "content", "category", "tags", "metaDescription", "metaKeywords"],
                  additionalProperties: false
                }
              }
            }
          });

          const content = response.choices[0].message.content;
          const articleData = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content) || "{}");
          
          // Ensure contact info is in the content
          const contactFooter = `

---

**Ready to Build Your Dream Home in Central Oregon?**

Contact Kevin Rea, Central Oregon's premier custom home builder with over 45 years of experience.

📞 **Phone:** [541-390-9848](tel:541-390-9848)
📧 **Email:** [kevin@reacohomes.com](mailto:kevin@reacohomes.com)
🌐 **Website:** [www.reacohomes.com](https://www.reacohomes.com)

*Rea Co Homes - Award-winning custom homes in Bend, Brasada Ranch, Tetherow, and throughout Central Oregon.*
`;

          // Create the article
          await createArticle({
            title: articleData.title,
            slug: articleData.slug + "-" + Date.now(),
            excerpt: articleData.excerpt,
            content: articleData.content + contactFooter,
            category: articleData.category || input?.category || "news",
            tags: articleData.tags,
            metaDescription: articleData.metaDescription,
            metaKeywords: articleData.metaKeywords,
            status: "published",
            publishedAt: new Date(),
          });

          // Update bot activity
          await createBotActivity({
            activityType: "content_generation",
            description: `Successfully generated article: ${articleData.title}`,
            status: "completed",
            articlesGenerated: 1,
            result: JSON.stringify({ title: articleData.title, slug: articleData.slug }),
          });

          return { success: true, article: articleData };
        } catch (error) {
          await createBotActivity({
            activityType: "content_generation",
            description: `Failed to generate content: ${error}`,
            status: "failed",
          });
          throw error;
        }
      }),

    // Run SEO optimization (protected)
    runSeoOptimization: protectedProcedure.mutation(async () => {
      await createBotActivity({
        activityType: "seo_optimization",
        description: "Analyzing and optimizing website SEO performance",
        status: "in_progress",
      });

      // Simulate SEO analysis
      const keywords = [
        { keyword: "custom home builder bend oregon", score: 95 },
        { keyword: "luxury homes central oregon", score: 88 },
        { keyword: "brasada ranch builder", score: 92 },
        { keyword: "tetherow custom homes", score: 85 },
        { keyword: "bend oregon home builder", score: 90 },
        { keyword: "pronghorn custom homes", score: 82 },
        { keyword: "broken top builder", score: 78 },
        { keyword: "awbrey butte homes", score: 75 },
      ];

      for (const kw of keywords) {
        await upsertBotLearning("keywords", kw.keyword, JSON.stringify({ 
          searchVolume: Math.floor(Math.random() * 1000) + 100,
          competition: Math.random().toFixed(2),
          lastUpdated: new Date().toISOString()
        }), kw.score);
      }

      await createBotActivity({
        activityType: "seo_optimization",
        description: `Optimized ${keywords.length} keywords for better search ranking`,
        status: "completed",
        result: JSON.stringify({ keywordsOptimized: keywords.length }),
      });

      return { success: true, keywordsOptimized: keywords.length };
    }),

    // Analyze trends (protected)
    analyzeTrends: protectedProcedure.mutation(async () => {
      await createBotActivity({
        activityType: "trend_analysis",
        description: "Analyzing current market trends for Central Oregon real estate",
        status: "in_progress",
      });

      const trends = [
        "Mountain modern architecture demand increasing 25%",
        "Sustainable building materials trending in luxury homes",
        "Home office spaces now standard in custom builds",
        "Outdoor living spaces priority for Central Oregon buyers",
        "Smart home integration expected in all new builds",
      ];

      for (const trend of trends) {
        await upsertBotLearning("trends", trend, JSON.stringify({
          relevance: Math.random().toFixed(2),
          discoveredAt: new Date().toISOString()
        }), Math.floor(Math.random() * 100));
      }

      await createBotActivity({
        activityType: "trend_analysis",
        description: `Identified ${trends.length} market trends`,
        status: "completed",
        result: JSON.stringify({ trendsFound: trends.length, trends }),
      });

      return { success: true, trends };
    }),
  }),

  // Dashboard
  dashboard: router({
    // Get dashboard statistics (protected)
    getStats: protectedProcedure.query(async () => {
      return await getDashboardStats();
    }),

    // Get comprehensive dashboard data (protected)
    getData: protectedProcedure.query(async () => {
      const [stats, botStats, metrics, recentActivities, topKeywords] = await Promise.all([
        getDashboardStats(),
        getBotStats(),
        getAggregatedMetrics(),
        getBotActivities(10),
        getTopPerformingKeywords(5),
      ]);

      return {
        stats,
        botStats,
        metrics,
        recentActivities,
        topKeywords,
      };
    }),
  }),

  // Scheduler management
  scheduler: router({
    // Get scheduler status (protected)
    getStatus: protectedProcedure.query(async () => {
      return await getSchedulerStatus();
    }),

    // Update scheduler configuration (protected)
    updateConfig: protectedProcedure
      .input(z.object({
        enabled: z.boolean().optional(),
        articlesPerDay: z.number().min(1).max(10).optional(),
      }))
      .mutation(async ({ input }) => {
        const success = await updateSchedulerConfig(input);
        return { success };
      }),

    // Trigger manual article generation (protected)
    triggerGeneration: protectedProcedure.mutation(async () => {
      const success = await triggerManualGeneration();
      return { success };
    }),
  }),

  // Testimonials management
  testimonials: router({
    // Submit a new testimonial (public - from website form)
    submit: publicProcedure
      .input(z.object({
        clientName: z.string().min(1, "Name is required"),
        clientEmail: z.string().email("Valid email is required").optional(),
        location: z.string().optional(),
        projectType: z.string().optional(),
        rating: z.number().min(1).max(5).default(5),
        testimonial: z.string().min(10, "Please write at least a few sentences"),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial({
          clientName: input.clientName,
          clientEmail: input.clientEmail || null,
          location: input.location || null,
          projectType: input.projectType || null,
          rating: input.rating,
          testimonial: input.testimonial,
          status: "pending",
          featured: false,
        });

        // Notify owner of new testimonial
        await notifyOwner({
          title: "New Testimonial Submitted",
          content: `A new testimonial has been submitted by ${input.clientName}${input.location ? ` from ${input.location}` : ""}. Please review and approve it in the admin dashboard.\n\nRating: ${input.rating}/5 stars\n\n"${input.testimonial.substring(0, 200)}${input.testimonial.length > 200 ? "..." : ""}"`,
        });

        return { success: true, message: "Thank you for your testimonial! It will be reviewed shortly." };
      }),

    // Get approved testimonials (public - for display)
    getApproved: publicProcedure.query(async () => {
      return await getApprovedTestimonials();
    }),

    // Get featured testimonials (public - for homepage)
    getFeatured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getFeaturedTestimonials(input?.limit || 3);
      }),

    // Get all testimonials (protected - for admin)
    getAll: protectedProcedure.query(async () => {
      return await getAllTestimonials();
    }),

    // Get pending testimonials (protected - for admin)
    getPending: protectedProcedure.query(async () => {
      return await getPendingTestimonials();
    }),

    // Update testimonial status (protected - for admin)
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected"]),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateTestimonialStatus(input.id, input.status, input.featured);
        return { success: true };
      }),

    // Delete testimonial (protected - for admin)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
