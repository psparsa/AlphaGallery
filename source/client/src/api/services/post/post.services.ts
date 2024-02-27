import { serviceWithMapping } from '@/api/service-with-mapping';
import { GetPostsRequirements } from './post.types';
import { HttpClient } from '@/api/http-client';
import { endPoints } from '@/api/end-points';
import { postMappers } from './post.mappers';
import { ApiPostsResponse } from '@/api/api-types/posts-api-types';

export const postServices = {
  getPosts: serviceWithMapping(
    ({ keyword, page, pageSize }: GetPostsRequirements) =>
      HttpClient<ApiPostsResponse>({
        url: endPoints.posts,
        params: postMappers.getPosts.toParams({ keyword, page, pageSize }),
      }),
    postMappers.toClient
  ),
};
