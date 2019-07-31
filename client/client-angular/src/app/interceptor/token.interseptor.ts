import axios from 'axios';
import { UrlHandlingStrategy } from '@angular/router';

axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use(config => {
  if (config.url.match('google')) {
    return config;
  }
  config.headers.Authorization = localStorage.getItem('token');
  return config;
}, err => Promise.reject(err));

export const Axios = axios;
