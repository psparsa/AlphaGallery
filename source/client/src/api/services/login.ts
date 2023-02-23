import { Client } from '../client';
import { UserInfoSchema, UserInfoResponse } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const login = async ({
  identifier,
  password,
}: Record<'identifier' | 'password', string>) => {
  const { data } = await Client<UserInfoResponse>({
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
