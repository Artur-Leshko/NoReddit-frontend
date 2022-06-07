import api from './api';

export const getAllCategories = () => {
  return api.get('/categories/')
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getCategoryPosts = (categoryName, params) => {
  return api.get(`/categories/${categoryName}/posts`, { params: { ...params, }, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};
