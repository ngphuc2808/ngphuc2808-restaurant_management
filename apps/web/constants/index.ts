import {
  Home,
  LayoutDashboard,
  ShoppingCart,
  Users2,
  Salad,
  Table,
  Settings,
} from "lucide-react";

import { Role } from "./type";
import { RoleType } from "@/types/jwt.types";

export const TIMEOUT = 1000;
export const UNAUTHENTICATED_PATH = ["/login", "/logout", "/refresh-token"];

export const menuItemsHomePage: {
  title: string;
  href: string;
  roles?: RoleType[];
  hideWhenLogin?: boolean;
}[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Menu",
    href: "/guest/menu",
    roles: [Role.Guest],
  },
  {
    title: "Đơn hàng",
    href: "/guest/orders",
    roles: [Role.Guest],
  },
  {
    title: "Đăng nhập",
    href: "/login",
    hideWhenLogin: true,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    roles: [Role.Owner],
  },
  {
    title: "Đơn hàng",
    href: "/manage/orders",
    roles: [Role.Employee],
  },
];

export const menuItems = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Trang chủ",
          icon: Home,
          url: "/",
          roles: [Role.Owner, Role.Employee],
        },
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/manage/dashboard",
          roles: [Role.Owner],
        },
        {
          title: "Đơn hàng",
          icon: ShoppingCart,
          url: "/manage/orders",
          roles: [Role.Owner, Role.Employee],
        },
        {
          title: "Bàn ăn",
          icon: Table,
          url: "/manage/tables",
          roles: [Role.Owner, Role.Employee],
        },
        {
          title: "Món ăn",
          icon: Salad,
          url: "/manage/dishes",
          roles: [Role.Owner, Role.Employee],
        },
        {
          title: "Nhân viên",
          icon: Users2,
          url: "/manage/accounts",
          roles: [Role.Owner],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Cài đặt",
          icon: Settings,
          url: "/manage/setting",
        },
      ],
    },
  ],
};
