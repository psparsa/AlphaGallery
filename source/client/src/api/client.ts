import Axios from 'axios';

export const Client = Axios.create({
  baseURL: 'http://localhost:1337/api',
});
