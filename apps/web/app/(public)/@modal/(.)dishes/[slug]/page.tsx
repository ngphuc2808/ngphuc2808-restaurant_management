import dishApiRequest from "@/apiRequests/dish";
import Modal from "@/app/(public)/@modal/(.)dishes/[slug]/modal";
import DishDetail from "@/app/(public)/dishes/[slug]/dish-detail";
import { getIdFromSlugUrl, wrapServerApi } from "@/lib/utils";

const DishPage = async (props: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const id = getIdFromSlugUrl(slug);
  const data = await wrapServerApi(() => dishApiRequest.getDish(Number(id)));
  const dish = data?.payload?.data;

  return (
    <Modal>
      <DishDetail dish={dish} />
    </Modal>
  );
};

export default DishPage;
