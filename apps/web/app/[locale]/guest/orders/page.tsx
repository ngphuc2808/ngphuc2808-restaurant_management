import { Metadata } from "next";

import OrdersCart from "@/app/[locale]/guest/orders/orders-cart";
import { getTranslations } from "next-intl/server";
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
    description: t("description"),
    openGraph: {
      ...baseOpenGraph,
      title: t("title"),
      description: t("description"),
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
  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">Đơn hàng</h1>
      <OrdersCart />
    </div>
  );
};

export default OrdersGuestPage;
