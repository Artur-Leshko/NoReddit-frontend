import {
  UPDATE_CURRENT_USER_FOLLOWED,
  ADD_CURRENT_USER_FOLLOWED,
  REMOVE_CURRENT_USER_FOLLOWED,
} from '../constants';

export const updateCurrentUserFollowed = (dispatch, followed) => {
  dispatch({
    type: UPDATE_CURRENT_USER_FOLLOWED,
    payload: { followed, },
  });
};

export const addCurrentUserFollowed = (dispatch, followedUser) => {
  dispatch({
    type: ADD_CURRENT_USER_FOLLOWED,
    payload: { followedUser, },
  });
};

export const removeCurrentUserFollowed = (dispatch, followedUser) => {
  dispatch({
    type: REMOVE_CURRENT_USER_FOLLOWED,
    payload: { followedUser, },
  });
};
