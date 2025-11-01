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
          let token = await getToken({ template: "FundMeets" });

          if (!token) {
            token = await getToken();
          }

          client.setToken(token ?? null);
        } catch (error) {
          console.error("Error getting token:", error);
          client.setToken(null);
        }

        client.setUserId(userId);
        setApi(client);
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
      .then(async (token) => {
        if (!token) {
          token = await getToken();
        }

        if (isMounted) {
          api.setToken(token ?? null);
        }
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        if (isMounted) {
          api.setToken(null);
        }
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
