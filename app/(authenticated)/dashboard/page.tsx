"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import { useApi, UserData } from "@/lib/api";
import { UserProfileProvider } from "@/lib/UserProfileContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/complete-components/sidebar/app-sidebar";
import { DashboardContent } from "./dashboard-content";

// Cache for user profiles to avoid refetching
const profileCache = new Map<
  string,
  { profile: UserData; timestamp: number }
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const api = useApi();
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [isStartup, setIsStartup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("overview");

  // Memoize the user ID to avoid unnecessary re-renders
  const userId = useMemo(() => user?.id, [user?.id]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isLoaded || !userId || !api) return;

      try {
        // Check cache first
        const cached = profileCache.get(userId);
        const now = Date.now();

        if (cached && now - cached.timestamp < CACHE_DURATION) {
          // Use cached profile - instant load!
          setUserProfile(cached.profile);
          setIsStartup(cached.profile.role === "STARTUP");
          return;
        }

        // Only show loading for actual API calls
        setIsLoading(true);

        // Fetch fresh profile
        const profile = await api.getUserProfile(userId);

        // Cache the profile
        profileCache.set(userId, { profile, timestamp: now });

        setUserProfile(profile);
        setIsStartup(profile.role === "STARTUP");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        router.push("/select-role");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [isLoaded, userId, api, router]);

  // Show loading only during actual API calls
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // If no profile yet, show minimal loading
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-pulse rounded-full h-12 w-12 bg-muted"></div>
            <p className="text-muted-foreground">Initializing...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <SidebarProvider>
        <UserProfileProvider initialProfile={userProfile}>
          <div className="flex h-screen">
            <AppSidebar
              onSectionChange={setCurrentSection}
              currentSection={currentSection}
            />
            <DashboardContent
              currentSection={currentSection}
              isStartup={isStartup}
              userProfile={userProfile}
            />
          </div>
        </UserProfileProvider>
      </SidebarProvider>
    </Suspense>
  );
}
