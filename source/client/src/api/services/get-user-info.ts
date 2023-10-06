import { Client } from '../client';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { endPoints } from '../end-points';

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
  const { data } = await Client.get<UserInfoResponse>(endPoints.userInfo, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return UserInfoSchema.parse(data);
};

export const useUserInfo = ({
  initialData,
  jwt,
  onError,
  onSuccess,
}: {
  initialData?: UserInfoResponse;
  jwt?: string;
  onError: (error: unknown) => void;
  onSuccess: (result: UserInfoResponse) => void;
}) =>
  useQuery({
    queryKey: ['usr-info'],
    queryFn: () => getUserInfo({ jwt: jwt ?? '' }),
    enabled: !!jwt,
    retry: 3,
    retryDelay: 500,
    // if you just write initialData: initialData, the type of isLoading
    // always will be false, which is not true as initialData is optional
    ...(initialData ? { initialData } : undefined),
    onError,
    onSuccess,
  });
