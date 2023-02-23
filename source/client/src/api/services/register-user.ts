import { Client } from '../client';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

export const UserInfoSchema = z.object({
  jwt: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    provider: z.string(),
    confirmed: z.boolean(),
    blocked: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type UserInfoResponse = z.infer<typeof UserInfoSchema>;

export const registerUser = async ({
  username,
  email,
  password,
}: Record<'username' | 'email' | 'password', string>) => {
  const { data } = await Client<UserInfoResponse>({
    method: 'POST',
    url: '/auth/local/register',
    data: {
      username,
      email,
      password,
    },
  });

  return UserInfoSchema.parse(data);
};

export const useRegisterUser = () =>
  useMutation({
    mutationKey: ['register-user'],
    mutationFn: registerUser,
  });
