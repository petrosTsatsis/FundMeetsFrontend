"use client";

import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/lib/api";

// Fetch dashboard metrics from the API with cashing and retrying
export function useDashboardMetrics() {
    const api = useApi();

    return useQuery({
        queryKey: ["dashboard-metrics"],
        queryFn: () => api?.getAppMetrics() ?? Promise.reject("API not available"),
        enabled: !!api,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Fetch recommended startups from the API with cashing and retrying and better performance
export function useRecommendedStartups() {
    const api = useApi();

    return useQuery({
        queryKey: ["recommended-startups"],
        queryFn: () => api?.getRecommendedStartups() ?? Promise.reject("API not available"),
        enabled: !!api,
        staleTime: 3 * 60 * 1000, // 3 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on 400 errors (user needs investor profile)
            if (error?.response?.status === 400) {
                return false;
            }
            return failureCount < 2;
        },
    });
}

// Fetch recommended investors from the API with cashing and retrying and better performance
export function useRecommendedInvestors() {
    const api = useApi();

    return useQuery({
        queryKey: ["recommended-investors"],
        queryFn: () => api?.getRecommendedInvestors() ?? Promise.reject("API not available"),
        enabled: !!api,
        staleTime: 3 * 60 * 1000, // 3 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on 400 errors (user needs investor profile)
            if (error?.response?.status === 400) {
                return false;
            }
            return failureCount < 2;
        },
    });
}

export function useTopInvestors() {
    const api = useApi();

    return useQuery({
        queryKey: ["top-investors"],
        queryFn: () => api?.getTopInvestors() ?? Promise.reject("API not available"),
        enabled: !!api,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 15 * 60 * 1000, // 15 minutes
    });
}
