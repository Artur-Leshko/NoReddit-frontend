import {
  UPDATE_ALL_USERS,
} from '../constants';

export const updateAllUsers = (dispatch, users) => {
  dispatch({
    type: UPDATE_ALL_USERS,
    payload: { users, },
  });
};
