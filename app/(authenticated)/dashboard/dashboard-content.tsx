"use client";

import { memo, useMemo } from "react";
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
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  currentSection: string;
  isStartup: boolean;
  userProfile: UserData | null;
  isSectionTransitioning?: boolean;
  isRefreshing?: boolean;
}

const DashboardContentComponent = ({
  currentSection,
  isStartup,
  userProfile,
  isSectionTransitioning = false,
  isRefreshing = false,
}: DashboardContentProps) => {
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

  const overviewContent = useMemo(() => {
    return (
      <>
        {isStartup ? <StartupDashboardOverview /> : <InvestorDashboardOverview />}
      </>
    );
  }, [isStartup]);

  const sectionContent = useMemo(() => {
    switch (currentSection) {
      case "overview":
        return overviewContent;
      case "matches":
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />
                    <div>
                      <p className="font-medium">Tech Startup Fund</p>
                      <p className="text-sm text-muted-foreground">Matched 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />
                    <div>
                      <p className="font-medium">Healthcare Innovation</p>
                      <p className="text-sm text-muted-foreground">Matched 1 week ago</p>
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
                <h3 className="text-lg font-semibold mb-4">Pending Interest Requests</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20" />
                      <div>
                        <p className="font-medium">AI Startup Proposal</p>
                        <p className="text-sm text-muted-foreground">Requested 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Accept
                      </button>
                      <button className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
                        Decline
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20" />
                      <div>
                        <p className="font-medium">Green Energy Project</p>
                        <p className="text-sm text-muted-foreground">Requested 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Accept
                      </button>
                      <button className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
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
                <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">New Match Available</p>
                      <p className="text-sm text-muted-foreground">
                        You have a new potential match with TechCorp
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <div className="h-3 w-3 rounded-full bg-success" />
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
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Display Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border p-2"
                      defaultValue={
                        userProfile?.investorProfile?.name ||
                        userProfile?.startupProfile?.name ||
                        ""
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-md border p-2"
                      defaultValue={userProfile?.email}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <input className="h-4 w-4" defaultChecked type="checkbox" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <input className="h-4 w-4" defaultChecked type="checkbox" />
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
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </>
        );
    }
  }, [currentSection, overviewContent, userProfile]);

  const contentWrapperClassName = useMemo(
    () =>
      cn(
        "flex flex-1 flex-col gap-4 p-4 pt-0 transition-opacity duration-200",
        {
          "pointer-events-none opacity-60": isSectionTransitioning,
          "opacity-80": isRefreshing && !isSectionTransitioning,
        }
      ),
    [isRefreshing, isSectionTransitioning]
  );

  return (
    <SidebarInset aria-busy={isSectionTransitioning || isRefreshing}>
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
      {isRefreshing && !isSectionTransitioning && (
        <div className="px-4" aria-hidden>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 animate-pulse bg-primary" />
          </div>
        </div>
      )}
      <div className={contentWrapperClassName}>{sectionContent}</div>
    </SidebarInset>
  );
};

export const DashboardContent = memo(DashboardContentComponent);

DashboardContent.displayName = "DashboardContent";
