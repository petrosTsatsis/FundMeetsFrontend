import type {Metadata, Viewport} from "next";
import {ClerkProvider} from "@clerk/nextjs";
import {DM_Sans} from "next/font/google";
import {ReactQueryProvider} from "@/lib/react-query-provider";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Fund Meets",
    description: "Fund Meets",
    icons: {
        icon: "/logo.png",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0e7490",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <head>
                {/* Preconnect to external domains for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                {/* Service Worker Registration */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
                    }}
                />
            </head>
            <body className={`${dmSans.className} antialiased`}>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
