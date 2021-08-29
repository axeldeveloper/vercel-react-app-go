import axios from 'axios';

import {API_URL_V1} from './AppConstants'

const Api = axios.create({
  baseURL: (API_URL_V1),
  headers: {
    "Content-type": "application/json"
  }
  //baseURL: (process.env.API_URL_V1),
});

/*
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refresh = localStorage.getItem('@Orcom:refresh');
    if (refresh && error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      return api.post('api/token/refresh/', { refresh }).then((response) => {
        localStorage.setItem('@Orcom:token', response.data.access);
        api.defaults.headers.authorization = `Bearer ${response.data.access}`;
        originalRequest.headers.authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);
*/

export default Api;