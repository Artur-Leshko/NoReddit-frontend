import {
  UPDATE_SEPARATE_POST,
} from '../constants';

export default function separatePostReducer(state = {}, data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_SEPARATE_POST: {
      return { ...payload.post, };
    }
    default:
      return state;
  }
}
