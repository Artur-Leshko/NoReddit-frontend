import {
  UPDATE_CURRENT_USER_FOLLOWED,
  ADD_CURRENT_USER_FOLLOWED,
  REMOVE_CURRENT_USER_FOLLOWED,
} from '../constants';

export default function currentUserFollowedReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_CURRENT_USER_FOLLOWED: {
      return [...payload.followed,];
    }
    case ADD_CURRENT_USER_FOLLOWED: {
      return [...state, { ...payload.followedUser, },];
    }
    case REMOVE_CURRENT_USER_FOLLOWED: {
      return [...state.filter(u => u.id !== payload.followedUser.id),];
    }
    default:
      return state;
  }
}
