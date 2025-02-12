import {
  Home,
  LayoutDashboard,
  LineChart,
  ShoppingCart,
  Users2,
  Salad,
  Table,
} from "lucide-react";

export const TIMEOUT = 1000;
export const UNAUTHENTICATED_PATH = ["/login", "/logout", "/refresh-token"];

export const menuItemsHomePage = [
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

export const menuItems = [
  {
    title: "Trang chủ",
    Icon: Home,
    href: "/",
  },
  {
    title: "Dashboard",
    Icon: LayoutDashboard,
    href: "/manage/dashboard",
  },
  {
    title: "Đơn hàng",
    Icon: ShoppingCart,
    href: "/manage/orders",
  },
  {
    title: "Bàn ăn",
    Icon: Table,
    href: "/manage/tables",
  },
  {
    title: "Món ăn",
    Icon: Salad,
    href: "/manage/dishes",
  },

  {
    title: "Phân tích",
    Icon: LineChart,
    href: "/manage/analytics",
  },
  {
    title: "Nhân viên",
    Icon: Users2,
    href: "/manage/accounts",
  },
];
