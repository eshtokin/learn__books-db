import axios from 'axios';
import { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if ((config.url as string).match('google')) {
    return config;
  }
  config.headers.Authorization = localStorage.getItem('token');
  return config;
}, err => Promise.reject(err));

export const Axios = axios;
