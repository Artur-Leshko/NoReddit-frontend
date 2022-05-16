import {
  UPDATE_CURRENT_USER,
  USER_LOGOUT,
} from '../constants';

export const logoutUser = (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};

export const updateCurrentUser = (dispatch, currentUser) => {
  dispatch({
    type: UPDATE_CURRENT_USER,
    payload: { currentUser, },
  });
};
