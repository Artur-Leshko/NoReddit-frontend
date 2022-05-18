import {
  UPDATE_FOLLOWERS,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
} from '../constants';

export default function followersReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_FOLLOWERS: {
      return [...payload.followers,];
    }
    case ADD_FOLLOWER: {
      return [...state, { ...payload.follower, },];
    }
    case REMOVE_FOLLOWER: {
      return [...state.filter(u => u.id !== payload.follower.id),];
    }
    default:
      return state;
  }
}
