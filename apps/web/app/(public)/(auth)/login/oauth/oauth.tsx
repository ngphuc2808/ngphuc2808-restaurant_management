"use client";

import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { useAppStore } from "@/providers/app-provider";
import { useSetTokenToCookieMutation } from "@/queries/useAuth";
import { decodeToken, generateSocketInstace } from "@/lib/utils";
import { toast } from "@repo/ui/hooks/use-toast";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

const Oauth = () => {
  const setRole = useAppStore((state) => state.setRole);
  const setSocket = useAppStore((state) => state.setSocket);
  const { mutateAsync } = useSetTokenToCookieMutation();
  const router = useRouter();
  const count = useRef(0);

  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const message = searchParams.get("message");

  useEffect(() => {
    if (accessToken && refreshToken) {
      if (count.current === 0) {
        const { role } = decodeToken(accessToken);
        mutateAsync({ accessToken, refreshToken })
          .then(() => {
            setRole(role);
            setSocket(generateSocketInstace(accessToken));
            router.push("/manage/dashboard");
          })
          .catch((e) => {
            toast({
              description: e.message || "Có lỗi xảy ra",
            });
          });
        count.current++;
      }
    } else {
      if (count.current === 0) {
        setTimeout(() => {
          toast({
            description: message || "Có lỗi xảy ra",
          });
        });
        count.current++;
        router.push("/login");
      }
    }
  }, [
    accessToken,
    refreshToken,
    setRole,
    router,
    setSocket,
    message,
    mutateAsync,
  ]);

  return null;
};

export default Oauth;
