"use client";

import React from "react";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RefreshTokenProvider from "@/providers/refresh-token-provider";
import {
  decodeToken,
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/lib/utils";
import { RoleType } from "@/types/jwt.types";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const AppContext = React.createContext({
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => {},
});

export const useAppContext = () => {
  return React.useContext(AppContext);
};

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();

  const [role, setRoleState] = React.useState<RoleType | undefined>(undefined);

  const setRole = React.useCallback((role: RoleType | undefined) => {
    setRoleState(role);
    if (!role) {
      removeTokensFromLocalStorage();
    }
  }, []);

  React.useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      const { role } = decodeToken(accessToken);
      setRoleState(role);
    }
  }, []);

  return (
    <AppContext value={{ role, setRole }}>
      <QueryClientProvider client={queryClient}>
        <RefreshTokenProvider>{children}</RefreshTokenProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContext>
  );
};

export default AppProvider;
