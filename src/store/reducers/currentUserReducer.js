import {
  UPDATE_CURRENT_USER,
} from '../constants';

export default function currentUserReducer(state = {}, data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_CURRENT_USER: {
      return { ...payload.currentUser, };
    }
    default:
      return state;
  }
}
