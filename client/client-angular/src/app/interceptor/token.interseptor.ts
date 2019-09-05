import axios from 'axios';
import { environment } from './../../environments/environment';

axios.defaults.baseURL = environment.mongoUrl;

axios.interceptors.request.use(config => {
  if (config.url.match('google')) {
    return config;
  }
  config.headers.Authorization = localStorage.getItem('token');
  return config;
}, err => Promise.reject(err));

export const Axios = axios;
