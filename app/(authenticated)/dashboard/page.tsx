"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi, UserData } from "@/lib/api";
import { UserProfileProvider } from "@/lib/UserProfileContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/complete-components/sidebar/app-sidebar";
import { DashboardContent } from "./dashboard-content";

const userProfileQueryKey = (userId: string | null | undefined) => [
  "user-profile",
  userId,
];

function LoadingState({
  label,
  variant = "spinner",
}: {
  label: string;
  variant?: "spinner" | "pulse";
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4" role="status">
          {variant === "spinner" ? (
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          ) : (
            <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
          )}
          <p className="text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const api = useApi();
  const queryClient = useQueryClient();
  const [currentSection, setCurrentSection] = useState("overview");
  const [isSectionPending, startSectionTransition] = useTransition();

  const userId = useMemo(() => user?.id ?? null, [user?.id]);
  const queryKey = useMemo(() => userProfileQueryKey(userId), [userId]);

  const cachedProfile = useMemo(() => {
    if (!userId) return undefined;
    return queryClient.getQueryData<UserData>(queryKey);
  }, [queryClient, queryKey, userId]);

  const {
    data: userProfile,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => api!.getUserProfile(userId as string),
    enabled: Boolean(isLoaded && api && userId),
    placeholderData: cachedProfile ?? undefined,
  });

  useEffect(() => {
    if (!api || !userId || cachedProfile) return;

    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => api.getUserProfile(userId),
    });
  }, [api, cachedProfile, queryClient, queryKey, userId]);

  useEffect(() => {
    if (!error) return;

    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching user profile:", error);
    }

    router.replace("/");
  }, [error, router]);

  const handleSectionChange = useCallback((section: string) => {
    startSectionTransition(() => {
      setCurrentSection(section);
    });
  }, [startSectionTransition]);

  const isStartup = userProfile?.role === "STARTUP";

  if (!isLoaded || !api) {
    return <LoadingState label="Preparing your dashboard..." variant="pulse" />;
  }

  if (isLoading && !userProfile) {
    return <LoadingState label="Loading dashboard..." />;
  }

  if (!userProfile) {
    return <LoadingState label="Initializing..." variant="pulse" />;
  }

  return (
    <Suspense fallback={null}>
      <SidebarProvider>
        <UserProfileProvider initialProfile={userProfile}>
          <AppSidebar
            onSectionChange={handleSectionChange}
            currentSection={currentSection}
          />
          <DashboardContent
            currentSection={currentSection}
            isStartup={Boolean(isStartup)}
            userProfile={userProfile}
            isSectionTransitioning={isSectionPending}
            isRefreshing={isFetching && Boolean(userProfile)}
          />
        </UserProfileProvider>
      </SidebarProvider>
    </Suspense>
  );
}
