import { cache } from "react";

import dishApiRequest from "@/apiRequests/dish";
import { getIdFromSlugUrl, wrapServerApi } from "@/lib/utils";
import DishDetail from "@/app/(public)/dishes/[slug]/dish-detail";

const getDetail = cache((id: number) =>
  wrapServerApi(() => dishApiRequest.getDish(id)),
);

const DishPage = async (props: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const id = getIdFromSlugUrl(slug);
  const data = await getDetail(id);
  const dish = data?.payload?.data;

  return <DishDetail dish={dish} />;
};

export default DishPage;
