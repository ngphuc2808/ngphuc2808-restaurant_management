"use client";

import React from "react";
import Link from "next/link";

import { getAccessTokenFromLocalStorage } from "@/lib/utils";
import { useAppContext } from "@/providers/app-provider";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu",
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    authRequired: true,
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true,
  },
];

const NavItems = ({ className }: { className?: string }) => {
  const { isAuth } = useAppContext();

  return menuItems.map((item) => {
    if ((item.authRequired && !isAuth) || (!item.authRequired && isAuth))
      return null;

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
};

export default NavItems;
