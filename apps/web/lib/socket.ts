"use client";

import { io, type Socket } from "socket.io-client";

import { envConfig } from "@/config";
import { getAccessTokenFromLocalStorage } from "@/lib/utils";

export const socket: Socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
  auth: {
    Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
  },
});
