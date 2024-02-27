export interface ApiGetAllTypesRequestParameters {
  'filters[title][$contains]'?: string;
  'pagination[pageSize]': number;
  'pagination[page]': number;
  populate: '*';
}

interface Image {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: null;
  size: number;
  url: string;
  width: number;
}

interface ImageAttributes {
  alternativeText: null;
  caption: null;
  createdAt: string;
  ext: string;
  formats: {
    large?: Image;
    medium?: Image;
    small?: Image;
    thumbnail: Image;
  };
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

interface ImageSchema {
  attributes: ImageAttributes;
  id: number;
}

interface ImageCategory {
  attributes: {
    createdAt: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
  };
  id: number;
}

interface PostAttributes {
  categories: {
    data: ImageCategory[];
  };
  createdAt: string;
  description: string;
  image: {
    data: ImageSchema;
  };
  publishedAt: string;
  title: string;
  updatedAt: string;
}

interface ImagePagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ApiPostsResponse {
  data: {
    attributes: PostAttributes;
    id: number;
  }[];
  meta: {
    pagination: ImagePagination;
  };
}

export interface ApiPublishPostResponse {
  data: {
    attributes: {
      createdAt: string;
      description: string;
      publishedAt: string;
      title: string;
      updatedAt: string;
    };
    id: number;
  };
}

export interface ApiPublishPostRequestBody {
  categoriesId: number[] | number;
  description: string;
  imageId: number;
  title: string;
}

export type ApiUploadImageResponse = (ImageAttributes & { id: number })[];
