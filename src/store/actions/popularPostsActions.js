import {
  UPDATE_POPULAR_POSTS,
  UPDATE_SEPARATE_POPULAR_POST,
} from '../constants';

export const updatePopularPosts = (dispatch, posts) => {
  dispatch({
    type: UPDATE_POPULAR_POSTS,
    payload: { posts, },
  });
};

export const updateSeparatePopularPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_SEPARATE_POPULAR_POST,
    payload: { post, },
  });
};
