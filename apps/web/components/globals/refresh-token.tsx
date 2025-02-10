"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { TIMEOUT, UNAUTHENTICATED_PATH } from "@/constants";
import { checkAndRefreshToken } from "@/lib/utils";

const RefreshToken = () => {
  const pathname = usePathname();
  const router = useRouter();
  React.useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;
    let interval: any = null;
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
        router.push("/login");
      },
    });

    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
            router.push("/login");
          },
        }),
      TIMEOUT,
    );
    return () => {
      clearInterval(interval);
    };
  }, [pathname, router]);

  return null;
};

export default RefreshToken;
