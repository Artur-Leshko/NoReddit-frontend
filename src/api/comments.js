import api from './api';

export const getPostComments = async (postId) => {
  return api.get(`/posts/${postId}/comments/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};
