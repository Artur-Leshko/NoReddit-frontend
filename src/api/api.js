import axios from 'axios';

axios.defaults.withCredentials = true;

const onSuccess = response => {

};

const onFail = err => {

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

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

const api = createAPI();
export default api;
