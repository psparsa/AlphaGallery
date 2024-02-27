/* eslint-disable unicorn/no-null */
import { UseQueryOptions } from '@/api/use-query-options';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { postServices } from './post.services';
import { useQuery } from '@tanstack/react-query';
import { GetPostsRequirements } from './post.types';

export const postQueryKeys = createQueryKeys('post', { allPosts: null });

export type UsePostsOptions = UseQueryOptions<
  Awaited<ReturnType<typeof postServices.getPosts>>,
  unknown,
  typeof postQueryKeys.allPosts.queryKey
>;

export const postHooks = {
  usePosts: (requirements: GetPostsRequirements, options?: UsePostsOptions) =>
    useQuery({
      ...options,
      queryFn: () => postServices.getPosts(requirements),
      queryKey: postQueryKeys.allPosts.queryKey,
    }),
};
