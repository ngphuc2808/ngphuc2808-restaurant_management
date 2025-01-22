import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import accountApiRequest from "@/apiRequests/account";

import {
  AccountResType,
  ChangePasswordV2BodyType,
  ChangePasswordV2ResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

export const useAccountMe = (): UseQueryResult<
  QueryResponseType<AccountResType>,
  Error
> => {
  return useQuery({
    queryKey: ["account-me"],
    queryFn: accountApiRequest.me,
  });
};

export const useUpdateMeMutation = (): UseMutationResult<
  QueryResponseType<AccountResType>,
  Error,
  UpdateMeBodyType,
  unknown
> => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe,
  });
};

export const useChangePasswordMutation = (): UseMutationResult<
  QueryResponseType<ChangePasswordV2ResType>,
  Error,
  ChangePasswordV2BodyType,
  unknown
> => {
  return useMutation({
    mutationFn: accountApiRequest.changePasswordV2,
  });
};
