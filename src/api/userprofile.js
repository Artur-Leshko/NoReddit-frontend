import api from './api';

export const getSelfUserpofile = async () => {
  return api.get('/user/self/profile/',
    { validateStatus: status => status === 200, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const getAnyUserProfile = async (id) => {
  return api.get(`user/${id}/profile/`)
    .then(data => data)
    .catch(error => Promise.reject(error));
};
