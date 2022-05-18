import {
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWED,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
} from '../constants';

export const updateFollowers = (dispatch, followers) => {
  dispatch({
    type: UPDATE_FOLLOWERS,
    payload: { followers, },
  });
};

export const addFollower = (dispatch, follower) => {
  dispatch({
    type: ADD_FOLLOWER,
    payload: { follower, },
  });
};

export const removeFollower = (dispatch, follower) => {
  dispatch({
    type: REMOVE_FOLLOWER,
    payload: { follower, },
  });
};

export const updateFollowed = (dispatch, followed) => {
  dispatch({
    type: UPDATE_FOLLOWED,
    payload: { followed, },
  });
};
