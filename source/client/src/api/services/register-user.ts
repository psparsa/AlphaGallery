import { Client } from '../client';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { UserInfoSchema } from './get-user-info';
import { endPoints } from '../end-points';

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
    endPoints.registerUser,
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
