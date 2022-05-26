import {
  UPDATE_POST_COMMENTS,

  UPDATE_SEPARATE_POST_COMMENT,
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
