/**
 * Smart Marketing Engine
 * LLM-powered automated marketing, SEO optimization, and lead generation
 */

import { getDb } from "./db";
import { articles, leads } from "../drizzle/schema";
import { eq, desc, sql, and, gte, lte } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// ============================================================================
// SMART KEYWORD OPTIMIZATION
// ============================================================================

interface KeywordAnalysis {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  keywordDensity: Record<string, number>;
  suggestions: string[];
}

/**
 * Analyze content for keyword optimization using LLM
 */
export async function analyzeKeywords(content: string, targetKeywords: string[]): Promise<KeywordAnalysis> {
  const prompt = `Analyze this content for SEO keyword optimization for a custom home builder in Central Oregon.

Target keywords: ${targetKeywords.join(", ")}

Content:
${content.substring(0, 3000)}

Provide a JSON response with:
{
  "primaryKeywords": ["top 3 primary keywords found"],
  "secondaryKeywords": ["5-7 secondary keywords"],
  "longTailKeywords": ["3-5 long-tail keyword phrases"],
  "keywordDensity": {"keyword": density_percentage},
  "suggestions": ["3-5 specific suggestions to improve SEO"]
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an SEO expert specializing in local business optimization for custom home builders." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "keyword_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              primaryKeywords: { type: "array", items: { type: "string" } },
              secondaryKeywords: { type: "array", items: { type: "string" } },
              longTailKeywords: { type: "array", items: { type: "string" } },
              keywordDensity: { type: "object", additionalProperties: { type: "number" } },
              suggestions: { type: "array", items: { type: "string" } }
            },
            required: ["primaryKeywords", "secondaryKeywords", "longTailKeywords", "keywordDensity", "suggestions"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(typeof content === 'string' ? content : JSON.stringify(content) || "{}");
  } catch (error) {
    console.error("[SmartMarketing] Keyword analysis failed:", error);
    return {
      primaryKeywords: targetKeywords.slice(0, 3),
      secondaryKeywords: [],
      longTailKeywords: [],
      keywordDensity: {},
      suggestions: []
    };
  }
}

/**
 * Generate trending topic ideas for blog content
 */
export async function generateTrendingTopics(): Promise<string[]> {
  const prompt = `Generate 5 trending blog topic ideas for a luxury custom home builder in Central Oregon (Bend, Sunriver, Brasada Ranch area).

Focus on topics that:
1. Are currently trending in home building/real estate
2. Have high search volume potential
3. Target affluent buyers looking for custom homes
4. Include local Central Oregon angles

Return as a JSON array of topic titles.`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a content strategist for luxury real estate and custom home building." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "trending_topics",
          strict: true,
          schema: {
            type: "object",
            properties: {
              topics: { type: "array", items: { type: "string" } }
            },
            required: ["topics"],
            additionalProperties: false
          }
        }
      }
    });

    const topicsContent = response.choices[0].message.content;
    const result = JSON.parse(typeof topicsContent === 'string' ? topicsContent : JSON.stringify(topicsContent) || '{"topics":[]}');
    return result.topics || [];
  } catch (error) {
    console.error("[SmartMarketing] Trending topics generation failed:", error);
    return [];
  }
}

// ============================================================================
// LEAD SCORING & QUALIFICATION
// ============================================================================

interface LeadScore {
  score: number; // 0-100
  tier: "hot" | "warm" | "cold";
  factors: string[];
  recommendedAction: string;
}

/**
 * Score a lead using LLM-powered analysis
 */
export async function scoreLead(leadData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  pageViews?: number;
  timeOnSite?: number;
  downloadsCount?: number;
}): Promise<LeadScore> {
  const prompt = `Score this lead for a luxury custom home builder. Analyze the following data:

Name: ${leadData.firstName} ${leadData.lastName}
Email: ${leadData.email}
Phone: ${leadData.phone || "Not provided"}
Message: ${leadData.message || "No message"}
Source: ${leadData.source || "Website"}
Page Views: ${leadData.pageViews || 0}
Time on Site: ${leadData.timeOnSite || 0} seconds
Downloads: ${leadData.downloadsCount || 0}

Score from 0-100 based on:
- Email domain quality (corporate vs free email)
- Phone number provided
- Message quality and intent signals
- Engagement metrics
- Likelihood to build a custom home

Return JSON with score, tier (hot/warm/cold), factors, and recommended action.`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a lead qualification expert for luxury real estate." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "lead_score",
          strict: true,
          schema: {
            type: "object",
            properties: {
              score: { type: "number" },
              tier: { type: "string", enum: ["hot", "warm", "cold"] },
              factors: { type: "array", items: { type: "string" } },
              recommendedAction: { type: "string" }
            },
            required: ["score", "tier", "factors", "recommendedAction"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(typeof content === 'string' ? content : JSON.stringify(content) || '{"score":50,"tier":"warm","factors":[],"recommendedAction":"Follow up within 48 hours"}');
  } catch (error) {
    console.error("[SmartMarketing] Lead scoring failed:", error);
    return {
      score: 50,
      tier: "warm",
      factors: ["Unable to analyze - default score applied"],
      recommendedAction: "Follow up within 48 hours"
    };
  }
}

// ============================================================================
// CONTENT PERSONALIZATION
// ============================================================================

interface VisitorSegment {
  segment: "luxury_buyer" | "first_time_builder" | "investor" | "relocating" | "general";
  interests: string[];
  recommendedContent: string[];
  ctaVariant: string;
}

/**
 * Segment visitor based on behavior and generate personalized recommendations
 */
export async function segmentVisitor(behaviorData: {
  pagesViewed: string[];
  timeOnPages: Record<string, number>;
  referrer?: string;
  searchQuery?: string;
}): Promise<VisitorSegment> {
  const prompt = `Segment this website visitor for a luxury custom home builder based on their behavior:

Pages Viewed: ${behaviorData.pagesViewed.join(", ")}
Time on Pages: ${JSON.stringify(behaviorData.timeOnPages)}
Referrer: ${behaviorData.referrer || "Direct"}
Search Query: ${behaviorData.searchQuery || "None"}

Determine their segment and provide personalized recommendations.`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a marketing personalization expert." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "visitor_segment",
          strict: true,
          schema: {
            type: "object",
            properties: {
              segment: { type: "string", enum: ["luxury_buyer", "first_time_builder", "investor", "relocating", "general"] },
              interests: { type: "array", items: { type: "string" } },
              recommendedContent: { type: "array", items: { type: "string" } },
              ctaVariant: { type: "string" }
            },
            required: ["segment", "interests", "recommendedContent", "ctaVariant"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(typeof content === 'string' ? content : JSON.stringify(content) || '{"segment":"general","interests":[],"recommendedContent":[],"ctaVariant":"default"}');
  } catch (error) {
    console.error("[SmartMarketing] Visitor segmentation failed:", error);
    return {
      segment: "general",
      interests: [],
      recommendedContent: [],
      ctaVariant: "default"
    };
  }
}

// ============================================================================
// VIRAL CONTENT OPTIMIZATION
// ============================================================================

interface ViralScore {
  score: number; // 0-100
  shareability: "high" | "medium" | "low";
  improvements: string[];
  suggestedHeadlines: string[];
  socialHooks: string[];
}

/**
 * Analyze content for viral potential and suggest improvements
 */
export async function analyzeViralPotential(content: {
  title: string;
  excerpt: string;
  body: string;
}): Promise<ViralScore> {
  const prompt = `Analyze this content for viral potential and shareability:

Title: ${content.title}
Excerpt: ${content.excerpt}
Body (first 1000 chars): ${content.body.substring(0, 1000)}

Score the viral potential and provide:
1. Overall score (0-100)
2. Shareability rating
3. Specific improvements to increase sharing
4. 3 alternative headline options optimized for social sharing
5. Social media hooks for different platforms`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are a viral content strategist specializing in real estate and home building content." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "viral_score",
          strict: true,
          schema: {
            type: "object",
            properties: {
              score: { type: "number" },
              shareability: { type: "string", enum: ["high", "medium", "low"] },
              improvements: { type: "array", items: { type: "string" } },
              suggestedHeadlines: { type: "array", items: { type: "string" } },
              socialHooks: { type: "array", items: { type: "string" } }
            },
            required: ["score", "shareability", "improvements", "suggestedHeadlines", "socialHooks"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(typeof content === 'string' ? content : JSON.stringify(content) || '{"score":50,"shareability":"medium","improvements":[],"suggestedHeadlines":[],"socialHooks":[]}');
  } catch (error) {
    console.error("[SmartMarketing] Viral analysis failed:", error);
    return {
      score: 50,
      shareability: "medium",
      improvements: [],
      suggestedHeadlines: [],
      socialHooks: []
    };
  }
}

// ============================================================================
// AUTOMATED MARKETING REPORTS
// ============================================================================

interface MarketingReport {
  period: string;
  totalLeads: number;
  leadsBySource: Record<string, number>;
  hotLeads: number;
  articlesPublished: number;
  topPerformingContent: string[];
  recommendations: string[];
}

/**
 * Generate automated marketing performance report
 */
export async function generateMarketingReport(periodDays: number = 7): Promise<MarketingReport> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - periodDays);

  try {
    // Get leads from the period
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    const recentLeads = await db
      .select()
      .from(leads)
      .where(gte(leads.createdAt, startDate))
      .orderBy(desc(leads.createdAt));

    // Get articles from the period
    const recentArticles = await db
      .select()
      .from(articles)
      .where(and(
        eq(articles.status, "published"),
        gte(articles.publishedAt, startDate)
      ))
      .orderBy(desc(articles.publishedAt));

    // Calculate metrics
    const leadsBySource: Record<string, number> = {};
    let hotLeads = 0;

    for (const lead of recentLeads) {
      const source = lead.source || "website";
      leadsBySource[source] = (leadsBySource[source] || 0) + 1;
      if (lead.status === "qualified" || lead.status === "converted") {
        hotLeads++;
      }
    }

    // Generate LLM recommendations
    const prompt = `Based on these marketing metrics for a custom home builder, provide 3-5 actionable recommendations:

Period: Last ${periodDays} days
Total Leads: ${recentLeads.length}
Hot Leads: ${hotLeads}
Articles Published: ${recentArticles.length}
Lead Sources: ${JSON.stringify(leadsBySource)}

Provide specific, actionable recommendations to improve lead generation and conversion.`;

    let recommendations: string[] = [];
    try {
      const response = await invokeLLM({
        messages: [
          { role: "system", content: "You are a marketing analyst for luxury custom home builders." },
          { role: "user", content: prompt }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "recommendations",
            strict: true,
            schema: {
              type: "object",
              properties: {
                recommendations: { type: "array", items: { type: "string" } }
              },
              required: ["recommendations"],
              additionalProperties: false
            }
          }
        }
      });
      const recsContent = response.choices[0].message.content;
      const result = JSON.parse(typeof recsContent === 'string' ? recsContent : JSON.stringify(recsContent) || '{"recommendations":[]}');
      recommendations = result.recommendations;
    } catch (e) {
      recommendations = ["Continue current content strategy", "Follow up with all new leads within 24 hours"];
    }

    return {
      period: `Last ${periodDays} days`,
      totalLeads: recentLeads.length,
      leadsBySource,
      hotLeads,
      articlesPublished: recentArticles.length,
      topPerformingContent: recentArticles.slice(0, 3).map((a: { title: string }) => a.title),
      recommendations
    };
  } catch (error) {
    console.error("[SmartMarketing] Report generation failed:", error);
    return {
      period: `Last ${periodDays} days`,
      totalLeads: 0,
      leadsBySource: {},
      hotLeads: 0,
      articlesPublished: 0,
      topPerformingContent: [],
      recommendations: ["Unable to generate report - check database connection"]
    };
  }
}

/**
 * Send weekly marketing report to owner
 */
export async function sendWeeklyMarketingReport(): Promise<boolean> {
  try {
    const report = await generateMarketingReport(7);
    
    const content = `
📊 **Weekly Marketing Report**
*${report.period}*

**Lead Generation**
• Total New Leads: ${report.totalLeads}
• Hot Leads: ${report.hotLeads}
• Lead Sources: ${Object.entries(report.leadsBySource).map(([k, v]) => `${k}: ${v}`).join(", ") || "None"}

**Content Performance**
• Articles Published: ${report.articlesPublished}
• Top Content: ${report.topPerformingContent.join(", ") || "None"}

**Recommendations**
${report.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

---
*This report was automatically generated by the Rea Co Homes Smart Marketing Engine.*
    `.trim();

    await notifyOwner({
      title: "📊 Weekly Marketing Report - Rea Co Homes",
      content
    });

    console.log("[SmartMarketing] Weekly report sent successfully");
    return true;
  } catch (error) {
    console.error("[SmartMarketing] Failed to send weekly report:", error);
    return false;
  }
}

// ============================================================================
// REFERRAL TRACKING
// ============================================================================

/**
 * Generate unique referral code for a lead
 */
export function generateReferralCode(leadId: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "REA-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Track referral conversion
 */
export async function trackReferral(referralCode: string, newLeadEmail: string): Promise<boolean> {
  // This would update the database to track the referral
  console.log(`[SmartMarketing] Referral tracked: ${referralCode} -> ${newLeadEmail}`);
  return true;
}

// ============================================================================
// SMART FOLLOW-UP SEQUENCES
// ============================================================================

interface FollowUpEmail {
  subject: string;
  body: string;
  sendAfterDays: number;
  condition: string;
}

/**
 * Generate personalized follow-up email sequence using LLM
 */
export async function generateFollowUpSequence(leadData: {
  firstName: string;
  interests: string[];
  source: string;
}): Promise<FollowUpEmail[]> {
  const prompt = `Create a 5-email follow-up sequence for a potential custom home building client:

Name: ${leadData.firstName}
Interests: ${leadData.interests.join(", ") || "General custom home building"}
Source: ${leadData.source}

Create personalized, non-pushy emails that provide value and build trust. Include:
1. Immediate thank you (Day 0)
2. Value-add content (Day 3)
3. Case study/testimonial (Day 7)
4. Soft check-in (Day 14)
5. Final value offer (Day 30)

Each email should have subject, body, sendAfterDays, and condition.`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an email marketing expert for luxury real estate." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "follow_up_sequence",
          strict: true,
          schema: {
            type: "object",
            properties: {
              emails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    subject: { type: "string" },
                    body: { type: "string" },
                    sendAfterDays: { type: "number" },
                    condition: { type: "string" }
                  },
                  required: ["subject", "body", "sendAfterDays", "condition"],
                  additionalProperties: false
                }
              }
            },
            required: ["emails"],
            additionalProperties: false
          }
        }
      }
    });

    const emailsContent = response.choices[0].message.content;
    const result = JSON.parse(typeof emailsContent === 'string' ? emailsContent : JSON.stringify(emailsContent) || '{"emails":[]}');
    return result.emails;
  } catch (error) {
    console.error("[SmartMarketing] Follow-up sequence generation failed:", error);
    return [];
  }
}

// ============================================================================
// EXPORT ALL FUNCTIONS
// ============================================================================

export const smartMarketing = {
  analyzeKeywords,
  generateTrendingTopics,
  scoreLead,
  segmentVisitor,
  analyzeViralPotential,
  generateMarketingReport,
  sendWeeklyMarketingReport,
  generateReferralCode,
  trackReferral,
  generateFollowUpSequence
};
