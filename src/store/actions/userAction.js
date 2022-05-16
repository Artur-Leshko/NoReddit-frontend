import {
  UPDATE_USER,
} from '../constants';

export const updateUser = (dispatch, user) => {
  dispatch({
    type: UPDATE_USER,
    payload: { user, },
  });
};
