"use client";

import { useEffect, useState } from "react";
import { EnhancedAnalyticsDashboard } from "@/components/ui/complete-components/analytics/enhanced-analytics-dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  RefreshCw, 
  Download, 
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface AnalyticsData {
  userGrowth: any;
  userActivity: any;
  enhancedMatching: any;
  contentInteraction: any;
  ecosystemDistribution: any;
  monetization: any;
  enhancedFinancial: any;
  trends: any[];
  generatedAt: string;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/analytics/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Admin auth token
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }

      const analyticsData = await response.json();
      setData(analyticsData);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!data) return;
    
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fundmeets-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: AnalyticsData) => {
    const headers = [
      'Metric Category',
      'Metric Name',
      'Value',
      'Percentage',
      'Timestamp'
    ];
    
    const rows = [
      // User Growth
      ['User Growth', 'Total Users', data.userGrowth.totalUsers, '', data.generatedAt],
      ['User Growth', 'Total Startups', data.userGrowth.totalStartups, '', data.generatedAt],
      ['User Growth', 'Total Investors', data.userGrowth.totalInvestors, '', data.generatedAt],
      ['User Growth', 'New Users (30d)', data.userGrowth.newUsersLast30Days, '', data.generatedAt],
      
      // User Activity
      ['User Activity', 'Sign-ups Today', data.userActivity.signUps.today, '', data.generatedAt],
      ['User Activity', 'Avg Sign-ups/Day (3mo)', data.userActivity.signUps.avgPerDay.toFixed(1), '', data.generatedAt],
      ['User Activity', 'Avg Sign-ups/Week (6mo)', data.userActivity.signUps.avgPerWeek.toFixed(1), '', data.generatedAt],
      ['User Activity', 'Avg Sign-ups/Month (1yr)', data.userActivity.signUps.avgPerMonth.toFixed(1), '', data.generatedAt],
      ['User Activity', 'Active Users', data.userActivity.activeUsers, '', data.generatedAt],
      ['User Activity', 'Retention Rate', '', data.userActivity.retentionRate.toFixed(2) + '%', data.generatedAt],
      ['User Activity', 'Churn Rate', '', data.userActivity.churnRate.toFixed(2) + '%', data.generatedAt],
      
      // Matching
      ['Matching', 'Total Interests', data.enhancedMatching.totalInterests, '', data.generatedAt],
      ['Matching', 'Accepted Interests', data.enhancedMatching.acceptedInterests, '', data.generatedAt],
      ['Matching', 'Acceptance Rate', '', data.enhancedMatching.acceptanceRate.toFixed(2) + '%', data.generatedAt],
      ['Matching', 'Success Rate', '', data.enhancedMatching.successRate.toFixed(2) + '%', data.generatedAt],
      
      // Financial
      ['Financial', 'Avg Funding Needed', data.enhancedFinancial.avgFundingNeeded, '', data.generatedAt],
      ['Financial', 'Avg Valuation', data.enhancedFinancial.avgValuation, '', data.generatedAt],
      ['Financial', 'Avg Check Size', data.enhancedFinancial.avgCheckSize, '', data.generatedAt],
    ];
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <RefreshCw className="h-8 w-8 animate-spin text-[var(--primary-600)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">
              Loading Analytics
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Fetching the latest platform metrics and insights...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">
              Error Loading Analytics
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {error}
            </p>
            <Button onClick={fetchAnalyticsData} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">
              No Data Available
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              No analytics data found. Please check your connection.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary-800)]">
                Admin Analytics Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Internal platform metrics and performance insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Admin Only
            </Badge>
            
            <div className="flex items-center gap-2">
              {lastRefresh && (
                <div className="text-xs text-muted-foreground">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </div>
              )}
              <Button
                onClick={fetchAnalyticsData}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={exportData}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="p-6">
        <EnhancedAnalyticsDashboard data={data} />
      </div>

      {/* Admin Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Data Source: Production Database</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Generated: {new Date(data.generatedAt).toLocaleString()}</span>
            </div>
          </div>
          <div className="text-xs">
            FundMeets Analytics v1.0 | Admin Access Only
          </div>
        </div>
      </div>
    </div>
  );
}
