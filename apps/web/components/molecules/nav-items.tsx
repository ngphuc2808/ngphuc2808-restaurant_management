"use client";

import Link from "next/link";
import React from "react";

import { useAppContext } from "@/providers/app-provider";
import { useLogoutMutation } from "@/queries/useAuth";
import { useGuestLogoutMutation } from "@/queries/useGuest";
import { cn } from "@repo/ui/lib/utils";
import { menuItemsHomePage } from "@/constants";
import { useRouter } from "next/navigation";
import { Role } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils";

const NavItems = ({ className }: { className?: string }) => {
  const { role, setRole } = useAppContext();
  const router = useRouter();

  const logoutMutation = useLogoutMutation();
  const logoutGuestMutation = useGuestLogoutMutation();

  const logout = async () => {
    try {
      if (role !== Role.Guest) {
        if (logoutMutation.isPending) return;
        await logoutMutation.mutateAsync();
      } else {
        if (logoutGuestMutation.isPending) return;
        await logoutGuestMutation.mutateAsync();
      }
      setRole();
      router.push("/");
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };

  return (
    <>
      {menuItemsHomePage.map((item) => {
        const isAuth = item.roles && role && item.roles.includes(role);
        const canShow =
          (!item.roles && !item.hideWhenLogin) || (!role && item.hideWhenLogin);

        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {item.title}
            </Link>
          );
        }

        return null;
      })}
      {role && (
        <div className={cn(className, "cursor-pointer")} onClick={logout}>
          Đăng xuất
        </div>
      )}
    </>
  );
};

export default NavItems;
