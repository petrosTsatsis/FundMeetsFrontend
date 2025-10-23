"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Building2
} from "lucide-react";

interface AnalyticsData {
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
  matching: {
    totalInterests: number;
    acceptedInterests: number;
    totalMatches: number;
    totalDealRooms: number;
    interestConversionRate: number;
    matchToDealRoomRate: number;
  };
  financial: {
    totalFundingSought: number;
    averageFundingSought: number;
    averageValuation: number;
    industryDistribution: Record<string, number>;
    stageDistribution: Record<string, number>;
    totalStartupsSeekingFunding: number;
  };
  activity: {
    recentInterests: number;
    recentMatches: number;
    recentDealRooms: number;
    activeUsers: number;
    period: string;
  };
  topPerformers: {
    topInvestors: Array<{
      id: string;
      name: string;
      interestsSent: number;
      verified: boolean;
    }>;
    topStartups: Array<{
      id: string;
      name: string;
      interestsReceived: number;
      verified: boolean;
      industry: string;
    }>;
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

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
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

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary-800)]">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform metrics and insights</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
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
              <span className="text-muted-foreground">+{formatNumber(data.userGrowth.newUsersLast30Days)} this month</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Startups vs Investors */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[var(--primary-900)]">Startups</CardDescription>
              <Building2 className="h-5 w-5 text-[var(--primary-600)]" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
              {formatNumber(data.userGrowth.totalStartups)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verified</span>
                <span className="font-semibold">{data.userGrowth.verifiedStartups}</span>
              </div>
              <Progress 
                value={data.userGrowth.verificationRate.startups} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {data.userGrowth.verificationRate.startups.toFixed(1)}% verified
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investors */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[var(--primary-900)]">Investors</CardDescription>
              <Target className="h-5 w-5 text-[var(--primary-600)]" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
              {formatNumber(data.userGrowth.totalInvestors)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verified</span>
                <span className="font-semibold">{data.userGrowth.verifiedInvestors}</span>
              </div>
              <Progress 
                value={data.userGrowth.verificationRate.investors} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {data.userGrowth.verificationRate.investors.toFixed(1)}% verified
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Funding Sought */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[var(--primary-900)]">Funding Sought</CardDescription>
              <DollarSign className="h-5 w-5 text-[var(--primary-600)]" />
            </div>
            <CardTitle className="text-2xl font-semibold text-[var(--primary-800)]">
              {formatCurrency(data.financial.totalFundingSought)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Avg: {formatCurrency(data.financial.averageFundingSought)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matching & Activity Metrics */}
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
                  {formatNumber(data.matching.totalInterests)}
                </div>
                <div className="text-sm text-muted-foreground">Total Interests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-800)]">
                  {formatNumber(data.matching.totalMatches)}
                </div>
                <div className="text-sm text-muted-foreground">Total Matches</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Interest Conversion</span>
                <span className="font-semibold">{data.matching.interestConversionRate.toFixed(1)}%</span>
              </div>
              <Progress value={data.matching.interestConversionRate} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Match to Deal Room</span>
                <span className="font-semibold">{data.matching.matchToDealRoomRate.toFixed(1)}%</span>
              </div>
              <Progress value={data.matching.matchToDealRoomRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Last 7 days platform activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-800)]">
                  {formatNumber(data.activity.recentInterests)}
                </div>
                <div className="text-sm text-muted-foreground">New Interests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-800)]">
                  {formatNumber(data.activity.recentMatches)}
                </div>
                <div className="text-sm text-muted-foreground">New Matches</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-800)]">
                  {formatNumber(data.activity.recentDealRooms)}
                </div>
                <div className="text-sm text-muted-foreground">Deal Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-800)]">
                  {formatNumber(data.activity.activeUsers)}
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Investors */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Investors
            </CardTitle>
            <CardDescription>Most active investors by interests sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topPerformers.topInvestors.slice(0, 5).map((investor, index) => (
                <div key={investor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--primary-600)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--primary-800)]">{investor.name}</div>
                      <div className="flex items-center gap-2">
                        {investor.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {investor.interestsSent} interests sent
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Startups */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Top Startups
            </CardTitle>
            <CardDescription>Most sought-after startups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topPerformers.topStartups.slice(0, 5).map((startup, index) => (
                <div key={startup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--primary-600)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--primary-800)]">{startup.name}</div>
                      <div className="flex items-center gap-2">
                        {startup.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {startup.interestsReceived} interests received
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {startup.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry & Stage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Industry Distribution
            </CardTitle>
            <CardDescription>Startups by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.financial.industryDistribution)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([industry, count]) => {
                  const percentage = (count / data.financial.totalStartupsSeekingFunding) * 100;
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
              {Object.entries(data.financial.stageDistribution)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([stage, count]) => {
                  const percentage = (count / data.financial.totalStartupsSeekingFunding) * 100;
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
      </div>
    </div>
  );
}
