import Image from "next/image";

import { DishResType } from "@/schemaValidations/dish.schema";
import { formatCurrency } from "@/lib/utils";

const DishDetail = ({ dish }: { dish: DishResType["data"] | undefined }) => {
  if (!dish)
    return (
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold">
          Món ăn không tồn tại
        </h1>
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-semibold">{dish.name}</h1>
      <div className="font-semibold">Giá: {formatCurrency(dish.price)}</div>
      <Image
        src={dish.image}
        width={500}
        height={500}
        quality={100}
        alt={dish.name}
        className="object-cover w-full h-full rounded-md"
        title={dish.name}
        loading="lazy"
      />
      <p>{dish.description}</p>
    </div>
  );
};

export default DishDetail;
