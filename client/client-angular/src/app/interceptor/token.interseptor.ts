import axios from 'axios';
import { environment } from 'src/environments/environment';

axios.defaults.baseURL = environment.mongoUrl;

axios.interceptors.request.use(config => {
  if ((config.url as string).match('google')) {
    return config;
  }
  if (localStorage.hasOwnProperty('token')) {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  }
  // if ( !config.url.match('/login') && !config.url.match('/registr')) {
  //   window.location.href = '/';
  // }
  return config;
}, err => {
  return Promise.reject(err);
});


export const Axios = axios;
