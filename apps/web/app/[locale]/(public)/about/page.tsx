import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import About from "@/app/[locale]/(public)/about/about";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
