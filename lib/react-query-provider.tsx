"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useState} from "react";

export function ReactQueryProvider({children}: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Cache for 5 minutes by default
                        staleTime: 5 * 60 * 1000,
                        // Keep in cache for 10 minutes
                        gcTime: 10 * 60 * 1000,
                        // Retry failed requests 2 times
                        retry: 2,
                        // Refetch on window focus only if data is stale
                        refetchOnWindowFocus: false,
                        // Don't refetch on reconnect if data is fresh
                        refetchOnReconnect: "always",
                    },
                    mutations: {
                        // Retry mutations once
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
