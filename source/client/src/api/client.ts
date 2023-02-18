import Axios from 'axios';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const baseURL = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOSTNAME}:${process.env.NEXT_PUBLIC_API_PORT}/api`;

export const Client = Axios.create({
  baseURL,
});
