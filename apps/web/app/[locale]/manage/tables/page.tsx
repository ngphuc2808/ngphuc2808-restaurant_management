import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { htmlToTextForDescription } from "@/lib/server-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import TableTable from "@/app/[locale]/manage/tables/table-table";
import { envConfig } from "@/config";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Tables",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/tables`;

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

const TablesPage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Bàn ăn</CardTitle>
          <CardDescription>Quản lý bàn ăn</CardDescription>
        </CardHeader>
        <CardContent>
          <TableTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default TablesPage;
