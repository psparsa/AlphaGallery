import { Client } from '../client';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

export const UserInfoSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  provider: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserInfoResponse = z.infer<typeof UserInfoSchema>;

export const getUserInfo = async ({ jwt }: { jwt: string }) => {
  const { data } = await Client<UserInfoResponse>({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return UserInfoSchema.parse(data);
};

export const useUserInfo = ({
  jwt,
  enabled = true,
}: {
  enabled: boolean;
  jwt: string;
}) =>
  useQuery({
    queryKey: ['usr-info'],
    queryFn: () => getUserInfo({ jwt }),
    enabled,
  });
