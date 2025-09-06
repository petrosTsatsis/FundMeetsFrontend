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
import { StartupsTable, type StartupData } from "./startups-table";

// Placeholder data for startups
const placeholderStartups = [
  {
    id: "1",
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform",
    industry: "SaaS",
    stage: "Series A",
    amountNeeded: 2500000,
    valuation: 15000000,
    equityOffered: 15,
    location: "San Francisco, CA",
    logo: "/avatars/startup1.jpg",
    verified: true,
    teamSize: 12,
    foundedDate: new Date("2022-03-15"),
    tags: ["AI", "Automation", "B2B"],
    revenue: 2500000,
    currency: "EUR",
  },
  {
    id: "2",
    name: "GreenEnergy Co",
    description: "Renewable energy storage solutions",
    industry: "CleanTech",
    stage: "Seed",
    amountNeeded: 1500000,
    valuation: 8000000,
    equityOffered: 20,
    location: "Austin, TX",
    logo: "/avatars/startup2.jpg",
    verified: true,
    teamSize: 8,
    foundedDate: new Date("2023-01-20"),
    tags: ["B2C", "Storage", "Hardware"],
    revenue: 1200000,
    currency: "USD",
  },
  {
    id: "3",
    name: "HealthTech Innovations",
    description: "Digital health monitoring devices",
    industry: "HealthTech",
    stage: "Series B",
    amountNeeded: 5000000,
    valuation: 25000000,
    equityOffered: 12,
    location: "Boston, MA",
    logo: "/avatars/startup3.jpg",
    verified: true,
    teamSize: 25,
    foundedDate: new Date("2021-08-10"),
    tags: ["Healthcare", "IoT", "Wearables"],
    revenue: 8500000,
    currency: "GBP",
  },
  {
    id: "4",
    name: "FinTech Pro",
    description: "Blockchain-based payment solutions",
    industry: "FinTech",
    stage: "Series A",
    amountNeeded: 3000000,
    valuation: 18000000,
    equityOffered: 18,
    location: "New York, NY",
    logo: "/avatars/startup4.jpg",
    verified: true,
    teamSize: 15,
    foundedDate: new Date("2022-11-05"),
    tags: ["Blockchain", "Payments", "Crypto"],
    revenue: 4200000,
    currency: "JPY",
  },
  {
    id: "5",
    name: "EduTech Platform",
    description: "Personalized learning AI platform",
    industry: "EdTech",
    stage: "Seed",
    amountNeeded: 1200000,
    valuation: 6000000,
    equityOffered: 25,
    location: "Seattle, WA",
    logo: "/avatars/startup5.jpg",
    verified: false,
    teamSize: 6,
    foundedDate: new Date("2023-06-12"),
    tags: ["Education", "AI", "Learning"],
    revenue: 800000,
    currency: "EUR",
  },
];

const newStartups = [
  { ...placeholderStartups[4], joinedDate: "2 weeks ago" },
  { ...placeholderStartups[1], joinedDate: "1 month ago" },
  { ...placeholderStartups[3], joinedDate: "1 month ago" },
  { ...placeholderStartups[0], joinedDate: "2 months ago" },
  { ...placeholderStartups[2], joinedDate: "3 months ago" },
  {
    id: "6",
    name: "DataFlow Analytics",
    description: "Real-time data processing and analytics platform",
    industry: "DataTech",
    stage: "Seed",
    amountNeeded: 1800000,
    valuation: 9000000,
    equityOffered: 22,
    location: "Berlin, Germany",
    logo: "/avatars/startup6.jpg",
    verified: true,
    teamSize: 9,
    foundedDate: new Date("2023-09-15"),
    tags: ["Analytics", "Real-time", "B2B"],
    revenue: 950000,
    currency: "EUR",
    joinedDate: "1 week ago",
  },
];

export function InvestorDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardDescription className="text-[var(--primary-900)]">
              Total Startups
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-[var(--primary-800)]">
              2,847
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                <TrendingUp className="h-3 w-3" />
                +8.2%
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
              1,234
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                <TrendingUp className="h-3 w-3" />
                +12.5%
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
              5,678
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                <TrendingUp className="h-3 w-3" />
                +15.3%
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
              892
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="border-[var(--primary-600)] text-[var(--primary-900)] bg-[var(--primary-150)]"
              >
                <TrendingDown className="h-3 w-3" />
                -5.2%
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

      {/* Recommended Startups Carousel */}
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
                {placeholderStartups.map((startup) => (
                  <CarouselItem
                    key={startup.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                  >
                    <Card className="bg-white h-[380px] max-w-sm mx-auto hover:shadow-lg transition-all duration-400 flex flex-col">
                      {/* Header - Image and Name */}
                      <CardHeader className="pb-2 text-center flex-shrink-0">
                        <div className="relative mx-auto mb-1">
                          <Avatar className="h-14 w-14 mx-auto">
                            <AvatarImage
                              src={startup.logo}
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
                      </CardHeader>

                      {/* Tags Section */}
                      <div className="px-6 pb-2 flex-shrink-0">
                        <div className="flex flex-wrap gap-1 justify-center">
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
                      </div>

                      {/* Key metrics - More concise layout */}
                      <CardContent className="space-y-2 flex-1 flex flex-col justify-center px-6 py-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              Industry
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs bg-[var(--orange-50)] text-[var(--orange-600)] border-[var(--orange-50)] px-2 py-0.5"
                            >
                              {startup.industry}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              Funding
                            </span>
                            <span className="text-sm font-semibold text-[var(--primary-700)]">
                              {(startup.amountNeeded / 1000000).toFixed(1)}M €
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              Equity
                            </span>
                            <span className="text-sm font-semibold text-[var(--primary-700)]">
                              {startup.equityOffered}%
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="pt-1 px-6 pb-4 flex-shrink-0">
                        <Button
                          className="w-full bg-[var(--primary-700)] hover:bg-[var(--primary-800)] text-white font-medium text-sm"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-[var(--primary-800)] hover:bg-[var(--primary-700)]/10 hover:border-[var(--primary-700)]" />
              <CarouselNext className="text-[var(--primary-800)] hover:bg-[var(--primary-700)]/10 hover:border-[var(--primary-700)]" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Top Startups Table */}
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

          <StartupsTable data={placeholderStartups as StartupData[]} />
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
            {newStartups.map((startup) => (
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
                          Joined {startup.joinedDate}
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

                <CardContent className="px-6 pb-3 space-y-3">
                  {/* Industry, Stage, Revenue - Compact inline layout */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Industry:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {startup.industry}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Stage:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {startup.stage}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        Revenue:
                      </span>
                      <span className="font-semibold text-[var(--primary-700)]">
                        {(startup.revenue / 1000000).toFixed(1)}M €
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
