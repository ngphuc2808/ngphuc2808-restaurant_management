"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import useAppStore from "@/store/app";
import { useLogoutMutation } from "@/queries/useAuth";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";

const Logout = () => {
  const { setRole, disconnectSocket } = useAppStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const ref = useRef<boolean>(false);

  const { mutateAsync } = useLogoutMutation();

  useEffect(() => {
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
    <Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Logout />
    </Suspense>
  );
};

export default LogoutPage;
