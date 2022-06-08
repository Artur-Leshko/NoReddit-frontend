import api from './api';

export const getSelfUserpofile = async () => {
  return api.get('/user/self/profile/',
    { validateStatus: status => status === 200, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const updateUserProfile = async (formData) => {
  return api.put('user/self/profile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getAnyUserProfile = async (id) => {
  return api.get(`user/${id}/profile/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getFollowers = async (id) => {
  return api.get(`user/${id}/followers/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getFollowed = async (id) => {
  return api.get(`user/${id}/followed/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const subscribeOnUser = async (id) => {
  return api.post(`user/${id}/subscribe/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const unsubscribeFromUser = async (id) => {
  return api.post(`user/${id}/unsubscribe/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getSearchedUsers = async (params) => {
  return api.get('user', { params: { ...params, }, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};
