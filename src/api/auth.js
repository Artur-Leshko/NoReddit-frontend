import api from './api';

export const singUp = async ({ email, username, password, }) => {
  return api.post('/auth/sign-up/', { email, username, password, })
    .then(response => response)
    .catch(error => Promise.reject(error));
};

export const signIn = async ({ email, password, }) => {
  return api.post('/auth/sign-in/', { email, password, })
    .then(response => response)
    .catch(error => Promise.reject(error));
};
