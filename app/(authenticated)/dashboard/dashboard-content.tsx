"use client";

import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { UserData } from "@/lib/api";
import { InvestorDashboardOverview } from "@/components/ui/complete-components/dashboard-overview/investor-dashboard-overview";
import { StartupDashboardOverview } from "@/components/ui/complete-components/dashboard-overview/startup-dashboard-overview";

interface DashboardContentProps {
  currentSection: string;
  isStartup: boolean;
  userProfile: UserData | null;
}

export function DashboardContent({
  currentSection,
  isStartup,
  userProfile,
}: DashboardContentProps) {
  // Dynamic breadcrumb configuration based on current section
  const breadcrumbConfig = useMemo(() => {
    const configs: Record<string, { main: string; sub?: string }> = {
      overview: {
        main: `${isStartup ? "Startup" : "Investor"} Dashboard`,
        sub: "Overview",
      },
      discover: { main: "Discover", sub: "Search & Explore" },
      "search-startups": { main: "Discover", sub: "Search Startups" },
      "search-investors": { main: "Discover", sub: "Search Investors" },
      "saved-profiles": { main: "Discover", sub: "Saved Profiles" },
      matches: { main: "Matches", sub: "Your Connections" },
      "interest-requests": {
        main: "Interest Requests",
        sub: "Pending Requests",
      },
      notifications: { main: "Notifications", sub: "Recent Updates" },
      settings: { main: "Settings", sub: "Account & Preferences" },
      "deal-rooms": { main: "Deal Rooms", sub: "Active Deals" },
    };

    return configs[currentSection] || { main: "Dashboard", sub: "Overview" };
  }, [currentSection, isStartup]);

  // Dynamic content based on current section
  const renderContent = () => {
    switch (currentSection) {
      case "overview":
        return (
          // Create and render InvestorDashboardOverview or StartupDashboardOverview component
          <>
            {isStartup ? (
              <StartupDashboardOverview />
            ) : (
              <InvestorDashboardOverview />
            )}
          </>
        );

      case "matches":
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full" />
                    <div>
                      <p className="font-medium">Tech Startup Fund</p>
                      <p className="text-sm text-muted-foreground">
                        Matched 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full" />
                    <div>
                      <p className="font-medium">Healthcare Innovation</p>
                      <p className="text-sm text-muted-foreground">
                        Matched 1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Match Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Matches</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "interest-requests":
        return (
          <>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Pending Interest Requests
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full" />
                      <div>
                        <p className="font-medium">AI Startup Proposal</p>
                        <p className="text-sm text-muted-foreground">
                          Requested 3 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                        Accept
                      </button>
                      <button className="px-4 py-2 bg-muted text-muted-foreground rounded-md text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full" />
                      <div>
                        <p className="font-medium">Green Energy Project</p>
                        <p className="text-sm text-muted-foreground">
                          Requested 1 week ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                        Accept
                      </button>
                      <button className="px-4 py-2 bg-muted text-muted-foreground rounded-md text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "notifications":
        return (
          <>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Recent Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div>
                      <p className="font-medium">New Match Available</p>
                      <p className="text-sm text-muted-foreground">
                        You have a new potential match with TechCorp
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-3 h-3 bg-success rounded-full" />
                    <div>
                      <p className="font-medium">Interest Request Accepted</p>
                      <p className="text-sm text-muted-foreground">
                        Your interest in StartupXYZ has been accepted
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "settings":
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Display Name</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded-md"
                      defaultValue={
                        userProfile?.investorProfile?.name ||
                        userProfile?.startupProfile?.name
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full mt-1 p-2 border rounded-md"
                      defaultValue={userProfile?.email}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </>
        );
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                  {breadcrumbConfig.main}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbConfig.sub && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbConfig.sub}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {renderContent()}
      </div>
    </SidebarInset>
  );
}
