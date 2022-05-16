import {
  UPDATE_FOLLOWED,
} from '../constants';

export default function followerdReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_FOLLOWED: {
      return [...payload.followed,];
    }
    default:
      return state;
  }
}
