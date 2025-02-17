import "@repo/ui/globals.css";

import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import NextTopLoader from "nextjs-toploader";

import { routing } from "@/i18n/routing";
import AppProvider from "@/providers/app-provider";
import ThemeProvider from "@/providers/theme-provider";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { Toaster } from "@repo/ui/components/toaster";
import { baseOpenGraph } from "@/shared-metadata";
import { Locale } from "@/config";

const font = localFont({
  src: [
    {
      path: "../fonts/BeVietnamPro-Light.ttf",
      weight: "300",
    },
    {
      path: "../fonts/BeVietnamPro-Regular.ttf",
      weight: "400",
    },
    {
      path: "../fonts/BeVietnamPro-Medium.ttf",
      weight: "500",
    },
    {
      path: "../fonts/BeVietnamPro-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../fonts/BeVietnamPro-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "Brand" });
  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("defaultTitle"),
    },
    openGraph: {
      ...baseOpenGraph,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${font.className} ${font.variable}`}>
        <NextTopLoader showSpinner={false} color="hsl(var(--foreground))" />
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
