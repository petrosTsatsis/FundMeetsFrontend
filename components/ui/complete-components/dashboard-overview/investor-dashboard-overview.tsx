"use client";

import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Trophy,
  Star,
  CheckCircle,
  Info,
} from "lucide-react";
import { Badge } from "../../../ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StartupsTable, type StartupData } from "./tables/top-startups-table";
import {
  useDashboardMetrics,
  useRecommendedStartups,
  useTopStartups,
  useNewStartups,
} from "@/lib/hooks/use-dashboard-data";
import {
  formatIndustry,
  formatStage,
  formatCurrency,
} from "@/lib/enum-formatters";
import { useMemo, useCallback } from "react";

export function InvestorDashboardOverview() {
  // Use React Query hooks for data fetching
  const {
    data: metrics,
    isLoading: metricsLoading,
    error: metricsError,
  } = useDashboardMetrics();

  const {
    data: recommendedStartups = [],
    isLoading: startupsLoading,
    error: startupsError,
  } = useRecommendedStartups();

  const {
    data: topStartups = [],
    isLoading: topStartupsLoading,
    error: topStartupsError,
  } = useTopStartups();

  const {
    data: newStartups = [],
    isLoading: newStartupsLoading,
    error: newStartupsError,
  } = useNewStartups();

  const mappedTopStartups: StartupData[] = useMemo(() => {
    return (topStartups ?? []).map((s: any) => ({
      id: s.id,
      name: s.name,
      description: "",
      industry: s.industry as any,
      stage: s.stage as any,
      amountNeeded: s.amountNeeded ?? 0,
      valuation: 0,
      equityOffered: s.equityOffered ?? 0,
      location: s.location ?? "",
      logo: s.logo ?? "",
      verified: s.verified ?? false,
      teamSize: 0,
      foundedDate: new Date(),
      tags: s.tags ?? [],
      revenue: undefined,
    }));
  }, [topStartups]);

  const mappedNewStartups: StartupData[] = useMemo(() => {
    return (newStartups ?? []).map((s: any) => ({
      id: s.id,
      name: s.name,
      description: "",
      industry: s.industry as any,
      stage: s.stage as any,
      amountNeeded: s.amountNeeded ?? 0,
      valuation: 0,
      equityOffered: s.equityOffered ?? 0,
      location: s.location ?? "",
      logo: s.logo ?? "",
      verified: s.verified ?? false,
      teamSize: 0,
      foundedDate: new Date(),
      tags: s.tags ?? [],
      revenue: undefined,
    }));
  }, [newStartups]);

  // Memoized calculations to prevent unnecessary re-renders
  const nf = useMemo(() => new Intl.NumberFormat(), []);

  const fmtPct = useCallback(
    (v: number | undefined | null) =>
      v == null ? "0%" : `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    []
  );

  const growthIcon = useCallback(
    (v: number | undefined | null) =>
      v && v < 0 ? (
        <TrendingDown className="h-3 w-3" />
      ) : (
        <TrendingUp className="h-3 w-3" />
      ),
    []
  );

  const metricsData = useMemo(() => {
    if (!metrics) return null;

    return {
      totalStartups: metrics.totals?.startups ?? 0,
      totalInvestors: metrics.totals?.investors ?? 0,
      totalMatches: metrics.totals?.matches ?? 0,
      totalClosedDeals: metrics.totals?.closedDeals ?? 0,
      growthStartups: metrics.growth?.startups ?? 0,
      growthInvestors: metrics.growth?.investors ?? 0,
      growthMatches: metrics.growth?.matches ?? 0,
      growthClosedDeals: metrics.growth?.closedDeals ?? 0,
    };
  }, [metrics]);

  // Loading state
  if (metricsLoading) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton for metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-white shadow-sm animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
              <CardFooter>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Loading skeleton for recommended startups */}
        <div className="px-4 lg:px-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="h-[380px] animate-pulse">
                  <CardHeader>
                    <div className="h-14 w-14 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (metricsError) {
    return (
      <div className="space-y-8">
        <div className="px-4 lg:px-6">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-red-500 mb-3 text-4xl">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Failed to Load Dashboard
              </h3>
              <p className="text-sm text-red-600 mb-4">
                {metricsError.message ||
                  "An error occurred while loading dashboard data"}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardDescription className="text-[var(--primary-900)]">
              Total Startups
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-[var(--primary-800)]">
              {nf.format(metricsData?.totalStartups ?? 0)}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                {growthIcon(metricsData?.growthStartups)}
                <span className="ml-1">
                  {fmtPct(metricsData?.growthStartups)}
                </span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-[var(--primary-700)]">
              Growing startup ecosystem{" "}
              <TrendingUp className="size-4 text-[var(--primary-600)]" />
            </div>
            <div className="text-muted-foreground">
              New startups joining monthly
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardDescription className="text-[var(--primary-900)]">
              Total Investors
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-[var(--primary-800)]">
              {nf.format(metricsData?.totalInvestors ?? 0)}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                {growthIcon(metricsData?.growthInvestors)}
                <span className="ml-1">
                  {fmtPct(metricsData?.growthInvestors)}
                </span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-[var(--primary-700)]">
              Active investor network{" "}
              <TrendingUp className="size-4 text-[var(--primary-600)]" />
            </div>
            <div className="text-muted-foreground">
              Verified investors on platform
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardDescription className="text-[var(--primary-900)]">
              Total Matches
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-[var(--primary-800)]">
              {nf.format(metricsData?.totalMatches ?? 0)}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                {growthIcon(metricsData?.growthMatches)}
                <span className="ml-1">
                  {fmtPct(metricsData?.growthMatches)}
                </span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-[var(--primary-700)]">
              Successful connections{" "}
              <TrendingUp className="size-4 text-[var(--primary-600)]" />
            </div>
            <div className="text-muted-foreground">
              Investor-startup matches made
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardDescription className="text-[var(--primary-900)]">
              Closed Deals
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-[var(--primary-800)]">
              {nf.format(metricsData?.totalClosedDeals ?? 0)}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                {growthIcon(metricsData?.growthClosedDeals)}
                <span className="ml-1">
                  {fmtPct(metricsData?.growthClosedDeals)}
                </span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium text-[var(--primary-700)]">
              Deals need attention{" "}
              <TrendingDown className="size-4 text-[var(--primary-600)]" />
            </div>
            <div className="text-muted-foreground">Total value: 2.4B €</div>
          </CardFooter>
        </Card>
      </div>

      {/* Recommended Startups Section */}
      <div className="px-4 lg:px-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-black/5 rounded-md">
                <Sparkles className="h-4 w-4 text-[var(--primary-800)]" />
              </div>
              <h3 className="text-2xl font-semi-bold tracking-tight text-[var(--primary-800)]">
                Recommended for You
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-[var(--primary-800)] text-white border-[var(--primary-700)]
             [&>[data-radix-tooltip-arrow]]:fill-[var(--primary-800)]"
                  >
                    <p>
                      Startups that match your investment criteria and
                      preferences
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel
              className="w-full [&_.carousel-content]:transition-transform [&_.carousel-content]:duration-300 [&_.carousel-content]:ease-out"
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {startupsLoading ? (
                  // Loading state
                  Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem
                      key={`loading-${index}`}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                    >
                      <Card className="bg-white h-[380px] max-w-sm mx-auto animate-pulse">
                        <CardHeader className="pb-2 text-center flex-shrink-0">
                          <div className="h-14 w-14 mx-auto bg-gray-200 rounded-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        </CardHeader>
                        <div className="px-6 pb-2 flex-shrink-0">
                          <div className="flex justify-center gap-1">
                            <div className="h-5 bg-gray-200 rounded w-16"></div>
                            <div className="h-5 bg-gray-200 rounded w-20"></div>
                            <div className="h-5 bg-gray-200 rounded w-12"></div>
                          </div>
                        </div>
                        <CardContent className="space-y-2 flex-1 flex flex-col justify-center px-6 py-2">
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-1 px-6 pb-4 flex-shrink-0">
                          <div className="h-8 bg-gray-200 rounded w-full"></div>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))
                ) : startupsError ? (
                  // Error state
                  <CarouselItem className="pl-2 md:pl-4 basis-full">
                    <Card className="bg-white h-[380px] max-w-sm mx-auto">
                      <CardContent className="flex items-center justify-center h-full p-6">
                        <div className="text-center">
                          <div className="text-red-500 mb-3 text-4xl">⚠️</div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Unable to Load Recommendations
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {startupsError.message}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.reload()}
                          >
                            Try Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ) : recommendedStartups.length === 0 ? (
                  // Empty state
                  <CarouselItem className="pl-2 md:pl-4 basis-full">
                    <Card className="bg-white h-[380px] max-w-sm mx-auto">
                      <CardContent className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">🔍</div>
                          <p className="text-sm text-gray-600">
                            No recommended startups found
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Check back later for new recommendations
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ) : (
                  // Real data
                  recommendedStartups.map((startup) => (
                    <CarouselItem
                      key={startup.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                    >
                      <Card className="bg-white h-[380px] max-w-sm mx-auto hover:shadow-lg transition-all duration-400 flex flex-col">
                        {/* Header - Image and Name */}
                        <CardHeader className="text-center flex-shrink-0 relative">
                          <div className="relative mx-auto mb-1">
                            <Avatar className="h-14 w-14 mx-auto">
                              <AvatarImage
                                src={startup.logo || undefined}
                                alt={startup.name}
                              />
                              <AvatarFallback className="text-base font-semibold">
                                {startup.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {startup.verified && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="absolute -top-1 -right-1 bg-green-600 rounded-full p-1 cursor-help">
                                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Verified Startup</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <CardTitle className="text-base font-semibold text-[var(--primary-800)] mb-1">
                            {startup.name}
                          </CardTitle>
                          {(startup as any).matchPercentage && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="absolute -top-2 right-2">
                                    <Badge
                                      variant="outline"
                                      className="bg-[var(--success-50)] text-[var(--success-700)] border-[var(--success-200)] text-xs px-2 py-0.5 cursor-help"
                                    >
                                      {(startup as any).matchPercentage}%
                                    </Badge>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Investment compatibility percentage</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </CardHeader>

                        {/* Tags Section */}
                        <div className="px-6 flex-shrink-0">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {(startup.tags || [])
                              .slice(0, 3)
                              .map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs bg-[var(--primary-900)]/10 text-[var(--primary-700)] px-2 py-0.5"
                                >
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        {/* Key data */}
                        <CardContent className="space-y-2 flex-1 flex flex-col justify-center px-6 pb-1">
                          <div className="space-y-2">
                            {/* Industry */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Industry
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs bg-[var(--orange-50)] text-[var(--orange-600)] border-[var(--orange-100)] px-2 py-0.5"
                              >
                                {formatIndustry(startup.industry)}
                              </Badge>
                            </div>

                            {/* Stage */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Stage
                              </span>
                              <Badge
                                variant="outline"
                                className="bg-purple-500/10 text-purple-500 border-purple-500/10"
                              >
                                {formatStage(startup.stage)}
                              </Badge>
                            </div>

                            {/* Funding */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Funding
                              </span>
                              <span className="text-sm font-semibold text-[var(--primary-700)]">
                                {startup.amountNeeded
                                  ? formatCurrency(
                                    startup.amountNeeded,
                                    startup.currency || "€"
                                  )
                                  : "N/A"}
                              </span>
                            </div>

                            {/* Equity */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                Equity
                              </span>
                              <span className="text-sm font-semibold text-[var(--primary-700)]">
                                {startup.equityOffered
                                  ? `${startup.equityOffered}%`
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="pt-0 px-6 pb-4 flex-shrink-0">
                          <Button
                            className="w-full bg-[var(--primary-700)] hover:bg-[var(--primary-800)] text-white font-medium text-sm"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="text-[var(--primary-800)] hover:bg-[var(--primary-700)]/10 hover:border-[var(--primary-700)]" />
              <CarouselNext className="text-[var(--primary-800)] hover:bg-[var(--primary-700)]/10 hover:border-[var(--primary-700)]" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Top Startups Section */}
      <div className="px-4 lg:px-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-black/5 rounded-md">
                <Trophy className="h-4 w-4 text-[var(--primary-800)]" />
              </div>
              <h3 className="text-2xl font-semi-bold tracking-tight text-[var(--primary-800)]">
                Top Startups
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[var(--primary-800)] text-white border-[var(--primary-700)] [&>svg]:!fill-[var(--primary-800)] [&>svg>path]:!fill-[var(--primary-800)]">
                    <p>
                      Highest performing startups based on growth and funding
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <StartupsTable data={mappedTopStartups} />
        </div>
      </div>

      {/* New Startups Section */}
      <div className="px-4 lg:px-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-black/5 rounded-md">
                <Star className="h-4 w-4 text-[var(--primary-800)]" />
              </div>
              <h3 className="text-2xl font-semi-bold tracking-tight text-[var(--primary-800)]">
                New Startups
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[var(--primary-800)] text-white border-[var(--primary-700)] [&>svg]:!fill-[var(--primary-800)] [&>svg>path]:!fill-[var(--primary-800)]">
                    <p>Recently joined startups looking for investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mappedNewStartups.map((startup) => (
              <Card
                key={startup.id}
                className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={startup.logo} alt={startup.name} />
                          <AvatarFallback className="text-sm font-semibold">
                            {startup.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {startup.verified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verified Startup</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base text-[var(--primary-800)]">
                          {startup.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-[var(--primary-600)]">
                          {startup.location ?? ""}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-500/10 text-green-600 border-green-500/30 px-2 py-0.5"
                    >
                      New
                    </Badge>
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {startup.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-[var(--primary-900)]/10 text-[var(--primary-700)] px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-1 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Industry:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {formatIndustry(startup.industry)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Stage:
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-500 border-purple-500/10"
                      >
                        {formatStage(startup.stage)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Revenue:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {startup.revenue != null
                          ? `${(startup.revenue / 1000000).toFixed(1)}M €`
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Key metrics - Compact inline layout */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Funding:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {(startup.amountNeeded / 1000000).toFixed(1)}M €
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Location:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {startup.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Equity:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {startup.equityOffered}%
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className="w-full bg-[var(--primary-700)] hover:bg-[var(--primary-800)] text-white font-medium text-sm"
                    size="sm"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
