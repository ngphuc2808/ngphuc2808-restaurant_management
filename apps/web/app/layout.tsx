import "@repo/ui/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@repo/ui/lib/utils";
import { Toaster } from "@repo/ui/components/ui/toaster";
import ThemeProvider from "@/providers/theme-provider";
import AppProvider from "@/providers/app-provider";

const font = localFont({
  src: [
    {
      path: "./fonts/BeVietnamPro-Light.ttf",
      weight: "300",
    },
    {
      path: "./fonts/BeVietnamPro-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/BeVietnamPro-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/BeVietnamPro-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/BeVietnamPro-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Big Boy Restaurant",
  description: "The best restaurant in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          `${font.className} ${font.variable}`,
        )}
      >
        <NextTopLoader showSpinner={false} color="hsl(var(--primary))" />
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
