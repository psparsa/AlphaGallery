import Axios from 'axios';

export const Client = Axios.create({
  baseURL: 'http://127.0.0.1:1337/api',
});
