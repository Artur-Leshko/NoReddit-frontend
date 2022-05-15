import React, { useEffect, useState, } from 'react';
import { Provider, } from 'react-redux';
import myStore from '../../store';
import AppRouter from './AppRouter';
import { getSelfUserpofile, } from '../../api';
import { Loader, } from '../../common';

export const App = () => {
  const [user, setUser,] = useState(null);
  const [isLoading, setIsLoading,] = useState(true);

  useEffect(() => {
    getSelfUserpofile()
      .then(user => setUser(user))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    isLoading ? <Loader /> : <Provider store={myStore(user)}><AppRouter /></Provider >
  );
};
