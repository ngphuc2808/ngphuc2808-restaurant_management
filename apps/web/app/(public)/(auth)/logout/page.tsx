"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LoaderCircle } from "lucide-react";

import { useAppStore } from "@/providers/app-provider";
import { useLogoutMutation } from "@/queries/useAuth";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";

const Logout = () => {
  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const ref = React.useRef<boolean>(false);

  const { mutateAsync } = useLogoutMutation();

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
        setRole(undefined);
        disconnectSocket();
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [
    disconnectSocket,
    mutateAsync,
    router,
    accessTokenFromUrl,
    refreshTokenFromUrl,
    setRole,
  ]);

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
