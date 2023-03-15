import { Client } from '../client';
import { z } from 'zod';
import { uploadImage } from './upload-image';

export const PublishPostSchema = z.object({
  data: z.object({
    id: z.number(),
    attributes: z.object({
      title: z.string(),
      description: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
    }),
  }),
});

export type PublishPostResponse = z.infer<typeof PublishPostSchema>;

export interface PublishPostProperties {
  categoriesId: number[] | number;
  description: string;
  image: File;
  jwt: string;
  title: string;
}

export const publishPost = async ({
  jwt,
  title,
  description,
  categoriesId,
  image,
}: PublishPostProperties) => {
  const [{ id: imageId }] = await uploadImage({ jwt, image });
  const { data } = await Client<PublishPostResponse>({
    method: 'POST',
    url: '/posts',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: {
      data: {
        title,
        description,
        categories: categoriesId,
        image: imageId,
      },
    },
  });

  return PublishPostSchema.parse(data);
};
