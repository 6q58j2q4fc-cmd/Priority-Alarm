/**
 * Marketing Admin Dashboard
 * Tracks leads, articles, bot activity, and marketing performance
 */

import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import {
  Users,
  FileText,
  Eye,
  MousePointer,
  Bot,
  TrendingUp,
  Activity,
  Zap,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading, refetch: refetchDashboard } = trpc.dashboard.getData.useQuery();
  const { data: leads, isLoading: leadsLoading, refetch: refetchLeads } = trpc.leads.list.useQuery();
  const { data: articles, isLoading: articlesLoading, refetch: refetchArticles } = trpc.articles.listAll.useQuery();

  // Mutations
  const generateContent = trpc.bot.generateContent.useMutation({
    onSuccess: () => {
      toast.success("Article generated successfully!");
      refetchArticles();
      refetchDashboard();
    },
    onError: (error) => {
      toast.error(`Failed to generate content: ${error.message}`);
    },
  });

  const runSeoOptimization = trpc.bot.runSeoOptimization.useMutation({
    onSuccess: (data) => {
      toast.success(`SEO optimization complete! ${data.keywordsOptimized} keywords optimized.`);
      refetchDashboard();
    },
    onError: (error) => {
      toast.error(`SEO optimization failed: ${error.message}`);
    },
  });

  const analyzeTrends = trpc.bot.analyzeTrends.useMutation({
    onSuccess: (data) => {
      toast.success(`Trend analysis complete! Found ${data.trends.length} market trends.`);
      refetchDashboard();
    },
    onError: (error) => {
      toast.error(`Trend analysis failed: ${error.message}`);
    },
  });

  const updateLeadStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Lead status updated!");
      refetchLeads();
      refetchDashboard();
    },
  });

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container py-20">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>Please log in to access the marketing dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={getLoginUrl()}>
                <Button className="w-full bg-amber text-timber hover:bg-amber/90">
                  Log In
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      await generateContent.mutateAsync({});
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSeoOptimization = async () => {
    setIsOptimizing(true);
    try {
      await runSeoOptimization.mutateAsync();
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleAnalyzeTrends = async () => {
    setIsAnalyzing(true);
    try {
      await analyzeTrends.mutateAsync();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stats = dashboardData?.stats || { totalLeads: 0, newLeads: 0, totalArticles: 0, publishedArticles: 0, totalViews: 0, totalClicks: 0 };
  const botStats = dashboardData?.botStats || { totalActivities: 0, articlesGenerated: 0, leadsGenerated: 0, completedTasks: 0, failedTasks: 0 };
  const metrics = dashboardData?.metrics || { totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalReach: 0 };
  const recentActivities = dashboardData?.recentActivities || [];
  const topKeywords = dashboardData?.topKeywords || [];

  return (
    <div className="min-h-screen bg-stone">
      <Header />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-timber mb-2">
            Marketing Dashboard
          </h1>
          <p className="font-body text-muted-foreground">
            Track leads, manage content, and monitor your AI marketing bot's performance.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Total Leads</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{stats.totalLeads}</div>
              {stats.newLeads > 0 && (
                <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                  {stats.newLeads} new
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Articles</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{stats.totalArticles}</div>
              <span className="text-xs text-muted-foreground">{stats.publishedArticles} published</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Total Views</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{stats.totalViews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">CTA Clicks</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{stats.totalClicks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Bot Tasks</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{botStats.totalActivities || 0}</div>
              <span className="text-xs text-muted-foreground">{botStats.completedTasks || 0} completed</span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-amber" />
                <span className="text-sm text-muted-foreground">Reach</span>
              </div>
              <div className="font-display text-2xl font-semibold text-timber">{metrics.totalReach || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bot Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber" />
              AI Marketing Bot Controls
            </CardTitle>
            <CardDescription>
              Trigger automated marketing tasks to generate content, optimize SEO, and analyze trends.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="bg-amber text-timber hover:bg-amber/90"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Article
                  </>
                )}
              </Button>

              <Button
                onClick={handleSeoOptimization}
                disabled={isOptimizing}
                variant="outline"
                className="border-timber text-timber hover:bg-timber/10"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Run SEO Optimization
                  </>
                )}
              </Button>

              <Button
                onClick={handleAnalyzeTrends}
                disabled={isAnalyzing}
                variant="outline"
                className="border-timber text-timber hover:bg-timber/10"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyze Trends
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  refetchDashboard();
                  refetchLeads();
                  refetchArticles();
                  toast.success("Dashboard refreshed!");
                }}
                variant="ghost"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="bot">Bot Activity</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>View and manage all incoming leads from the website.</CardDescription>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="text-center py-8">Loading leads...</div>
                ) : leads && leads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-body font-semibold">Name</th>
                          <th className="text-left p-2 font-body font-semibold">Email</th>
                          <th className="text-left p-2 font-body font-semibold">Phone</th>
                          <th className="text-left p-2 font-body font-semibold">Neighborhood</th>
                          <th className="text-left p-2 font-body font-semibold">Status</th>
                          <th className="text-left p-2 font-body font-semibold">Date</th>
                          <th className="text-left p-2 font-body font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b hover:bg-stone/50">
                            <td className="p-2">{lead.firstName} {lead.lastName}</td>
                            <td className="p-2">
                              <a href={`mailto:${lead.email}`} className="text-amber hover:underline">
                                {lead.email}
                              </a>
                            </td>
                            <td className="p-2">
                              {lead.phone ? (
                                <a href={`tel:${lead.phone}`} className="text-amber hover:underline">
                                  {lead.phone}
                                </a>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="p-2">{lead.neighborhood || "-"}</td>
                            <td className="p-2">
                              <Badge
                                variant={
                                  lead.status === "new" ? "default" :
                                  lead.status === "contacted" ? "secondary" :
                                  lead.status === "qualified" ? "outline" :
                                  lead.status === "converted" ? "default" : "secondary"
                                }
                                className={
                                  lead.status === "new" ? "bg-blue-100 text-blue-800" :
                                  lead.status === "contacted" ? "bg-yellow-100 text-yellow-800" :
                                  lead.status === "qualified" ? "bg-purple-100 text-purple-800" :
                                  lead.status === "converted" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }
                              >
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm text-muted-foreground">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-2">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus.mutate({ id: lead.id, status: e.target.value as any })}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No leads yet. Leads will appear here when visitors submit the contact form.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <CardTitle>Article Management</CardTitle>
                <CardDescription>View all generated and published articles.</CardDescription>
              </CardHeader>
              <CardContent>
                {articlesLoading ? (
                  <div className="text-center py-8">Loading articles...</div>
                ) : articles && articles.length > 0 ? (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4 hover:bg-stone/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display font-semibold text-timber">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {article.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <MousePointer className="w-3 h-3" /> {article.clicks} clicks
                              </span>
                              <span className="text-muted-foreground">
                                {article.category}
                              </span>
                            </div>
                          </div>
                          <Badge
                            className={
                              article.status === "published" ? "bg-green-100 text-green-800" :
                              article.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {article.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No articles yet. Click "Generate Article" to create SEO-optimized content.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bot Activity Tab */}
          <TabsContent value="bot">
            <Card>
              <CardHeader>
                <CardTitle>Bot Activity Log</CardTitle>
                <CardDescription>Real-time tracking of the AI marketing bot's actions.</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivities && recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 border-b pb-3">
                        <div className={`p-2 rounded-full ${
                          activity.status === "completed" ? "bg-green-100" :
                          activity.status === "failed" ? "bg-red-100" :
                          activity.status === "in_progress" ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {activity.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : activity.status === "failed" ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : activity.status === "in_progress" ? (
                            <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium text-timber capitalize">
                              {activity.activityType.replace(/_/g, " ")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          {(activity.articlesGenerated ?? 0) > 0 && (
                            <Badge variant="outline" className="mt-1">
                              {activity.articlesGenerated} article(s) generated
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No bot activity yet. Use the controls above to trigger marketing tasks.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Keywords</CardTitle>
                <CardDescription>Keywords optimized by the bot for maximum SEO impact.</CardDescription>
              </CardHeader>
              <CardContent>
                {topKeywords && topKeywords.length > 0 ? (
                  <div className="space-y-3">
                    {topKeywords.map((kw, index) => (
                      <div key={kw.id} className="flex items-center gap-4">
                        <span className="font-display text-2xl font-semibold text-amber w-8">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-timber">{kw.key}</div>
                          <div className="w-full bg-stone rounded-full h-2 mt-1">
                            <div
                              className="bg-amber h-2 rounded-full"
                              style={{ width: `${kw.score}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-display font-semibold text-timber">
                          {kw.score}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No keywords optimized yet. Run "SEO Optimization" to analyze and optimize keywords.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
