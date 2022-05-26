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

export const upvoteComment = async (commentId) => {
  return api.put(`/comments/${commentId}/upvote/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const downvoteComment = async (commentId) => {
  return api.put(`/comments/${commentId}/downvote/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const updateComment = async (commentId, commentData) => {
  return api.put(`/comments/${commentId}/`, { ...commentData, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const deleteComment = async (commentId) => {
  return api.delete(`/comments/${commentId}/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const createComment = async (commentData) => {
  return api.post('/comments/', { ...commentData, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};
