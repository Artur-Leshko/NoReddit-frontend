import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useParams, useNavigate, } from 'react-router-dom';
import { UserPostsList, } from '../../Posts/UserPostsList/UserPostsList';
import { categoryPosts, } from '../../../store/selectors';
import { updateCategoryPosts, updateSeparateCategoryPost, } from '../../../store/actions';
import { getCategoryPosts, } from '../../../api';
import { Loader, Button, ButtonKinds, ButtonStyles, } from '../../../common';
import './categoryposts.scss';

export const CategoryPosts = () => {
  const posts = useSelector(categoryPosts);
  const [isLoading, setIsLoading,] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryName, } = useParams();

  useEffect(() => {
    getCategoryPosts(categoryName)
      .then(posts => updateCategoryPosts(dispatch, posts.results))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, [categoryName,]);

  const getFilteredPosts = (id, ordering, setOrder,) => {
    const newOrder = ordering.find(item => item.id === id).name;
    setOrder(newOrder);
    getCategoryPosts(categoryName, { ordering: newOrder, }).then(posts => updateCategoryPosts(dispatch, posts.results));
  };

  return (
    isLoading ? <Loader />
      : <>
        <UserPostsList
          title={`Category: ${categoryName}`}
          posts={posts}
          needBtn={false}
          fixedBtn={false}
          main={true}
          updatePost={updateSeparateCategoryPost}
          updatePosts={updateCategoryPosts}
          filterPosts={getFilteredPosts}
          needOrder={true}
        />
        <Button
          kind={ButtonKinds.INFO}
          style={ButtonStyles.CANCEL}
          className='categories__back'
          onClick={(e) => navigate(-1)}
        >
          Back
        </Button>
      </>
  );
};
