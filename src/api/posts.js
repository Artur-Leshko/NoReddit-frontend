import api from './api';

export const getPopularPosts = async () => {
  return api.get('/posts/popular/')
    .then(data => data)
    .catch(error => Promise.reject(error));
};
