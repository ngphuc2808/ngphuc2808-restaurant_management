"use client";

import React from "react";

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";

import { useRouter } from "@/i18n/routing";
import SearchParamsLoader, {
  useSearchParamsLoader,
} from "@/components/atoms/search-params-loader";

const RefreshToken = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useSearchParamsLoader();
  const refreshTokenFromUrl = searchParams?.get("refreshToken");
  const redirectPathname = searchParams?.get("redirect");

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

  return <SearchParamsLoader onParamsReceived={setSearchParams} />;
};

export default RefreshToken;
