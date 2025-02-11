"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LoaderCircle } from "lucide-react";

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";

const RefreshToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const redirectPathname = searchParams.get("redirect");

  React.useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname || "/");
        },
      });
    } else {
      router.push("/");
    }
  }, [router, refreshTokenFromUrl, redirectPathname]);

  return null;
};

const RefreshTokenPage = () => {
  return (
    <React.Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <RefreshToken />
    </React.Suspense>
  );
};

export default RefreshTokenPage;
