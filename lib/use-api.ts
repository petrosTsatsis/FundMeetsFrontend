"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { ApiClient } from "./api";

export function useApi() {
  const { getToken, userId } = useAuth();
  const [api, setApi] = useState<ApiClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApi = async () => {
      const client = new ApiClient();
      if (getToken && userId) {
        try {
          const token = await getToken({ template: "FundMeets" });
          client.setToken(token);
          client.setUserId(userId);
          setApi(client);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
      setIsLoading(false);
    };

    initializeApi();
  }, [getToken, userId]);

  useEffect(() => {
    if (!api || !getToken) {
      return;
    }

    let isMounted = true;

    getToken({ template: "FundMeets" })
      .then((token) => {
        if (isMounted) {
          api.setToken(token);
        }
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [api, getToken]);

  if (isLoading || !api) {
    return null;
  }

  return api;
}
