import {
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWED,
} from '../constants';

export const updateFollowers = (dispatch, followers) => {
  dispatch({
    type: UPDATE_FOLLOWERS,
    payload: { followers, },
  });
};

export const updateFollowed = (dispatch, followed) => {
  dispatch({
    type: UPDATE_FOLLOWED,
    payload: { followed, },
  });
};
