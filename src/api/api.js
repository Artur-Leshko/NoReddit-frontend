import axios from 'axios';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, } from '../config';

axios.defaults.withCredentials = true;

const onRequestSuccess = config => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const onRequestFail = err => {
  Promise.reject(err);
};

const onResponseSuccess = response => {

};

const onResponseFail = err => {

};

const createAPI = () => {
  const headers = {};

  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';

  const api = axios.create({
    baseURL: '/api/v1/',
    timeout: 5000,
    headers,
  });

  api.interceptors.request.use(onRequestSuccess, onRequestFail);
  api.interceptors.response.use(onResponseSuccess, onResponseFail);

  return api;
};

const api = createAPI();
export default api;
