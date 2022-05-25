import {
  UPDATE_POST_COMMENTS,
} from '../constants';

export default function postCommentsReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_POST_COMMENTS: {
      return [...payload.comments,];
    }
    default:
      return state;
  }
}
