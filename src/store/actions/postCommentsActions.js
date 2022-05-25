import {
  UPDATE_POST_COMMENTS,
} from '../constants';

export const updatePostComments = (dispatch, comments) => {
  dispatch({
    type: UPDATE_POST_COMMENTS,
    payload: { comments, },
  });
};
