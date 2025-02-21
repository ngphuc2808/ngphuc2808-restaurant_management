import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import TermOfService from "@/app/[locale]/(public)/term-of-service/term-of-service";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "TermOfService" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const TermsOfServicePage = () => {
  return <TermOfService />;
};

export default TermsOfServicePage;
