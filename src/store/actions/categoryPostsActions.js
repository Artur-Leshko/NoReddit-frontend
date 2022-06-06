import {
  UPDATE_CATEGORY_POSTS,
  UPDATE_SEPARATE_CATEGORY_POSTS,
} from '../constants';

export const updateCategoryPosts = (dispatch, posts) => {
  dispatch({
    type: UPDATE_CATEGORY_POSTS,
    payload: { posts, },
  });
};

export const updateSeparateCategoryPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_SEPARATE_CATEGORY_POSTS,
    payload: { post, },
  });
};
