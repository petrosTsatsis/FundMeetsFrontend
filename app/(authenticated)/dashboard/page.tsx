import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { DashboardShell } from "./dashboard-shell";
import { createServerApiClient } from "@/lib/server-api";
import type { UserData } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const { api, userId } = await createServerApiClient();
  const queryClient = new QueryClient();

  let userProfile: UserData;

  try {
    userProfile = await queryClient.fetchQuery<UserData>({
      queryKey: ["user-profile", userId],
      queryFn: () => api.getUserProfile(userId),
      staleTime: 60 * 1000,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load dashboard profile", error);
    }
    redirect("/");
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardShell userId={userId} initialProfile={userProfile} />
    </HydrationBoundary>
  );
}
