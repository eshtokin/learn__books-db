import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000/`;

axios.interceptors.request.use(config => {
  if ((config.url as string).match('google')) {
    return config;
  }
  if (localStorage.hasOwnProperty('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config;
}, err => {
  return Promise.reject(err)
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (!error.config.url.match('localhost:3000/login')) {
    window.location.href = 'http://localhost:3001'
  }
  return Promise.reject(error);
});

export const Axios = axios;
