import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import AccountTable from "@/app/[locale]/manage/accounts/account-table";
import { envConfig } from "@/config";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ManageAccounts",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/accounts`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
    },
  };
}

const AccountPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Tài khoản</CardTitle>
          <CardDescription>Quản lý tài khoản nhân viên</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
