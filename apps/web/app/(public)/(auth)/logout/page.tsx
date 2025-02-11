"use client";

import React from "react";

import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useAppContext } from "@/providers/app-provider";

const Logout = () => {
  const router = useRouter();

  const { mutateAsync } = useLogoutMutation();

  const { setIsAuth } = useAppContext();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");

  const ref = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (
      !(
        ref.current ||
        !refreshTokenFromUrl ||
        !accessTokenFromUrl ||
        (refreshTokenFromUrl &&
          refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
        (accessTokenFromUrl &&
          accessTokenFromUrl !== getAccessTokenFromLocalStorage())
      )
    ) {
      ref.current = true;
      mutateAsync().then(() => {
        setTimeout(() => {
          ref.current = false;
        }, 1000);
        setIsAuth(false);
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [mutateAsync, router, accessTokenFromUrl, refreshTokenFromUrl, setIsAuth]);

  return null;
};

const LogoutPage = () => {
  return (
    <React.Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Logout />
    </React.Suspense>
  );
};

export default LogoutPage;
