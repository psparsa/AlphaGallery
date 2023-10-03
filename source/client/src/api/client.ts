import Axios from 'axios';
import { apiBaseURL } from './end-points';

export const Client = Axios.create();

Client.interceptors.request.use((config) => {
  Reflect.set(config, 'baseURL', apiBaseURL);
  return config;
});
