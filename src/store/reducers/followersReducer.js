import {
  UPDATE_FOLLOWERS,
} from '../constants';

export default function followersReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_FOLLOWERS: {
      return [...payload.followers,];
    }
    default:
      return state;
  }
}
