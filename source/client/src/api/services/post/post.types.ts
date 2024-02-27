import { ApiPostsResponse } from '@/api/api-types/posts-api-types';

export interface GetPostsRequirements {
  keyword?: string;
  page: number;
  pageSize: number;
}

// Lets don't change it for now
export type PostsResult = ApiPostsResponse;
