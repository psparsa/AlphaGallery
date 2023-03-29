import { Client } from '../client';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { UserInfoSchema } from './get-user-info';

export const RegisterUserSchema = z.object({
  jwt: z.string(),
  user: UserInfoSchema,
});

export type RegisterUserResponse = z.infer<typeof RegisterUserSchema>;

export const registerUser = async ({
  username,
  email,
  password,
}: Record<'username' | 'email' | 'password', string>) => {
  const { data } = await Client.post<RegisterUserResponse>(
    '/auth/local/register',
    {
      username,
      email,
      password,
    }
  );

  return RegisterUserSchema.parse(data);
};

export const useRegisterUser = () =>
  useMutation({
    mutationKey: ['register-user'],
    mutationFn: registerUser,
  });
