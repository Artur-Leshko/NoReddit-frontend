import {
  UPDATE_POST_COMMENTS,
  UPDATE_SEPARATE_POST_COMMENT,
  ADD_SEPARATE_POST_COMMENT,
  REMOVE_SEPARATE_POST_COMMENT,
} from '../constants';

export const updatePostComments = (dispatch, comments) => {
  dispatch({
    type: UPDATE_POST_COMMENTS,
    payload: { comments, },
  });
};

export const updateSeparatePostComment = (dispatch, comment) => {
  dispatch({
    type: UPDATE_SEPARATE_POST_COMMENT,
    payload: { comment, },
  });
};

export const removePostComment = (dispatch, comment) => {
  dispatch({
    type: REMOVE_SEPARATE_POST_COMMENT,
    payload: { comment, },
  });
};

export const addPostComment = (dispatch, comment) => {
  dispatch({
    type: ADD_SEPARATE_POST_COMMENT,
    payload: { comment, },
  });
};
