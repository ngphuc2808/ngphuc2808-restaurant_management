"use client";

import Link from "next/link";
import React from "react";

import { useAppContext } from "@/providers/app-provider";
import { menuItemsHomePage } from "@/constants";

const NavItems = ({ className }: { className?: string }) => {
  const { isAuth } = useAppContext();

  return menuItemsHomePage.map((item) => {
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
