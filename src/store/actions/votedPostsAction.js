import {
  UPDATE_VOTED_POSTS,
  UPDATE_UPVOTED_POST,
  UPDATE_DOWNVOTED_POST,
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

export const updateDownPost = (dispatch, post) => {
  dispatch({
    type: UPDATE_DOWNVOTED_POST,
    payload: { post, },
  });
};
