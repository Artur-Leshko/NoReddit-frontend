import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Loader, } from '../../common';
import { getPopularPosts, } from '../../api';
import { updatePopularPosts, updateSeparatePopularPost, } from '../../store/actions';
import { popularPostsSelector, } from '../../store/selectors';
import { UserPostsList, } from '../Posts';
import './mainpage.scss';

export const MainPage = () => {
  const [isLoading, setIsLoading,] = useState(false);
  const popularPosts = useSelector(popularPostsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    getPopularPosts()
      .then(posts => updatePopularPosts(dispatch, posts.results))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, []);

  const getFilteredPosts = (id, ordering, setOrder) => {
    const newOrder = ordering.find(item => item.id === id).name;
    setOrder(newOrder);
    getPopularPosts({ ordering: newOrder, }).then(posts => updatePopularPosts(dispatch, posts.results));
  };

  return (
    <div className='main'>
      <div className='container'>
        <div className='main__inner'>
          {isLoading ? <Loader />
            : <>
              <UserPostsList
                title='popular posts'
                posts={popularPosts}
                needBtn={true}
                fixedBtn={true}
                main={true}
                updatePost={updateSeparatePopularPost}
                filterPosts={getFilteredPosts}
                needOrder={true}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
};
