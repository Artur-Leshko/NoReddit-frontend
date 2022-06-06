import api from './api';

export const getAllCategories = () => {
  return api.get('/categories/')
    .then(data => data)
    .catch(error => Promise.reject(error));
};
