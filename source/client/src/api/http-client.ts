import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiBaseURL } from './end-points';

export const AxiosInstance = Axios.create();

AxiosInstance.interceptors.request.use((config) => {
  Reflect.set(config, 'baseURL', apiBaseURL);
  return config;
});

export interface HttpResponse<TResponse> {
  data: TResponse;
  headers: AxiosResponse['headers'];
  httpCode: number;
}

export type HttpClientProperties = AxiosRequestConfig;

export const HttpClient = async <TResponse>(
  properties: HttpClientProperties
): Promise<HttpResponse<TResponse>> => {
  try {
    const result = await AxiosInstance<TResponse>({
      ...properties,
    });

    return {
      data: result.data,
      headers: result.headers,
      httpCode: result.status,
    };
  } catch (error_) {
    // TODO: format errors
    console.error(error_);
    throw error_;
  }
};
