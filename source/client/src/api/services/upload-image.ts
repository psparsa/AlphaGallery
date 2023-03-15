import { Client } from '../client';
import { z } from 'zod';

const ImageSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  path: z.null(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  url: z.string(),
});

export const UploadImageSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    alternativeText: z.null(),
    caption: z.null(),
    width: z.number(),
    height: z.number(),
    formats: z.object({
      thumbnail: ImageSchema,
      large: ImageSchema.optional(),
      medium: ImageSchema.optional(),
      small: ImageSchema.optional(),
    }),
    hash: z.string(),
    ext: z.string(),
    mime: z.string(),
    size: z.number(),
    url: z.string(),
    previewUrl: z.null(),
    provider: z.string(),
    provider_metadata: z.null(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);

export type UploadImageResponse = z.infer<typeof UploadImageSchema>;

const formData = new FormData();
export const uploadImage = async ({
  jwt,
  image,
}: {
  image: File;
  jwt: string;
}) => {
  formData.set('files', image);

  const { data } = await Client<UploadImageResponse>({
    method: 'POST',
    url: '/upload',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: formData,
  });

  return UploadImageSchema.parse(data);
};
