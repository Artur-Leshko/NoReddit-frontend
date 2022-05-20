import {
  UPDATE_POPULAR_POSTS,
} from '../constants';

export const updatePopularPosts = (dispatch, posts) => {
  dispatch({
    type: UPDATE_POPULAR_POSTS,
    payload: { posts, },
  });
};
