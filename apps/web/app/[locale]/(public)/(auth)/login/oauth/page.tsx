import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

import Oauth from "@/app/[locale]/(public)/(auth)/login/oauth/oauth";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "OAuth" });

  return {
    title: t("title"),
    robots: {
      index: false,
    },
  };
}

const OAuthPage = () => {
  return (
    <Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Oauth />
    </Suspense>
  );
};

export default OAuthPage;
