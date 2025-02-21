import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PrivacyPolicy from "@/app/[locale]/(public)/privacy-policy/privacy-policy";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
