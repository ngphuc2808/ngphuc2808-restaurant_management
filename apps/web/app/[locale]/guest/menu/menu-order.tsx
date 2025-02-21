"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { useRouter } from "@/i18n/routing";
import { DishListResType } from "@/schemaValidations/dish.schema";
import { GuestCreateOrdersBodyType } from "@/schemaValidations/guest.schema";
import { useGuestOrderMutation } from "@/queries/useGuest";
import { formatCurrency, handleErrorApi } from "@/lib/utils";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { DishStatus } from "@/constants/type";
import Quantity from "@/app/[locale]/guest/menu/quantity";

type Props = {
  dishes: DishListResType["data"];
};

const MenuOrder = ({ dishes }: Props) => {
  const t = useTranslations("GuestMenu");
  const tAll = useTranslations("All");

  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([]);
  const { mutateAsync } = useGuestOrderMutation();
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return dishes.reduce((result, dish) => {
      const order = orders.find((order) => order.dishId === dish.id);
      if (!order) return result;
      return result + order.quantity * dish.price;
    }, 0);
  }, [dishes, orders]);

  const handleQuantityChange = (dishId: number, quantity: number) => {
    setOrders((prevOrders) => {
      if (quantity === 0) {
        return prevOrders.filter((order) => order.dishId !== dishId);
      }
      const index = prevOrders.findIndex((order) => order.dishId === dishId);
      if (index === -1) {
        return [...prevOrders, { dishId, quantity }];
      }
      const newOrders = [...prevOrders];
      newOrders[index] = { dishId: newOrders[index]?.dishId!, quantity };
      return newOrders;
    });
  };

  const handleOrder = async () => {
    try {
      await mutateAsync(orders);
      router.push(`/guest/orders`);
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };

  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 {t("title")}</h1>
      {dishes
        .filter((dish) => dish.status !== DishStatus.Hidden)
        .map((dish) => (
          <div
            key={dish.id}
            className={cn("flex gap-4", {
              "pointer-events-none": dish.status === DishStatus.Unavailable,
            })}
          >
            <div className="flex-shrink-0 relative">
              {dish.status === DishStatus.Unavailable && (
                <span className="text-center absolute inset-0 flex items-center justify-center text-sm rounded-md bg-slate-600/50 text-white">
                  {t("outOfFood")}
                </span>
              )}
              <Image
                src={dish.image}
                alt={dish.name}
                height={100}
                width={100}
                quality={80}
                className="object-cover w-[80px] h-[80px] rounded-md"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">{dish.name}</h3>
              <p className="text-xs">{dish.description}</p>
              <p className="text-xs font-semibold">
                {formatCurrency(dish.price)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-auto flex justify-center items-center">
              <Quantity
                onChange={(value) => handleQuantityChange(dish.id, value)}
                value={
                  orders.find((order) => order.dishId === dish.id)?.quantity ??
                  0
                }
              />
            </div>
          </div>
        ))}
      <div className="sticky bottom-0">
        <Button
          className="w-full justify-between"
          onClick={handleOrder}
          disabled={orders.length === 0}
        >
          <span>
            {t("order")} · {orders.length} {tAll("dishes").toLowerCase()}
          </span>
          <span>{formatCurrency(totalPrice)}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuOrder;
