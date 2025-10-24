# User Analytics Components

This directory contains components for implementing user-facing analytics in the FundMeets platform.

## Components Overview

### Core Components

1. **UserAnalyticsDashboard** - Main analytics dashboard showing comprehensive user metrics
2. **PostAnalyticsCard** - Detailed analytics for individual posts
3. **EcosystemBenchmarkCard** - Performance comparison against ecosystem averages
4. **AnalyticsButton** - Button component for accessing analytics from profiles/posts
5. **QuickAnalyticsPreview** - Hover preview showing quick metrics

### Integration Examples

- **analytics-integration-example.tsx** - Shows how to integrate analytics into existing components

## Features Implemented

### Profile Analytics
- **Profile Views**: Total views, unique viewers, average view duration
- **Demographics**: Breakdown by role, industry, location
- **Performance Metrics**: Profile completion, engagement rates
- **Recent Activity**: Latest profile views and interactions

### Post Analytics
- **Post Performance**: Views, interactions, engagement rates
- **Interaction Breakdown**: Likes, comments, shares by type
- **Engagement Metrics**: Average view duration, return rate
- **Top Performing Posts**: Ranked by engagement

### Search Analytics
- **Search Appearances**: How often user appears in search results
- **Click-through Rates**: Performance in search results
- **Query Analysis**: Most common search terms

### Match Analytics
- **Success Rates**: Interest acceptance and match rates
- **Performance Tracking**: Time to first match, conversion rates
- **Quality Metrics**: Match quality and outcomes

### Ecosystem Benchmarks
- **Performance Comparison**: User vs ecosystem averages
- **Rankings**: Percentile rankings across metrics
- **Improvement Suggestions**: Actionable insights for better performance
- **Ecosystem Insights**: Understanding broader platform trends

## Usage Examples

### Adding Analytics to Profile Cards

```tsx
import { AnalyticsButton, QuickAnalyticsPreview } from "./analytics-button";

// In your profile card component
<Card className="relative group hover:shadow-lg transition-shadow">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle>{profile.name}</CardTitle>
        <CardDescription>{profile.industry}</CardDescription>
      </div>
      
      {/* Analytics Button - appears on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <AnalyticsButton
          type="profile"
          targetId={profile.id}
          userId={currentUserId}
          variant="ghost"
          size="sm"
          showText={false}
        />
      </div>
    </div>
  </CardHeader>
  
  {/* Quick metrics preview */}
  {metrics && (
    <QuickAnalyticsPreview
      type="profile"
      targetId={profile.id}
      userId={currentUserId}
      metrics={metrics}
    />
  )}
</Card>
```

### Adding Analytics to Posts

```tsx
// In your post card component
<Card className="relative group hover:shadow-lg transition-shadow">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>By {post.author.name}</CardDescription>
      </div>
      
      {/* Post Analytics Button */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <AnalyticsButton
          type="post"
          targetId={post.id}
          userId={post.authorId}
          variant="ghost"
          size="sm"
          showText={false}
        />
      </div>
    </div>
  </CardHeader>
  
  {/* Post content and metrics */}
</Card>
```

### Adding Analytics to User Dashboard

```tsx
import { UserAnalyticsDashboard } from "./user-analytics-dashboard";

// In your dashboard component
<main className="flex-1 space-y-4 p-4 pt-6">
  {currentSection === "analytics" && (
    <UserAnalyticsDashboard userId={userProfile.id} />
  )}
</main>
```

## API Integration

The components expect the following API endpoints:

### User Analytics
- `GET /analytics/user/:userId` - Get user's personal analytics
- `GET /analytics/user/:userId/benchmarks` - Get ecosystem benchmarks

### Post Analytics
- `GET /analytics/post/:postId` - Get post-specific analytics

### Tracking
- `POST /analytics/track/view` - Track profile/post views
- `POST /analytics/track/search` - Track search queries

## Data Structure

### User Analytics Response
```typescript
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
  };
  postAnalytics: {
    totalPosts: number;
    totalViews: number;
    totalInteractions: number;
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
    clickThroughRate: number;
  };
  matchAnalytics: {
    totalInterests: number;
    totalMatches: number;
    interestSuccessRate: number;
    matchSuccessRate: number;
  };
  activityMetrics: {
    totalActivities: number;
    recentActivities: number;
    activityTypes: Record<string, number>;
  };
}
```

### Ecosystem Benchmarks Response
```typescript
interface EcosystemBenchmarks {
  userMetrics: {
    profileViews: number;
    profileCompletion: number;
    matchRate: number;
    activityLevel: number;
  };
  ecosystemMetrics: {
    averageProfileViews: number;
    averageProfileCompletion: number;
    averageMatchRate: number;
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
```

## Styling and Theming

The components use the existing design system and are fully responsive. They support:

- Dark/light mode
- Mobile responsiveness
- Hover states and animations
- Consistent typography and spacing
- Accessible color contrast

## Performance Considerations

- Components use React.memo for optimization
- Charts are rendered with Recharts for performance
- Data is cached to avoid unnecessary API calls
- Lazy loading for heavy analytics components

## Future Enhancements

- Real-time analytics updates
- Advanced filtering and date ranges
- Export functionality for analytics data
- Custom dashboard configuration
- Advanced chart types and visualizations
- A/B testing for analytics features
