import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { htmlToTextForDescription } from "@/lib/server-utils";
import { Badge } from "@repo/ui/components/badge";
import ChangePasswordForm from "@/app/[locale]/manage/setting/change-password-form";
import UpdateProfileForm from "@/app/[locale]/manage/setting/update-profile-form";
import { envConfig } from "@/config";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Setting",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/setting`;

  return {
    title: t("title"),
    description: htmlToTextForDescription(t("description")),
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
    },
  };
}

const SettingPage = () => {
  return (
    <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Cài đặt
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          Owner
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        <UpdateProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default SettingPage;
