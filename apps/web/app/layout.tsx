import "@repo/ui/globals.css";

import { cookies } from "next/headers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@repo/ui/components/toaster";
import ThemeProvider from "@/providers/theme-provider";
import AppProvider from "@/providers/app-provider";
import { SidebarProvider } from "@repo/ui/components/sidebar";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} ${font.variable}`}>
        <NextTopLoader showSpinner={false} color="hsl(var(--foreground))" />
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultOpen}>
              {children}
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
