import {
  UPDATE_USER,
} from '../constants';

export default function userReducer(state = {}, data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_USER: {
      return { ...payload.user, };
    }
    default:
      return state;
  }
}
