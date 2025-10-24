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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Users,
  Eye,
  MessageSquare,
  Activity,
  Star,
  Award,
  Zap
} from "lucide-react";

interface EcosystemBenchmarkData {
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

interface EcosystemBenchmarkCardProps {
  userId: string;
}

export function EcosystemBenchmarkCard({ userId }: EcosystemBenchmarkCardProps) {
  const [benchmarkData, setBenchmarkData] = useState<EcosystemBenchmarkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>("all");

  useEffect(() => {
    fetchBenchmarkData();
  }, [userId]);

  const fetchBenchmarkData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await apiClient.getUserBenchmarks(userId);
      
      // Mock data for now
      const mockData: EcosystemBenchmarkData = {
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

      setBenchmarkData(mockData);
    } catch (error) {
      console.error("Failed to fetch benchmark data:", error);
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

  if (!benchmarkData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No benchmark data available</p>
      </div>
    );
  }

  const formatNumber = (value: number) => value.toLocaleString();
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const getPerformanceColor = (performance: number) => {
    if (performance > 50) return "text-green-600";
    if (performance > 20) return "text-yellow-600";
    if (performance > 0) return "text-blue-600";
    return "text-red-600";
  };

  const getPerformanceIcon = (performance: number) => {
    if (performance > 50) return <Trophy className="h-4 w-4" />;
    if (performance > 20) return <Award className="h-4 w-4" />;
    if (performance > 0) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const getRankingColor = (ranking: string) => {
    if (ranking.includes("Top 10%")) return "text-green-600";
    if (ranking.includes("Top 20%")) return "text-blue-600";
    if (ranking.includes("Top 30%")) return "text-yellow-600";
    return "text-gray-600";
  };

  // Prepare radar chart data
  const radarData = [
    {
      metric: "Profile Views",
      user: Math.min(benchmarkData.userMetrics.profileViews / 200 * 100, 100),
      ecosystem: Math.min(benchmarkData.ecosystemMetrics.averageProfileViews / 200 * 100, 100)
    },
    {
      metric: "Match Rate",
      user: benchmarkData.userMetrics.matchRate,
      ecosystem: benchmarkData.ecosystemMetrics.averageMatchRate
    },
    {
      metric: "Profile Completion",
      user: benchmarkData.userMetrics.profileCompletion,
      ecosystem: benchmarkData.ecosystemMetrics.averageProfileCompletion
    },
    {
      metric: "Activity Level",
      user: Math.min(benchmarkData.userMetrics.activityLevel / 20 * 100, 100),
      ecosystem: Math.min(benchmarkData.ecosystemMetrics.averageActivityLevel / 20 * 100, 100)
    }
  ];

  // Prepare bar chart data
  const barData = Object.entries(benchmarkData.benchmarks).map(([metric, data]) => ({
    metric: metric.replace(/([A-Z])/g, ' $1').trim(),
    user: data.user,
    ecosystem: data.ecosystem,
    performance: data.performance
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ecosystem Benchmarks</h2>
          <p className="text-muted-foreground">How you compare to the ecosystem</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            October 2025
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(benchmarkData.benchmarks).map(([metric, data]) => (
          <Card key={metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {metric.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
              {getPerformanceIcon(data.performance)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(data.user)}</div>
              <p className="text-xs text-muted-foreground">
                vs {formatNumber(data.ecosystem)} ecosystem avg
              </p>
              <div className="flex items-center mt-2">
                <Badge 
                  variant="outline" 
                  className={`${getPerformanceColor(data.performance)} border-current`}
                >
                  {data.performance > 0 ? "+" : ""}{formatPercentage(data.performance)}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">
                  vs ecosystem
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Your Ecosystem Rankings</CardTitle>
          <CardDescription>Your percentile rankings across key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(benchmarkData.rankings).map(([metric, ranking]) => (
              <div key={metric} className="text-center p-4 border rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className={`h-6 w-6 ${getRankingColor(ranking)}`} />
                </div>
                <h3 className="font-medium capitalize mb-1">
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <Badge 
                  variant="outline" 
                  className={`${getRankingColor(ranking)} border-current`}
                >
                  {ranking}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance vs Ecosystem</CardTitle>
          <CardDescription>Visual comparison of your metrics against ecosystem averages</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="user" fill="#8884d8" name="Your Performance" />
              <Bar dataKey="ecosystem" fill="#82ca9d" name="Ecosystem Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key insights about your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(benchmarkData.benchmarks).map(([metric, data]) => (
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
                      <span className="ml-1 font-medium">
                        {data.performance > 0 ? "+" : ""}{formatPercentage(data.performance)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">vs average</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Improvement Suggestions</CardTitle>
            <CardDescription>Areas where you can improve your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benchmarkData.benchmarks.profileViews.performance < 20 && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Increase Profile Views</h4>
                    <p className="text-sm text-blue-700">
                      Your profile views are below average. Consider updating your profile with more engaging content and better keywords.
                    </p>
                  </div>
                </div>
              )}

              {benchmarkData.benchmarks.matchRate.performance < 20 && (
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Improve Match Rate</h4>
                    <p className="text-sm text-yellow-700">
                      Your match success rate could be higher. Focus on quality over quantity when sending interest requests.
                    </p>
                  </div>
                </div>
              )}

              {benchmarkData.benchmarks.profileCompletion.performance < 20 && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Complete Your Profile</h4>
                    <p className="text-sm text-green-700">
                      Your profile is {formatPercentage(benchmarkData.userMetrics.profileCompletion)} complete. 
                      Add more details to improve visibility.
                    </p>
                  </div>
                </div>
              )}

              {benchmarkData.benchmarks.activityLevel.performance < 20 && (
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Increase Activity</h4>
                    <p className="text-sm text-purple-700">
                      Be more active on the platform. Regular engagement helps build your network and visibility.
                    </p>
                  </div>
                </div>
              )}

              {Object.values(benchmarkData.benchmarks).every(b => b.performance > 20) && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Star className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Excellent Performance!</h4>
                    <p className="text-sm text-green-700">
                      You're performing above average across all metrics. Keep up the great work!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ecosystem Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Ecosystem Insights</CardTitle>
          <CardDescription>Understanding the broader ecosystem performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formatNumber(benchmarkData.ecosystemMetrics.averageProfileViews)}</div>
              <p className="text-sm text-muted-foreground">Avg Profile Views</p>
              <p className="text-xs text-muted-foreground mt-1">Ecosystem average</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{formatPercentage(benchmarkData.ecosystemMetrics.averageMatchRate)}</div>
              <p className="text-sm text-muted-foreground">Avg Match Rate</p>
              <p className="text-xs text-muted-foreground mt-1">Ecosystem average</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{formatPercentage(benchmarkData.ecosystemMetrics.averageProfileCompletion)}</div>
              <p className="text-sm text-muted-foreground">Avg Profile Completion</p>
              <p className="text-xs text-muted-foreground mt-1">Ecosystem average</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{formatNumber(benchmarkData.ecosystemMetrics.averageActivityLevel)}</div>
              <p className="text-sm text-muted-foreground">Avg Activity Level</p>
              <p className="text-xs text-muted-foreground mt-1">Ecosystem average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
