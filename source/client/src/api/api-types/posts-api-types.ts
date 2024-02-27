export interface ApiGetAllTypesRequestParameters {
  'filters[title][$contains]'?: string;
  'pagination[pageSize]': number;
  'pagination[page]': number;
  populate: '*';
}

interface ImageFormat {
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

interface ImageSchema {
  data: {
    attributes: {
      alternativeText: null;
      caption: null;
      createdAt: string;
      ext: string;
      formats: {
        large?: ImageFormat;
        medium?: ImageFormat;
        small?: ImageFormat;
        thumbnail: ImageFormat;
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
    };
    id: number;
  };
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
  image: ImageSchema;
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
