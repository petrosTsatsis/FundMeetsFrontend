"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  Eye,
  MessageSquare,
  Heart,
  Share,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Users,
  Activity
} from "lucide-react";

interface PostAnalyticsData {
  post: {
    id: string;
    title: string;
    type: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
      role: string;
    };
  };
  metrics: {
    totalViews: number;
    uniqueViews: number;
    totalInteractions: number;
    averageViewDuration: number;
    interactionsByType: Record<string, number>;
  };
  views: Array<{
    id: string;
    viewerId?: string;
    duration?: number;
    ipAddress?: string;
    createdAt: string;
  }>;
  interactions: Array<{
    id: string;
    type: string;
    userId?: string;
    createdAt: string;
  }>;
}

interface PostAnalyticsCardProps {
  postId: string;
  onClose?: () => void;
}

export function PostAnalyticsCard({ postId, onClose }: PostAnalyticsCardProps) {
  const [analyticsData, setAnalyticsData] = useState<PostAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    fetchPostAnalytics();
  }, [postId, timeRange]);

  const fetchPostAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await apiClient.getPostAnalytics(postId);
      
      // Mock data for now
      const mockData: PostAnalyticsData = {
        post: {
          id: postId,
          title: "Our Series A Journey: Lessons Learned",
          type: "FUNDRAISING",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            id: "user-1",
            name: "Tech Startup Inc.",
            role: "STARTUP"
          }
        },
        metrics: {
          totalViews: 156,
          uniqueViews: 134,
          totalInteractions: 23,
          averageViewDuration: 45,
          interactionsByType: {
            LIKE: 15,
            COMMENT: 5,
            SHARE: 3
          }
        },
        views: [],
        interactions: []
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error("Failed to fetch post analytics:", error);
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

  if (!analyticsData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available for this post</p>
      </div>
    );
  }

  const formatNumber = (value: number) => value.toLocaleString();
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getEngagementRate = () => {
    if (analyticsData.metrics.totalViews === 0) return 0;
    return (analyticsData.metrics.totalInteractions / analyticsData.metrics.totalViews) * 100;
  };

  const getReturnRate = () => {
    if (analyticsData.metrics.totalViews === 0) return 0;
    return (analyticsData.metrics.uniqueViews / analyticsData.metrics.totalViews) * 100;
  };

  // Prepare chart data for interactions over time
  const interactionData = Object.entries(analyticsData.metrics.interactionsByType)
    .map(([type, count]) => ({
      type: type.charAt(0) + type.slice(1).toLowerCase(),
      count,
      percentage: (count / analyticsData.metrics.totalInteractions) * 100
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Post Analytics</h2>
          <p className="text-muted-foreground">{analyticsData.post.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange}
          </Button>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.metrics.totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(analyticsData.metrics.uniqueViews)} unique viewers
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline">
                {formatPercentage(getReturnRate())} return rate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.metrics.totalInteractions)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(getEngagementRate())} engagement rate
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline">
                {formatNumber(analyticsData.metrics.averageViewDuration)}s avg duration
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.metrics.interactionsByType.LIKE || 0)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(analyticsData.metrics.interactionsByType.COMMENT || 0)} comments
            </p>
            <div className="flex items-center mt-2">
              <Badge variant="outline">
                {formatNumber(analyticsData.metrics.interactionsByType.SHARE || 0)} shares
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(getEngagementRate())}</div>
            <p className="text-xs text-muted-foreground">engagement rate</p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Good performance
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interaction Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Interaction Breakdown</CardTitle>
            <CardDescription>Types of interactions on your post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interactionData.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{formatNumber(item.count)}</span>
                    <Badge variant="outline">{formatPercentage(item.percentage)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Engagement Rate</span>
                  <span className="text-sm text-muted-foreground">{formatPercentage(getEngagementRate())}</span>
                </div>
                <Progress value={getEngagementRate()} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Higher is better - shows how engaging your content is
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Return Viewers</span>
                  <span className="text-sm text-muted-foreground">{formatPercentage(getReturnRate())}</span>
                </div>
                <Progress value={getReturnRate()} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Percentage of viewers who came back to view again
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Average View Duration</span>
                  <span className="text-sm text-muted-foreground">{formatDuration(analyticsData.metrics.averageViewDuration)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Longer duration indicates better content quality
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interaction Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Types</CardTitle>
          <CardDescription>Breakdown of different interaction types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Post Information */}
      <Card>
        <CardHeader>
          <CardTitle>Post Information</CardTitle>
          <CardDescription>Details about this post</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Post Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{analyticsData.post.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span>{analyticsData.post.author.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(analyticsData.post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{Math.ceil((Date.now() - new Date(analyticsData.post.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Performance Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views per day:</span>
                  <span>{formatNumber(Math.ceil(analyticsData.metrics.totalViews / Math.max(1, Math.ceil((Date.now() - new Date(analyticsData.post.createdAt).getTime()) / (1000 * 60 * 60 * 24)))))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interactions per day:</span>
                  <span>{formatNumber(Math.ceil(analyticsData.metrics.totalInteractions / Math.max(1, Math.ceil((Date.now() - new Date(analyticsData.post.createdAt).getTime()) / (1000 * 60 * 60 * 24)))))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peak engagement:</span>
                  <span className="text-green-600">High</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
