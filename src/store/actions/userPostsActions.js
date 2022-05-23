import {
  UPDATE_USER_POSTS,
  UPDATE_SEPARATE_USER_POST,
} from '../constants';

export const updateUserPosts = (dispatch, posts) => {
  dispatch({
    type: UPDATE_USER_POSTS,
    payload: { posts, },
  });
};

export const updateSeparateUserPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_SEPARATE_USER_POST,
    payload: { post, },
  });
};
