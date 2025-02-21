import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { htmlToTextForDescription } from "@/lib/server-utils";
import OrdersCart from "@/app/[locale]/guest/orders/orders-cart";
import { envConfig } from "@/config";
import { baseOpenGraph } from "@/shared-metadata";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "GuestOrders",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/guest/orders`;

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
    robots: {
      index: false,
    },
  };
}

const OrdersGuestPage = () => {
  return <OrdersCart />;
};

export default OrdersGuestPage;
