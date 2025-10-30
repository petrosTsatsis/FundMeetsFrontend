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
type CachedProfileEntry = { profile: UserData; timestamp: number };
const profileCache = new Map<string, CachedProfileEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const PROFILE_STORAGE_PREFIX = "fm-dashboard-profile";

const getProfileStorageKey = (userId: string) =>
  `${PROFILE_STORAGE_PREFIX}:${userId}`;

const loadProfileFromStorage = (
  userId: string
): CachedProfileEntry | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(getProfileStorageKey(userId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedProfileEntry | null;
    if (!parsed?.profile || typeof parsed.timestamp !== "number") {
      window.sessionStorage.removeItem(getProfileStorageKey(userId));
      return null;
    }

    if (Date.now() - parsed.timestamp > CACHE_DURATION) {
      window.sessionStorage.removeItem(getProfileStorageKey(userId));
      return null;
    }

    return parsed;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to read cached profile from sessionStorage", error);
    }
    return null;
  }
};

const saveProfileToStorage = (userId: string, entry: CachedProfileEntry) => {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(
      getProfileStorageKey(userId),
      JSON.stringify(entry)
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to cache profile in sessionStorage", error);
    }
  }
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const api = useApi();
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [isStartup, setIsStartup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("overview");
  const [hasWarmCache, setHasWarmCache] = useState(false);

  // Memoize the user ID to avoid unnecessary re-renders
  const userId = useMemo(() => user?.id, [user?.id]);

  useEffect(() => {
    if (!userId) {
      setUserProfile(null);
      setIsStartup(false);
      setHasWarmCache(false);
      return;
    }

    const now = Date.now();
    const cached = profileCache.get(userId);

    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setUserProfile(cached.profile);
      setIsStartup(cached.profile.role === "STARTUP");
      setHasWarmCache(true);
      return;
    }

    const stored = loadProfileFromStorage(userId);
    if (stored) {
      profileCache.set(userId, stored);
      setUserProfile(stored.profile);
      setIsStartup(stored.profile.role === "STARTUP");
      setHasWarmCache(true);
      return;
    }

    setHasWarmCache(false);
  }, [userId]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isLoaded || !userId || !api) return;

      try {
        // Only show loading for actual API calls
        if (!hasWarmCache) {
          setIsLoading(true);
        }

        // Fetch fresh profile
        const profile = await api.getUserProfile(userId);
        const now = Date.now();
        const entry: CachedProfileEntry = { profile, timestamp: now };

        // Cache the profile
        profileCache.set(userId, entry);
        saveProfileToStorage(userId, entry);

        setUserProfile(profile);
        setIsStartup(profile.role === "STARTUP");
        setHasWarmCache(true);
      } catch (error) {
        // Only log errors in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching user profile:", error);
        }
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [isLoaded, userId, api, router, hasWarmCache]);

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
          {/* <div className="flex h-screen"> */}
          <AppSidebar
            onSectionChange={setCurrentSection}
            currentSection={currentSection}
          />
          <DashboardContent
            currentSection={currentSection}
            isStartup={isStartup}
            userProfile={userProfile}
          />
          {/* </div> */}
        </UserProfileProvider>
      </SidebarProvider>
    </Suspense>
  );
}
