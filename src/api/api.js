import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, REFRESH_TOKEN_URL, } from '../config';

axios.defaults.withCredentials = true;

const createAPI = () => {
  const headers = {};

  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';

  const api = applyCaseMiddleware(axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000,
    headers,
  }));

  const onRequestSuccess = config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    else config.headers.Authorization = null;
    return config;
  };

  const onRequestFail = err => {
    Promise.reject(err);
  };

  const onResponseSuccess = response => response.data;

  const onResponseFail = err => {
    const originalRequest = err.config;

    if (err.response.status === 401 && originalRequest.url === REFRESH_TOKEN_URL) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.location.href('/login');

      return Promise.reject(err);
    }

    if (err.response.status === 401 && err.response.data.code === 'token_not_valid') {
      const refreshToken = JSON.parse(localStorage.getItem(REFRESH_TOKEN_KEY));
      return api.post(REFRESH_TOKEN_URL, {
        refresh: refreshToken,
      })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(res.data.access));
            api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY))}`;
            return api(originalRequest);
          }
        });
    }

    return Promise.reject(err);
  };

  api.interceptors.request.use(onRequestSuccess, onRequestFail);
  api.interceptors.response.use(onResponseSuccess, onResponseFail);

  return api;
};

const api = createAPI();
export default api;
