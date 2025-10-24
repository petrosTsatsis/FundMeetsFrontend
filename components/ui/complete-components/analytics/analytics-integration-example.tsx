"use client";

import { AnalyticsButton, QuickAnalyticsPreview } from "./analytics-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, TrendingUp, Users } from "lucide-react";

// Example component showing how to integrate analytics into profile cards
interface ProfileCardProps {
  profileId: string;
  userId: string;
  name: string;
  role: "STARTUP" | "INVESTOR";
  industry?: string;
  location?: string;
  description?: string;
  metrics?: {
    views: number;
    interactions: number;
    engagement: number;
  };
}

export function ProfileCardWithAnalytics({
  profileId,
  userId,
  name,
  role,
  industry,
  location,
  description,
  metrics
}: ProfileCardProps) {
  return (
    <Card className="relative group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{name}</span>
              <Badge variant="outline">{role}</Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              {industry && <span className="mr-2">{industry}</span>}
              {location && <span>{location}</span>}
            </CardDescription>
          </div>
          
          {/* Analytics Button */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <AnalyticsButton
              type="profile"
              targetId={profileId}
              userId={userId}
              variant="ghost"
              size="sm"
              showText={false}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Quick Analytics Preview */}
        {metrics && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span>{metrics.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>{metrics.interactions.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>{(metrics.engagement * 100).toFixed(1)}%</span>
              </div>
            </div>
            
            {/* Quick Analytics Preview on Hover */}
            <QuickAnalyticsPreview
              type="profile"
              targetId={profileId}
              userId={userId}
              metrics={metrics}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button variant="outline" size="sm">
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Example component showing how to integrate analytics into post cards
interface PostCardProps {
  postId: string;
  userId: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  author: {
    name: string;
    role: string;
  };
  metrics?: {
    views: number;
    interactions: number;
    engagement: number;
  };
}

export function PostCardWithAnalytics({
  postId,
  userId,
  title,
  content,
  type,
  createdAt,
  author,
  metrics
}: PostCardProps) {
  return (
    <Card className="relative group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">
              By {author.name} • {new Date(createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          
          {/* Analytics Button */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
            <AnalyticsButton
              type="post"
              targetId={postId}
              userId={userId}
              variant="ghost"
              size="sm"
              showText={false}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Badge variant="outline">{type}</Badge>
            {metrics && (
              <>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{metrics.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{metrics.interactions.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
          
          {/* Quick Analytics Preview */}
          {metrics && (
            <QuickAnalyticsPreview
              type="post"
              targetId={postId}
              userId={userId}
              metrics={metrics}
            />
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            View Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Example of how to add analytics to a user's own profile
interface MyProfileAnalyticsProps {
  userId: string;
  profileId: string;
  name: string;
  role: "STARTUP" | "INVESTOR";
  metrics?: {
    profileViews: number;
    postViews: number;
    matches: number;
    engagement: number;
  };
}

export function MyProfileWithAnalytics({
  userId,
  profileId,
  name,
  role,
  metrics
}: MyProfileAnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{name}</span>
              <Badge variant="outline">{role}</Badge>
            </CardTitle>
            <CardDescription>Your profile performance</CardDescription>
          </div>
          
          {/* Main Analytics Button */}
          <AnalyticsButton
            type="profile"
            targetId={profileId}
            userId={userId}
            variant="default"
            size="sm"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.profileViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Profile Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.postViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Post Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.matches}</div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{(metrics.engagement * 100).toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Engagement</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            View Public Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Example of how to add analytics to a list of user's posts
interface MyPostsListProps {
  userId: string;
  posts: Array<{
    id: string;
    title: string;
    content: string;
    type: string;
    createdAt: string;
    metrics?: {
      views: number;
      interactions: number;
      engagement: number;
    };
  }>;
}

export function MyPostsListWithAnalytics({ userId, posts }: MyPostsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Posts</h3>
        <AnalyticsButton
          type="profile"
          targetId={userId}
          userId={userId}
          variant="outline"
          size="sm"
        />
      </div>
      
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCardWithAnalytics
            key={post.id}
            postId={post.id}
            userId={userId}
            title={post.title}
            content={post.content}
            type={post.type}
            createdAt={post.createdAt}
            author={{ name: "You", role: "STARTUP" }}
            metrics={post.metrics}
          />
        ))}
      </div>
    </div>
  );
}
