import api from './api';

export const getPopularPosts = async () => {
  return api.get('/posts/popular/')
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getUserPosts = async (params) => {
  return api.get('/posts', { params: { ...params, }, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getUpvotedPosts = async () => {
  return api.get('/posts/upvoted/',)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getDownvotedPosts = async () => {
  return api.get('/posts/downvoted/',)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const upvotePost = async (postId) => {
  return api.put(`/posts/${postId}/upvote/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const downvotePost = async (postId) => {
  return api.put(`/posts/${postId}/downvote/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};
