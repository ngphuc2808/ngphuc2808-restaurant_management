import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import { htmlToTextForDescription } from "@/lib/server-utils";
import LoginForm from "@/app/[locale]/(public)/(auth)/login/login-form";
import { envConfig } from "@/config";
import { baseOpenGraph } from "@/shared-metadata";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "Login" });
  const url = envConfig.NEXT_PUBLIC_URL + `/${locale}/login`;

  return {
    title: t("title"),
    description: htmlToTextForDescription(t("description")),
    openGraph: {
      ...baseOpenGraph,
      title: t("title"),
      description: htmlToTextForDescription(t("description")),
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
