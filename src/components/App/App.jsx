import React, { useEffect, useState, } from 'react';
import { Provider, } from 'react-redux';
import myStore from '../../store';
import AppRouter from './AppRouter';
import { getSelfUserpofile, } from '../../api';

export const App = () => {
  const [user, setUser,] = useState(null);

  useEffect(() => {
    getSelfUserpofile().then(data => console.log(data));
  }, []);

  return (
    <Provider store={myStore()}>
      <AppRouter />
    </Provider >
  );
};
