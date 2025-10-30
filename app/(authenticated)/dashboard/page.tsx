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

const resolveCachedProfile = (
  userId: string
): CachedProfileEntry | null => {
  const now = Date.now();
  const cached = profileCache.get(userId);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached;
  }

  const stored = loadProfileFromStorage(userId);
  if (stored) {
    profileCache.set(userId, stored);
    return stored;
  }

  profileCache.delete(userId);
  return null;
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const api = useApi();

  // Memoize the user ID to avoid unnecessary re-renders
  const userId = useMemo(() => user?.id, [user?.id]);
  const warmProfileEntry = useMemo(
    () => (userId ? resolveCachedProfile(userId) : null),
    [userId]
  );
  const [userProfile, setUserProfile] = useState<UserData | null>(
    () => warmProfileEntry?.profile ?? null
  );
  const [isStartup, setIsStartup] = useState(
    () => warmProfileEntry?.profile?.role === "STARTUP"
  );
  const [currentSection, setCurrentSection] = useState("overview");
  const [hasWarmCache, setHasWarmCache] = useState(
    () => warmProfileEntry !== null
  );

  useEffect(() => {
    if (!userId) {
      setUserProfile(null);
      setIsStartup(false);
      setHasWarmCache(false);
      return;
    }

    if (warmProfileEntry) {
      profileCache.set(userId, warmProfileEntry);
      setUserProfile(warmProfileEntry.profile);
      setIsStartup(warmProfileEntry.profile.role === "STARTUP");
      setHasWarmCache(true);
      return;
    }

    setHasWarmCache(false);
  }, [userId, warmProfileEntry]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isLoaded || !userId || !api) return;

      try {
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
      }
    };

    checkUserRole();
  }, [isLoaded, userId, api, router, hasWarmCache]);

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
