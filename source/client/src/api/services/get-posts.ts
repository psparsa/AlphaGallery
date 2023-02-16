import { Client } from '../client';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

const ImageFormatSchema = z.object({
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

const ImageSchema = z.object({
  data: z.object({
    id: z.number(),
    attributes: z.object({
      name: z.string(),
      alternativeText: z.null(),
      caption: z.null(),
      width: z.number(),
      height: z.number(),
      formats: z.object({
        thumbnail: ImageFormatSchema,
        large: ImageFormatSchema.optional(),
        medium: ImageFormatSchema.optional(),
        small: ImageFormatSchema.optional(),
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
    }),
  }),
});

const CategoriesSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      attributes: z.object({
        name: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        publishedAt: z.string(),
      }),
    })
  ),
});

export const PostsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      attributes: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        publishedAt: z.string().datetime(),
        image: ImageSchema,
        categories: CategoriesSchema,
      }),
    })
  ),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});

export type PostsResponse = z.infer<typeof PostsSchema>;

export const getPosts = async ({
  pageSize,
  page,
}: {
  page: number;
  pageSize: number;
}) => {
  const { data } = await Client<PostsResponse>({
    method: 'GET',
    url: '/posts',
    params: {
      populate: '*',
      'pagination[pageSize]': pageSize,
      'pagination[page]': page,
    },
  });

  return PostsSchema.parse(data);
};

export const useGetPosts = ({
  pageSize,
  page,
  initialData,
}: {
  initialData?: PostsResponse;
  page: number;
  pageSize: number;
}) =>
  useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts({ pageSize, page }),
    initialData,
  });
