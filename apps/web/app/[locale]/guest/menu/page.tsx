import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import dishApiRequest from "@/apiRequests/dish";
import { DishListResType } from "@/schemaValidations/dish.schema";
import { htmlToTextForDescription } from "@/lib/server-utils";
import MenuOrder from "@/app/[locale]/guest/menu/menu-order";
import { envConfig } from "@/config";
import { baseOpenGraph } from "@/shared-metadata";

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "GuestMenu",
  });

  const url = envConfig.NEXT_PUBLIC_URL + `/${params.locale}/guest/menu`;

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

const MenuPage = async () => {
  let dishes: DishListResType["data"] = [];
  try {
    const result = await dishApiRequest.list();
    const {
      payload: { data },
    } = result;
    dishes = data;
  } catch (error) {
    throw error;
  }

  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 Menu quán</h1>
      <MenuOrder dishes={dishes} />
    </div>
  );
};

export default MenuPage;
