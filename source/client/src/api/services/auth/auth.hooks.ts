/* eslint-disable unicorn/no-null */
import { UseMutationOptions } from '@/api/use-mutation-options';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { authServices } from './auth.services';
import {
  GetUserInformationRequirements,
  LoginUserRequirements,
  RegisterUserRequirements,
} from './auth.types';
import { UseQueryOptions } from '@/api/use-query-options';

export const authQueryKeys = createQueryKeys('auth', {
  registerUser: null,
  loginUser: null,
  userInformation: null,
});

export type UseRegisterUserOptions = UseMutationOptions<
  Awaited<ReturnType<typeof authServices.registerUser>>,
  unknown,
  RegisterUserRequirements
>;

export type UseLoginUserOptions = UseMutationOptions<
  Awaited<ReturnType<typeof authServices.loginUser>>,
  unknown,
  LoginUserRequirements
>;

export type UseUserInfoOptions = UseQueryOptions<
  Awaited<ReturnType<typeof authServices.getUserInfo>>,
  unknown,
  typeof authQueryKeys.userInformation.queryKey
>;

export const authHooks = {
  useRegisterUser: (options?: UseRegisterUserOptions) =>
    useMutation({
      ...options,
      mutationFn: authServices.registerUser,
      mutationKey: authQueryKeys.registerUser.queryKey,
    }),

  useLoginUser: (options?: UseLoginUserOptions) =>
    useMutation({
      ...options,
      mutationFn: authServices.loginUser,
      mutationKey: authQueryKeys.loginUser.queryKey,
    }),

  useUserInfo: (
    requirements?: GetUserInformationRequirements,
    options?: UseUserInfoOptions
  ) =>
    useQuery({
      ...options,
      queryFn: () => authServices.getUserInfo(requirements),
      queryKey: authQueryKeys.userInformation.queryKey,
    }),
};
