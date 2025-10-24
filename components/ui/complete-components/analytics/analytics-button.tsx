"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Eye, MessageSquare } from "lucide-react";
import { UserAnalyticsDashboard } from "./user-analytics-dashboard";
import { PostAnalyticsCard } from "./post-analytics-card";
import { EcosystemBenchmarkCard } from "./ecosystem-benchmark-card";

interface AnalyticsButtonProps {
  type: "profile" | "post";
  targetId: string;
  userId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

export function AnalyticsButton({
  type,
  targetId,
  userId,
  variant = "outline",
  size = "sm",
  showIcon = true,
  showText = true,
  className = ""
}: AnalyticsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<"analytics" | "benchmarks">("analytics");

  const handleOpen = () => {
    setIsOpen(true);
    setActiveView("analytics");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (type === "profile") return "View Analytics";
    return "Post Analytics";
  };

  const getButtonIcon = () => {
    if (type === "profile") return <BarChart3 className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  const getDialogTitle = () => {
    if (type === "profile") return "Profile Analytics";
    return "Post Analytics";
  };

  const getDialogDescription = () => {
    if (type === "profile") return "Track your profile performance and engagement metrics";
    return "Analyze your post's performance and engagement";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={handleOpen}
          className={`${className} ${!showText ? "px-2" : ""}`}
        >
          {showIcon && getButtonIcon()}
          {showText && (
            <span className={showIcon ? "ml-2" : ""}>
              {getButtonText()}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getButtonIcon()}
            <span>{getDialogTitle()}</span>
            {type === "profile" && (
              <Badge variant="outline" className="ml-2">
                <Eye className="h-3 w-3 mr-1" />
                Live
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {type === "profile" && (
            <div className="space-y-4">
              {/* Tab Navigation for Profile Analytics */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setActiveView("analytics")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === "analytics"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="h-4 w-4 mr-2 inline" />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveView("benchmarks")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === "benchmarks"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4 mr-2 inline" />
                  Benchmarks
                </button>
              </div>

              {/* Content based on active view */}
              {activeView === "analytics" && (
                <UserAnalyticsDashboard userId={userId} />
              )}
              {activeView === "benchmarks" && (
                <EcosystemBenchmarkCard userId={userId} />
              )}
            </div>
          )}

          {type === "post" && (
            <PostAnalyticsCard postId={targetId} onClose={handleClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick Analytics Preview Component
interface QuickAnalyticsPreviewProps {
  type: "profile" | "post";
  targetId: string;
  userId: string;
  metrics?: {
    views?: number;
    interactions?: number;
    engagement?: number;
  };
}

export function QuickAnalyticsPreview({
  type,
  targetId,
  userId,
  metrics
}: QuickAnalyticsPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnalyticsButton
        type={type}
        targetId={targetId}
        userId={userId}
        variant="ghost"
        size="sm"
        showText={false}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Quick metrics tooltip */}
      {isHovered && metrics && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background border rounded-lg shadow-lg p-3 z-10 min-w-[200px]">
          <div className="text-sm font-medium mb-2">Quick Stats</div>
          <div className="space-y-1 text-xs">
            {metrics.views && (
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  Views
                </span>
                <span className="font-medium">{metrics.views.toLocaleString()}</span>
              </div>
            )}
            {metrics.interactions && (
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Interactions
                </span>
                <span className="font-medium">{metrics.interactions.toLocaleString()}</span>
              </div>
            )}
            {metrics.engagement && (
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Engagement
                </span>
                <span className="font-medium">{(metrics.engagement * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Click for detailed analytics
          </div>
        </div>
      )}
    </div>
  );
}
