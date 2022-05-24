import {
  UPDATE_SEPARATE_POST,
} from '../constants';

export const updateSeparatePost = (dispatch, post) => {
  dispatch({
    type: UPDATE_SEPARATE_POST,
    payload: { post, },
  });
};
