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

axios.interceptors.response.use(response => response,
  error => {
    if (error.response.data.status === 500) {
      store.dispatch(setUserStatus(false));
      // localStorage.clear();
      // setTimeout(() => {
      //   window.location.href = 'http://localhost:3001/errorPage';
      // }, 3000)
    }
    return  Promise.reject(error);
  }
);

export const Axios = axios;
