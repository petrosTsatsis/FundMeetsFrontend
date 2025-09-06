"use client";

import { TrendingUp } from "lucide-react";
import { Badge } from "../../../ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StartupDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Profile Views</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,247
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Growing investor interest <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Views from potential investors
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardDescription>Interest Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            23
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.5%
            </Badge>
          </CardAction>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Investor inquiries <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Pending interest requests
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardDescription>Matches</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            8
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="mr-1 h-3 w-3" />
              +25.3%
            </Badge>
          </CardAction>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Successful matches <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              Compatible investors found
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardDescription>Funding Progress</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            65%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.1%
            </Badge>
          </CardAction>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Towards funding goal <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              $1.5M of $2.3M target
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
          <p className="text-muted-foreground">
            Manage your startup profile and connect with investors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Update Profile</CardTitle>
              <CardDescription>
                Keep your startup information current and attractive to investors
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Edit Profile</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">View Interest Requests</CardTitle>
              <CardDescription>
                Review and respond to investor interest in your startup
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">View Requests</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>
                Track your profile performance and investor engagement
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline">View Analytics</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
