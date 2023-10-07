/* eslint-disable unicorn/no-null */
import { UseMutationOptions } from '@/api/use-mutation-options';
import { useMutation } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { authServices } from './auth.services';
import { RegisterUserRequirements } from './auth.types';

export const authQueryKeys = createQueryKeys('auth', {
  registerUser: null,
});

export type UseRegisterUserOptions = UseMutationOptions<
  Awaited<ReturnType<typeof authServices.registerUser>>,
  unknown,
  RegisterUserRequirements
>;

export const authHooks = Object.freeze({
  useRegisterUser: (options?: UseRegisterUserOptions) =>
    useMutation({
      ...options,
      mutationFn: authServices.registerUser,
      mutationKey: authQueryKeys.registerUser.queryKey,
    }),
});
