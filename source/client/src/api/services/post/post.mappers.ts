import {
  ApiGetAllTypesRequestParameters,
  ApiPostsResponse,
} from '@/api/api-types/posts-api-types';
import { GetPostsRequirements, PostsResult } from './post.types';

export const postMappers = {
  getPosts: {
    toParams: ({
      page,
      pageSize,
      keyword,
    }: GetPostsRequirements): ApiGetAllTypesRequestParameters => ({
      populate: '*',
      'pagination[page]': page,
      'filters[title][$contains]': keyword,
      'pagination[pageSize]': pageSize,
    }),
  },
  toClient: (response: ApiPostsResponse): PostsResult => response,
};
