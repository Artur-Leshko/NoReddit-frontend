import {
  UPDATE_VOTED_POSTS,
  UPDATE_UPVOTED_POST,
  UPDATE_DOWNVOTED_POST,
  ADD_DOWNVOTED_POST,
  ADD_UPVOTED_POST,
  REMOVE_DOWNVOTED_POST,
  REMOVE_UPVOTED_POST,
} from '../constants';

export const updateVotedPosts = (dispatch, posts) => {
  dispatch({
    type: UPDATE_VOTED_POSTS,
    payload: { posts, },
  });
};

export const updateUpvotedPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_UPVOTED_POST,
    payload: { post, },
  });
};

export const updateDownvotedPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_DOWNVOTED_POST,
    payload: { post, },
  });
};

export const addUpvotedPost = (dispatch, post) => {
  dispatch({
    type: ADD_UPVOTED_POST,
    payload: { post, },
  });
};

export const removeUpvotedPost = (dispatch, post) => {
  dispatch({
    type: REMOVE_UPVOTED_POST,
    payload: { post, },
  });
};

export const addDownvotedPost = (dispatch, post) => {
  dispatch({
    type: ADD_DOWNVOTED_POST,
    payload: { post, },
  });
};

export const removeDownvotedPost = (dispatch, post) => {
  dispatch({
    type: REMOVE_DOWNVOTED_POST,
    payload: { post, },
  });
};
