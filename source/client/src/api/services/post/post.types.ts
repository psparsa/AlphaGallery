import {
  ApiPostsResponse,
  ApiPublishPostResponse,
  ApiUploadImageResponse,
} from '@/api/api-types/posts-api-types';

export interface GetPostsRequirements {
  keyword?: string;
  page: number;
  pageSize: number;
}

export type PostsResult = ApiPostsResponse;

export interface PublishPostRequirements {
  categoriesId: number[] | number;
  description: string;
  image: File;
  title: string;
  token?: string;
}

export type PublishPostResult = ApiPublishPostResponse;

export interface UploadImageRequirements {
  file: File;
  token?: string;
}

export type UploadImageResult = ApiUploadImageResponse;
