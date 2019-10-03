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
}, err => Promise.reject(err));

axios.interceptors.response.use(response => {

  console.log('Axios interceptor response', response);
  return response;
}, error => {
  console.log('Axios interceptor error', error)
});

export const Axios = axios;
