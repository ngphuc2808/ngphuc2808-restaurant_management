import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import dishApiRequest from "@/apiRequests/dish";
import { DishListResType } from "@/schemaValidations/dish.schema";
import { formatCurrency, generateSlugUrl, wrapServerApi } from "@/lib/utils";
import { htmlToTextForDescription } from "@/lib/server-utils";
import { envConfig } from "@/config";
import { baseOpenGraph } from "@/shared-metadata";
import { cache } from "react";

const getDishList = cache(() => wrapServerApi(() => dishApiRequest.list()));

export async function generateMetadata(props: GlobalProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "HomePage" });
  const url = envConfig.NEXT_PUBLIC_URL + `/${locale}`;

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
  };
}

const HomePage = async () => {
  const t = await getTranslations("HomePage");

  const dishList = await getDishList();

  return (
    <div className="w-full space-y-4">
      <section className="relative z-10">
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></span>
        <Image
          src="/banner.png"
          width={400}
          height={200}
          quality={80}
          loading="lazy"
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="z-20 relative py-10 md:py-20 px-4 sm:px-10 md:px-20">
          <h1 className="text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h1>
          <p className="text-center text-sm sm:text-base mt-4">{t("slogan")}</p>
        </div>
      </section>
      <section className="space-y-10 py-16">
        <h2 className="text-center text-2xl font-bold">{t("h2")}</h2>
        {dishList && dishList?.payload?.data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {dishList?.payload?.data.map((dish) => (
              <Link
                href={`/dishes/${generateSlugUrl({
                  name: dish.name,
                  id: dish.id,
                })}`}
                className="flex gap-4 w"
                key={dish.id}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={dish.image}
                    width={150}
                    height={150}
                    quality={80}
                    loading="lazy"
                    alt={dish.name}
                    className="object-cover w-[150px] h-[150px] rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <p className="">{dish.description}</p>
                  <p className="font-semibold">{formatCurrency(dish.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">Không có dữ liệu</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
