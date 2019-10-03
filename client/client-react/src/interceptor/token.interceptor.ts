import axios from 'axios';
import { store } from '../store/store';
import { setUserStatus } from '../store/actions/authentificatedInfoAction';

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
  window.location.href = '/'
  return Promise.reject(err)
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  store.dispatch(setUserStatus(false));
  return error;
});

export const Axios = axios;
