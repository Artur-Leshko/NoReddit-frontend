import React, { useEffect, useState, } from 'react';
import { Provider, } from 'react-redux';
import myStore from '../../store';
import AppRouter from './AppRouter';
import { getSelfUserpofile, getUpvotedPosts, getDownvotedPosts, } from '../../api';
import { Loader, } from '../../common';

export const App = () => {
  const [user, setUser,] = useState(null);
  const [votedPosts, setVotedPosts,] = useState({ up: [], down: [], });
  const [isLoading, setIsLoading,] = useState(true);

  useEffect(() => {

    Promise.all([
      getSelfUserpofile().then(user => user),
      getUpvotedPosts().then(upPosts => upPosts.results),
      getDownvotedPosts().then(downPosts => downPosts.results),
    ]).then(data => {
      setUser(data[0]);
      setVotedPosts({ up: data[1], down: data[2], });
    }).finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, []);

  return (
    isLoading ? <Loader /> : <Provider store={myStore(user, votedPosts)}><AppRouter /></Provider >
  );
};
