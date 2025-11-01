"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/complete-components/sidebar/app-sidebar";
import { DashboardContent } from "./dashboard-content";
import { UserProfileProvider } from "@/lib/UserProfileContext";
import { UserData } from "@/lib/api";
import { useApi } from "@/lib/use-api";

interface DashboardShellProps {
  userId: string;
  initialProfile: UserData | null;
}

const userProfileQueryKey = (userId: string) => ["user-profile", userId];

export function DashboardShell({ userId, initialProfile }: DashboardShellProps) {
  const router = useRouter();
  const api = useApi();
  const queryClient = useQueryClient();
  const [currentSection, setCurrentSection] = useState("overview");
  const [isSectionPending, startSectionTransition] = useTransition();

  const queryKey = useMemo(() => userProfileQueryKey(userId), [userId]);

  useEffect(() => {
    if (initialProfile) {
      queryClient.setQueryData(queryKey, initialProfile);
    }
  }, [initialProfile, queryClient, queryKey]);

  const {
    data: userProfile,
    isFetching,
    error,
  } = useQuery<UserData | undefined>({
    queryKey,
    queryFn: () => api!.getUserProfile(userId),
    enabled: Boolean(api),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    initialData: initialProfile ?? undefined,
  });

  useEffect(() => {
    if (!error) return;

    const status = (error as { response?: Response })?.response?.status;
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching user profile:", error);
    }

    if (status === 401 || status === 403) {
      router.replace("/");
    }
  }, [error, router]);

  const handleSectionChange = useCallback(
    (section: string) => {
      startSectionTransition(() => {
        setCurrentSection(section);
      });
    },
    [startSectionTransition]
  );

  const resolvedProfile = useMemo(
    () => userProfile ?? initialProfile,
    [initialProfile, userProfile]
  );
  const isStartup = resolvedProfile?.role === "STARTUP";

  if (!resolvedProfile) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Loading your dashboard…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <UserProfileProvider initialProfile={resolvedProfile}>
        <AppSidebar
          onSectionChange={handleSectionChange}
          currentSection={currentSection}
        />
        <DashboardContent
          currentSection={currentSection}
          isStartup={Boolean(isStartup)}
          userProfile={resolvedProfile}
          isSectionTransitioning={isSectionPending}
          isRefreshing={isFetching && Boolean(resolvedProfile)}
        />
      </UserProfileProvider>
    </SidebarProvider>
  );
}

export default DashboardShell;
