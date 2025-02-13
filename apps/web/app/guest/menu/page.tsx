import dishApiRequest from "@/apiRequests/dish";
import MenuOrder from "@/app/guest/menu/menu-order";
import { DishListResType } from "@/schemaValidations/dish.schema";

const MenuPage = async () => {
  let dishes: DishListResType["data"] = [];
  try {
    const result = await dishApiRequest.list();
    const {
      payload: { data },
    } = result;
    dishes = data;
  } catch (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 Menu quán</h1>
      <MenuOrder dishes={dishes} />
    </div>
  );
};

export default MenuPage;
