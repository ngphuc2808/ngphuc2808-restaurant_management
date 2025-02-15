"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useAppStore } from "@/providers/app-provider";
import { useLogoutMutation } from "@/queries/useAuth";
import { handleErrorApi } from "@/lib/utils";
import { UNAUTHENTICATED_PATH } from "@/constants";

const ListenLogoutSocket = () => {
  const setRole = useAppStore((state) => state.setRole);
  const socket = useAppStore((state) => state.socket);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);

  const pathname = usePathname();
  const router = useRouter();

  const { isPending, mutateAsync } = useLogoutMutation();

  React.useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;

    async function onLogout() {
      if (isPending) return;
      try {
        await mutateAsync();
        setRole(undefined);
        disconnectSocket();
        router.push("/");
      } catch (error: any) {
        handleErrorApi({
          error,
        });
      }
    }

    socket?.on("logout", onLogout);
    return () => {
      socket?.off("logout", onLogout);
    };
  }, [
    socket,
    disconnectSocket,
    pathname,
    setRole,
    router,
    isPending,
    mutateAsync,
  ]);

  return null;
};

export default ListenLogoutSocket;
