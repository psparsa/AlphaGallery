import { Client } from '../client';
import { z } from 'zod';
import { endPoints } from '../end-points';

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

export const uploadImage = async ({
  jwt,
  image,
}: {
  image: File;
  jwt: string;
}) => {
  const formData = new FormData();
  formData.set('files', image);

  const { data } = await Client.post<UploadImageResponse>(
    endPoints.uploadImage,
    formData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return UploadImageSchema.parse(data);
};
