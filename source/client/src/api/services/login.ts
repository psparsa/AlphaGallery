import { Client } from '../client';
import { z } from 'zod';
import { UserInfoSchema } from '@/api';
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
  const { data } = await Client<LoginResponse>({
    method: 'POST',
    url: '/api/auth/local',
    data: {
      identifier,
      password,
    },
  });

  return UserInfoSchema.parse(data);
};

export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });
