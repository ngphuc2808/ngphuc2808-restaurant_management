import dishApiRequest from "@/apiRequests/dish";
import { DishListResType } from "@/schemaValidations/dish.schema";
import MenuOrder from "@/app/guest/menu/menu-order";

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
