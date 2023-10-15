/* eslint-disable unicorn/no-null */
import { UseMutationOptions } from '@/api/use-mutation-options';
import { useMutation } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { authServices } from './auth.services';
import { LoginUserRequirements, RegisterUserRequirements } from './auth.types';

export const authQueryKeys = createQueryKeys('auth', {
  registerUser: null,
  loginUser: (identifer: string) => [identifer],
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
      mutationKey: authQueryKeys.loginUser('').queryKey,
    }),
};
