import {
  ApiGetAllTypesRequestParameters,
  ApiPostsResponse,
  ApiPublishPostRequestBody,
  ApiPublishPostResponse,
  ApiUploadImageResponse,
} from '@/api/api-types/posts-api-types';
import {
  GetPostsRequirements,
  PostsResult,
  PublishPostResult,
  UploadImageResult,
} from './post.types';

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
    toClient: (response: ApiPostsResponse): PostsResult => response,
  },
  publish: {
    toClient: (response: ApiPublishPostResponse): PublishPostResult => response,
  },
  uploadImage: {
    toClient: (x: ApiUploadImageResponse): UploadImageResult => x,
  },
};
