import Axios from 'axios';

export const Client = Axios.create();

Client.interceptors.request.use((config) => {
  const baseURL =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_ADDRESS_SERVER_SIDE
      : process.env.NEXT_PUBLIC_API_ADDRESS_CLIENT_SIDE;

  Reflect.set(config, 'baseURL', baseURL);
  return config;
});
