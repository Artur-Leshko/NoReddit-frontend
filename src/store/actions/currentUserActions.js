import {
  UPDATE_CURRENT_USER,
} from '../constants';

export const updateCurrentUser = (dispatch, currentUser) => {
  dispatch({
    type: UPDATE_CURRENT_USER,
    payload: { currentUser, },
  });
};
