"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity,
  Trophy,
  BarChart3,
  Calendar,
  CheckCircle,
  UserPlus,
  Handshake,
  Building2,
  Globe,
  PieChart,
  Clock,
  Percent,
  MapPin,
  Briefcase,
  TrendingDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface EnhancedAnalyticsData {
  userGrowth: {
    totalUsers: number;
    totalStartups: number;
    totalInvestors: number;
    newUsersLast30Days: number;
    verifiedStartups: number;
    verifiedInvestors: number;
    verificationRate: {
      startups: number;
      investors: number;
    };
  };
  userActivity: {
    signUps: {
      today: number;
      avgPerDay: number;
      avgPerWeek: number;
      avgPerMonth: number;
    };
    activeUsers: number;
    retentionRate: number;
    churnRate: number;
    totalUsers: number;
  };
  enhancedMatching: {
    avgInterestRequestsPerUser: number;
    avgMatchesPerUser: number;
    acceptanceRate: number;
    rejectionRate: number;
    successRate: number;
    avgDealRoomsPerUser: number;
    totalInterests: number;
    acceptedInterests: number;
    rejectedInterests: number;
    totalDealRooms: number;
    successfulDealRooms: number;
  };
  contentInteraction: {
    profileCompletion: {
      startups: number;
      investors: number;
    };
    postsPerUser: number;
    likesPerUser: number;
    searchesPerUser: number;
    profileViewsPerUser: number;
  };
  ecosystemDistribution: {
    industryDistribution: Record<string, number>;
    stageDistribution: Record<string, number>;
    investorTypeDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
    matchIndustryDistribution: Record<string, number>;
  };
  monetization: {
    premiumUsers: number;
    premiumUpgradeRate: number;
    averageRevenuePerUser: number;
    timeToPremium: number;
  };
  enhancedFinancial: {
    avgFundingNeeded: number;
    avgValuation: number;
    avgCheckSize: number;
    fundingByStage: Record<string, { total: number; count: number }>;
    totalStartupsSeekingFunding: number;
    totalInvestors: number;
  };
  trends: Array<{
    month: string;
    newUsers: number;
    newStartups: number;
    newInvestors: number;
    newInterests: number;
    newMatches: number;
  }>;
}

interface EnhancedAnalyticsDashboardProps {
  data: EnhancedAnalyticsData;
}

export function EnhancedAnalyticsDashboard({ data }: EnhancedAnalyticsDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary-800)]">Enhanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform performance metrics and insights</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-[var(--primary-900)]">Total Users</CardDescription>
                  <Users className="h-5 w-5 text-[var(--primary-600)]" />
                </div>
                <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
                  {formatNumber(data.userGrowth.totalUsers)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Avg: {data.userActivity.signUps.avgPerDay.toFixed(1)}/day (3mo)</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-[var(--primary-900)]">Active Users</CardDescription>
                  <Activity className="h-5 w-5 text-[var(--primary-600)]" />
                </div>
                <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
                  {formatNumber(data.userActivity.activeUsers)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {formatPercentage(data.userActivity.retentionRate)} retention rate
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-[var(--primary-900)]">Total Funding</CardDescription>
                  <DollarSign className="h-5 w-5 text-[var(--primary-600)]" />
                </div>
                <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
                  {formatCurrency(data.enhancedFinancial.avgFundingNeeded * data.enhancedFinancial.totalStartupsSeekingFunding)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Avg: {formatCurrency(data.enhancedFinancial.avgFundingNeeded)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-[var(--primary-900)]">Success Rate</CardDescription>
                  <Target className="h-5 w-5 text-[var(--primary-600)]" />
                </div>
                <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
                  {formatPercentage(data.enhancedMatching.successRate)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Deal room completion
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  User Growth
                </CardTitle>
                <CardDescription>Sign-up trends and user activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatNumber(data.userActivity.signUps.today)}
                    </div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.userActivity.signUps.avgPerDay.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg/Day (3mo)</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.userActivity.signUps.avgPerWeek.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg/Week (6mo)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.userActivity.signUps.avgPerMonth.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg/Month (1yr)</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Retention Rate</span>
                    <span className="font-semibold text-green-600">{formatPercentage(data.userActivity.retentionRate)}</span>
                  </div>
                  <Progress value={data.userActivity.retentionRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churn Rate</span>
                    <span className="font-semibold text-red-600">{formatPercentage(data.userActivity.churnRate)}</span>
                  </div>
                  <Progress value={data.userActivity.churnRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Profile Completion
                </CardTitle>
                <CardDescription>User profile completion rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Startup Profiles</span>
                    <span className="font-semibold">{formatPercentage(data.contentInteraction.profileCompletion.startups)}</span>
                  </div>
                  <Progress value={data.contentInteraction.profileCompletion.startups} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investor Profiles</span>
                    <span className="font-semibold">{formatPercentage(data.contentInteraction.profileCompletion.investors)}</span>
                  </div>
                  <Progress value={data.contentInteraction.profileCompletion.investors} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Matching Tab */}
        <TabsContent value="matching" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Matching Performance */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Matching Performance
                </CardTitle>
                <CardDescription>Interest conversion and matching rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatNumber(data.enhancedMatching.totalInterests)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Interests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatNumber(data.enhancedMatching.acceptedInterests)}
                    </div>
                    <div className="text-sm text-muted-foreground">Accepted</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Acceptance Rate</span>
                    <span className="font-semibold text-green-600">{formatPercentage(data.enhancedMatching.acceptanceRate)}</span>
                  </div>
                  <Progress value={data.enhancedMatching.acceptanceRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rejection Rate</span>
                    <span className="font-semibold text-red-600">{formatPercentage(data.enhancedMatching.rejectionRate)}</span>
                  </div>
                  <Progress value={data.enhancedMatching.rejectionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Engagement Metrics
                </CardTitle>
                <CardDescription>User engagement and activity levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.enhancedMatching.avgInterestRequestsPerUser.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Interests/User</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.enhancedMatching.avgMatchesPerUser.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Matches/User</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {data.enhancedMatching.avgDealRoomsPerUser.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Deal Rooms/User</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatPercentage(data.enhancedMatching.successRate)}
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Overview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Overview
                </CardTitle>
                <CardDescription>Funding and investment metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Funding Needed</span>
                    <span className="font-semibold">{formatCurrency(data.enhancedFinancial.avgFundingNeeded)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Valuation</span>
                    <span className="font-semibold">{formatCurrency(data.enhancedFinancial.avgValuation)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Check Size</span>
                    <span className="font-semibold">{formatCurrency(data.enhancedFinancial.avgCheckSize)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding by Stage */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Funding by Stage
                </CardTitle>
                <CardDescription>Funding distribution across startup stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(data.enhancedFinancial.fundingByStage)
                    .sort(([,a], [,b]) => b.total - a.total)
                    .slice(0, 6)
                    .map(([stage, data]) => {
                      const avgFunding = data.count > 0 ? data.total / data.count : 0;
                      return (
                        <div key={stage} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{stage}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(avgFunding)} avg
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {data.count} startups, {formatCurrency(data.total)} total
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ecosystem Tab */}
        <TabsContent value="ecosystem" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Distribution */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Industry Distribution
                </CardTitle>
                <CardDescription>Startups by industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(data.ecosystemDistribution.industryDistribution)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([industry, count]) => {
                      const total = Object.values(data.ecosystemDistribution.industryDistribution).reduce((sum, c) => sum + c, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={industry} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{industry}</span>
                            <span className="text-sm text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Stage Distribution */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Stage Distribution
                </CardTitle>
                <CardDescription>Startups by development stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(data.ecosystemDistribution.stageDistribution)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([stage, count]) => {
                      const total = Object.values(data.ecosystemDistribution.stageDistribution).reduce((sum, c) => sum + c, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={stage} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{stage}</span>
                            <span className="text-sm text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Investor Type Distribution */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Investor Types
                </CardTitle>
                <CardDescription>Distribution of investor types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(data.ecosystemDistribution.investorTypeDistribution)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([type, count]) => {
                      const total = Object.values(data.ecosystemDistribution.investorTypeDistribution).reduce((sum, c) => sum + c, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{type}</span>
                            <span className="text-sm text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Distribution
                </CardTitle>
                <CardDescription>Users by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(data.ecosystemDistribution.locationDistribution)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([location, count]) => {
                      const total = Object.values(data.ecosystemDistribution.locationDistribution).reduce((sum, c) => sum + c, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div key={location} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{location}</span>
                            <span className="text-sm text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monetization Tab */}
        <TabsContent value="monetization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Metrics */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Metrics
                </CardTitle>
                <CardDescription>Monetization and revenue insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatNumber(data.monetization.premiumUsers)}
                    </div>
                    <div className="text-sm text-muted-foreground">Premium Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-800)]">
                      {formatPercentage(data.monetization.premiumUpgradeRate)}
                    </div>
                    <div className="text-sm text-muted-foreground">Upgrade Rate</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Revenue Per User</span>
                    <span className="font-semibold">{formatCurrency(data.monetization.averageRevenuePerUser)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to Premium (days)</span>
                    <span className="font-semibold">{data.monetization.timeToPremium.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Trends */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Trends
                </CardTitle>
                <CardDescription>Monthly growth patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.trends.slice(-6).map((trend, index) => (
                    <div key={trend.month} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{trend.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">Users: {trend.newUsers}</span>
                        <span className="text-muted-foreground">Interests: {trend.newInterests}</span>
                        <span className="text-muted-foreground">Matches: {trend.newMatches}</span>
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
