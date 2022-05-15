import api from './api';

export const singUp = async ({ email, username, password, }) => {
  return api.post('/auth/sign-up/', { email, username, password, })
    .then(data => data)
    .catch(error => Promise.reject(error.response.data));
};

export const signIn = async ({ email, password, }) => {
  return api.post('/auth/sign-in/', { email, password, })
    .then(data => data)
    .catch(error => Promise.reject(error));
};
