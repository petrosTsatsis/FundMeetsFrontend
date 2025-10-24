"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  MessageSquare,
  Search,
  Target,
  Trophy,
  Star,
  Activity,
  Calendar,
  MapPin,
  Building2,
  User
} from "lucide-react";

interface UserAnalyticsData {
  profileViews: {
    totalViews: number;
    uniqueViewers: number;
    averageViewDuration: number;
    demographics: {
      roles: Record<string, number>;
      industries: Record<string, number>;
      locations: Record<string, number>;
    };
    recentViews: Array<{
      id: string;
      viewerId: string;
      createdAt: string;
      duration?: number;
      viewer: {
        role: string;
        startupProfile?: { name: string; industry: string };
        investorProfile?: { name: string; investorType: string };
      };
    }>;
  };
  postAnalytics: {
    totalPosts: number;
    totalViews: number;
    totalInteractions: number;
    averageViewsPerPost: number;
    averageInteractionsPerPost: number;
    topPosts: Array<{
      id: string;
      title: string;
      views: number;
      interactions: number;
      engagement: number;
    }>;
  };
  searchAnalytics: {
    totalSearches: number;
    uniqueQueries: number;
    clickedSearches: number;
    clickThroughRate: number;
    recentSearches: Array<{
      id: string;
      query: string;
      results: number;
      clicked: boolean;
      createdAt: string;
    }>;
  };
  matchAnalytics: {
    totalInterests: number;
    acceptedInterests: number;
    totalMatches: number;
    interestSuccessRate: number;
    matchSuccessRate: number;
  };
  activityMetrics: {
    totalActivities: number;
    recentActivities: number;
    activityTypes: Record<string, number>;
    lastActivity?: string;
  };
}

interface EcosystemBenchmarks {
  userMetrics: {
    profileViews: number;
    totalPostViews: number;
    totalPostInteractions: number;
    profileCompletion: number;
    matchRate: number;
    activityLevel: number;
  };
  ecosystemMetrics: {
    averageProfileViews: number;
    averageMatchRate: number;
    averageProfileCompletion: number;
    averageActivityLevel: number;
  };
  benchmarks: {
    profileViews: { user: number; ecosystem: number; performance: number };
    matchRate: { user: number; ecosystem: number; performance: number };
    profileCompletion: { user: number; ecosystem: number; performance: number };
    activityLevel: { user: number; ecosystem: number; performance: number };
  };
  rankings: {
    profileViews: string;
    matchRate: string;
    profileCompletion: string;
    activityLevel: string;
  };
}

export function UserAnalyticsDashboard({ userId }: { userId: string }) {
  const [analyticsData, setAnalyticsData] = useState<UserAnalyticsData | null>(null);
  const [benchmarks, setBenchmarks] = useState<EcosystemBenchmarks | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAnalyticsData();
  }, [userId]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const analyticsResponse = await apiClient.getUserAnalytics(userId);
      // const benchmarksResponse = await apiClient.getUserBenchmarks(userId);
      
      // Mock data for now
      const mockAnalytics: UserAnalyticsData = {
        profileViews: {
          totalViews: 156,
          uniqueViewers: 89,
          averageViewDuration: 45,
          demographics: {
            roles: { STARTUP: 45, INVESTOR: 44 },
            industries: { FINTECH: 25, HEALTHTECH: 20, AI: 15, SAAS: 12 },
            locations: { "Greece": 30, "Cyprus": 25, "Germany": 15, "UK": 10 }
          },
          recentViews: []
        },
        postAnalytics: {
          totalPosts: 8,
          totalViews: 234,
          totalInteractions: 67,
          averageViewsPerPost: 29.25,
          averageInteractionsPerPost: 8.375,
          topPosts: [
            { id: "1", title: "Our Series A Journey", views: 45, interactions: 12, engagement: 0.27 },
            { id: "2", title: "Building the Future", views: 38, interactions: 8, engagement: 0.21 }
          ]
        },
        searchAnalytics: {
          totalSearches: 23,
          uniqueQueries: 18,
          clickedSearches: 12,
          clickThroughRate: 52.2,
          recentSearches: []
        },
        matchAnalytics: {
          totalInterests: 15,
          acceptedInterests: 8,
          totalMatches: 5,
          interestSuccessRate: 53.3,
          matchSuccessRate: 33.3
        },
        activityMetrics: {
          totalActivities: 45,
          recentActivities: 12,
          activityTypes: { "profile_update": 8, "post_created": 5, "match_accepted": 3 },
          lastActivity: new Date().toISOString()
        }
      };

      const mockBenchmarks: EcosystemBenchmarks = {
        userMetrics: {
          profileViews: 156,
          totalPostViews: 234,
          totalPostInteractions: 67,
          profileCompletion: 85,
          matchRate: 33.3,
          activityLevel: 12
        },
        ecosystemMetrics: {
          averageProfileViews: 89,
          averageMatchRate: 28.5,
          averageProfileCompletion: 72,
          averageActivityLevel: 8
        },
        benchmarks: {
          profileViews: { user: 156, ecosystem: 89, performance: 75.3 },
          matchRate: { user: 33.3, ecosystem: 28.5, performance: 16.8 },
          profileCompletion: { user: 85, ecosystem: 72, performance: 18.1 },
          activityLevel: { user: 12, ecosystem: 8, performance: 50.0 }
        },
        rankings: {
          profileViews: "Top 15%",
          matchRate: "Top 25%",
          profileCompletion: "Top 20%",
          activityLevel: "Top 10%"
        }
      };

      setAnalyticsData(mockAnalytics);
      setBenchmarks(mockBenchmarks);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analyticsData || !benchmarks) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
  const formatNumber = (value: number) => value.toLocaleString();
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance > 20) return "text-green-600";
    if (performance > 0) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceIcon = (performance: number) => {
    if (performance > 0) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  // Prepare chart data
  const industryData = Object.entries(analyticsData.profileViews.demographics.industries)
    .map(([industry, count]) => ({ name: industry, value: count }))
    .sort((a, b) => b.value - a.value);

  const roleData = Object.entries(analyticsData.profileViews.demographics.roles)
    .map(([role, count]) => ({ name: role, value: count }));

  const locationData = Object.entries(analyticsData.profileViews.demographics.locations)
    .map(([location, count]) => ({ name: location, value: count }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your profile performance and engagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.profileViews.totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(analyticsData.profileViews.uniqueViewers)} unique viewers
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-green-600">
                {getPerformanceIcon(benchmarks.benchmarks.profileViews.performance)}
                <span className="ml-1">
                  {formatPercentage(benchmarks.benchmarks.profileViews.performance)}
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">
                vs ecosystem
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Match Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(analyticsData.matchAnalytics.matchSuccessRate)}</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.matchAnalytics.totalMatches} matches from {analyticsData.matchAnalytics.totalInterests} interests
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-green-600">
                {getPerformanceIcon(benchmarks.benchmarks.matchRate.performance)}
                <span className="ml-1">
                  {formatPercentage(benchmarks.benchmarks.matchRate.performance)}
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">
                vs ecosystem
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Engagement</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.postAnalytics.totalInteractions)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(analyticsData.postAnalytics.totalViews)} total views
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline">
                {formatNumber(analyticsData.postAnalytics.averageInteractionsPerPost)} avg per post
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Appearances</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.searchAnalytics.clickedSearches)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(analyticsData.searchAnalytics.clickThroughRate)} click-through rate
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline">
                {formatNumber(analyticsData.searchAnalytics.totalSearches)} total searches
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile Analytics</TabsTrigger>
          <TabsTrigger value="posts">Post Analytics</TabsTrigger>
          <TabsTrigger value="benchmarks">Ecosystem Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Views by Industry */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Views by Industry</CardTitle>
                <CardDescription>Who's viewing your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performing Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Your most engaging content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.postAnalytics.topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-medium text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(post.views)} views • {formatNumber(post.interactions)} interactions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatPercentage(post.engagement * 100)}</p>
                        <p className="text-xs text-muted-foreground">engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Viewer Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Viewer Demographics</CardTitle>
                <CardDescription>Breakdown of your profile viewers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">By Role</h4>
                    <div className="space-y-2">
                      {Object.entries(analyticsData.profileViews.demographics.roles).map(([role, count]) => (
                        <div key={role} className="flex items-center justify-between">
                          <span className="text-sm">{role}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(count / analyticsData.profileViews.totalViews) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">By Location</h4>
                    <div className="space-y-2">
                      {Object.entries(analyticsData.profileViews.demographics.locations).map(([location, count]) => (
                        <div key={location} className="flex items-center justify-between">
                          <span className="text-sm">{location}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(count / analyticsData.profileViews.totalViews) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Performance</CardTitle>
                <CardDescription>Key metrics for your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-muted-foreground">{formatPercentage(benchmarks.userMetrics.profileCompletion)}</span>
                    </div>
                    <Progress value={benchmarks.userMetrics.profileCompletion} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Average View Duration</span>
                      <span className="text-sm text-muted-foreground">{formatDuration(analyticsData.profileViews.averageViewDuration)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Higher duration indicates better engagement
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Unique Viewers</span>
                      <span className="text-sm text-muted-foreground">{formatNumber(analyticsData.profileViews.uniqueViewers)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage((analyticsData.profileViews.uniqueViewers / analyticsData.profileViews.totalViews) * 100)} return rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Post Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Post Performance</CardTitle>
                <CardDescription>Overall engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.postAnalytics.totalPosts)}</div>
                    <div className="text-sm text-muted-foreground">Total Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.postAnalytics.totalViews)}</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.postAnalytics.totalInteractions)}</div>
                    <div className="text-sm text-muted-foreground">Total Interactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.postAnalytics.averageViewsPerPost)}</div>
                    <div className="text-sm text-muted-foreground">Avg Views/Post</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Post Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>How your content performs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Engagement trends will be available once you have more posts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance vs Ecosystem */}
            <Card>
              <CardHeader>
                <CardTitle>Performance vs Ecosystem</CardTitle>
                <CardDescription>How you compare to other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(benchmarks.benchmarks).map(([metric, data]) => (
                    <div key={metric} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm text-muted-foreground">
                          You: {formatNumber(data.user)} • Ecosystem: {formatNumber(data.ecosystem)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center ${getPerformanceColor(data.performance)}`}>
                          {getPerformanceIcon(data.performance)}
                          <span className="ml-1 font-medium">{formatPercentage(data.performance)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">vs average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ecosystem Rankings */}
            <Card>
              <CardHeader>
                <CardTitle>Your Ecosystem Rankings</CardTitle>
                <CardDescription>Your percentile rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(benchmarks.rankings).map(([metric, ranking]) => (
                    <div key={metric} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm text-muted-foreground">Ecosystem ranking</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600">
                          <Trophy className="h-3 w-3 mr-1" />
                          {ranking}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
