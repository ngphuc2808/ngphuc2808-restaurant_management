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
import OrderTable from "@/app/[locale]/manage/orders/order-table";
import { envConfig } from "@/config";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Orders",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/manage/orders`;

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

const OrdersManagePage = () => {
  return (
    <div className="space-y-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Đơn hàng</CardTitle>
          <CardDescription>Quản lý đơn hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagePage;
