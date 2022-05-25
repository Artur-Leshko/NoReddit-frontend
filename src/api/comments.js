import api from './api';

export const getPostComments = async (postId) => {
  return api.get(`/posts/${postId}/comments/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getUpvotedComments = async (postId) => {
  return api.get(`/comments/${postId}/upvoted/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getDownvotedComments = async (postId) => {
  return api.get(`/comments/${postId}/downvoted/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};
