import {
  UPDATE_VOTED_COMMENTS,
  UPDATE_UPVOTED_COMMENT,
  UPDATE_DOWNVOTED_COMMENT,
  ADD_DOWNVOTED_COMMENT,
  ADD_UPVOTED_COMMENT,
  REMOVE_DOWNVOTED_COMMENT,
  REMOVE_UPVOTED_COMMENT,
} from '../constants';

export const updateVotedComments = (dispatch, comments) => {
  dispatch({
    type: UPDATE_VOTED_COMMENTS,
    payload: { comments, },
  });
};

export const updateUpvotedComment = (dispatch, comment) => {
  dispatch({
    type: UPDATE_UPVOTED_COMMENT,
    payload: { comment, },
  });
};

export const updateDownvotedComment = (dispatch, comment) => {
  dispatch({
    type: UPDATE_DOWNVOTED_COMMENT,
    payload: { comment, },
  });
};

export const addUpvotedComment = (dispatch, comment) => {
  dispatch({
    type: ADD_UPVOTED_COMMENT,
    payload: { comment, },
  });
};

export const removeUpvotedComment = (dispatch, comment) => {
  dispatch({
    type: REMOVE_UPVOTED_COMMENT,
    payload: { comment, },
  });
};

export const addDownvotedComment = (dispatch, comment) => {
  dispatch({
    type: ADD_DOWNVOTED_COMMENT,
    payload: { comment, },
  });
};

export const removeDownvotedComment = (dispatch, comment) => {
  dispatch({
    type: REMOVE_DOWNVOTED_COMMENT,
    payload: { comment, },
  });
};
