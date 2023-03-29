import { Client } from '../client';
import { z } from 'zod';
import { UserInfoSchema } from './get-user-info';
import { useMutation } from '@tanstack/react-query';

export const LoginSchema = z.object({
  jwt: z.string(),
  user: UserInfoSchema,
});

export type LoginResponse = z.infer<typeof LoginSchema>;

export const login = async ({
  identifier,
  password,
}: Record<'identifier' | 'password', string>) => {
  const { data } = await Client.post<LoginResponse>('/auth/local', {
    identifier,
    password,
  });

  return LoginSchema.parse(data);
};

export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });
