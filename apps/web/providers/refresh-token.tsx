"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppStore } from "@/providers/app-provider";
import { checkAndRefreshToken } from "@/lib/utils";
import { TIMEOUT, UNAUTHENTICATED_PATH } from "@/constants";

const RefreshToken = () => {
  const socket = useAppStore((state) => state.socket);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;
    let interval: any = null;

    const onRefreshToken = (force?: boolean) => {
      checkAndRefreshToken({
        onError: () => {
          clearInterval(interval);
          disconnectSocket();
          router.push("/login");
        },
        force,
      });
    };

    interval = setInterval(() => onRefreshToken, TIMEOUT);

    function onRefreshTokenSocket() {
      onRefreshToken(true);
    }

    socket?.on("refresh-token", onRefreshTokenSocket);

    return () => {
      clearInterval(interval);
      socket?.off("refresh-token", onRefreshTokenSocket);
    };
  }, [socket, disconnectSocket, pathname, router]);

  return null;
};

export default RefreshToken;
