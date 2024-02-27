import { serviceWithMapping } from '@/api/service-with-mapping';
import {
  GetPostsRequirements,
  PublishPostRequirements,
  UploadImageRequirements,
} from './post.types';
import { HttpClient } from '@/api/http-client';
import { endPoints } from '@/api/end-points';
import { postMappers } from './post.mappers';
import {
  ApiPostsResponse,
  ApiPublishPostResponse,
  ApiUploadImageResponse,
} from '@/api/api-types/posts-api-types';

const uploadImage = serviceWithMapping(
  async ({ file, token }: UploadImageRequirements) => {
    const formData = new FormData();
    formData.set('files', file);

    return HttpClient<ApiUploadImageResponse>(
      // endPoints.uploadImage,
      {
        method: 'POST',
        url: endPoints.uploadImage,
        data: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
  },
  postMappers.uploadImage.toClient
);

export const postServices = {
  getPosts: serviceWithMapping(
    ({ keyword, page, pageSize }: GetPostsRequirements) =>
      HttpClient<ApiPostsResponse>({
        url: endPoints.posts,
        params: postMappers.getPosts.toParams({ keyword, page, pageSize }),
      }),
    postMappers.getPosts.toClient
  ),
  publish: serviceWithMapping(
    async ({
      categoriesId,
      description,
      image,
      title,
      token,
    }: PublishPostRequirements) => {
      const [{ id: imageId }] = await uploadImage({
        file: image,
        token,
      });

      return HttpClient<ApiPublishPostResponse>({
        method: 'POST',
        data: {
          title,
          description,
          categories: categoriesId,
          image: imageId,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
    },
    postMappers.publish.toClient
  ),
  uploadImage,
};
