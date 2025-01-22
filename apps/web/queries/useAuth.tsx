import { useMutation, UseMutationResult } from "@tanstack/react-query";

import authApiRequests from "@/apiRequests/auth";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

export const useLoginMutation = (): UseMutationResult<
  QueryResponseType<LoginResType>,
  Error,
  LoginBodyType,
  unknown
> => {
  return useMutation({
    mutationFn: authApiRequests.login,
  });
};

export const useLogoutMutation = (): UseMutationResult<
  QueryResponseType<unknown>,
  Error,
  unknown,
  unknown
> => {
  return useMutation({
    mutationFn: authApiRequests.logout,
  });
};
