import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ApiClient } from "./api";

interface ServerApiClientResult {
  api: ApiClient;
  userId: string;
}

export async function createServerApiClient(): Promise<ServerApiClientResult> {
  const { userId, getToken } = auth();

  if (!userId) {
    redirect("/");
  }

  const client = new ApiClient();
  client.setUserId(userId);

  if (getToken) {
    try {
      const token = await getToken({ template: "FundMeets" });
      client.setToken(token ?? null);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to resolve server token", error);
      }
    }
  }

  return { api: client, userId };
}
