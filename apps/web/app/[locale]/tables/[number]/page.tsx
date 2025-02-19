import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { htmlToTextForDescription } from "@/lib/server-utils";
import GuestLoginForm from "@/app/[locale]/tables/[number]/guest-login-form";
import { envConfig } from "@/config";
import { baseOpenGraph } from "@/shared-metadata";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "LoginGuest",
  });

  const url =
    envConfig.NEXT_PUBLIC_URL + `/${params.locale}/tables/${params.number}`;

  return {
    title: `No ${params.number} | ${t("title")}`,
    description: htmlToTextForDescription(t("description")),
    openGraph: {
      ...baseOpenGraph,
      title: `No ${params.number} | ${t("title")}`,
      description: htmlToTextForDescription(t("description")),
      url,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
    },
  };
}

const TableNumberPage = () => {
  return <GuestLoginForm />;
};

export default TableNumberPage;
