import {
  UPDATE_POST_COMMENTS,
  UPDATE_SEPARATE_POST_COMMENT,
  REMOVE_SEPARATE_POST_COMMENT,
} from '../constants';

export default function postCommentsReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_POST_COMMENTS: {
      return [...payload.comments,];
    }
    case UPDATE_SEPARATE_POST_COMMENT: {
      const index = state.findIndex(c => c.id === payload.comment.id);
      return [...state.slice(0, index), { ...payload.comment, }, ...state.slice(index + 1),];
    }
    case REMOVE_SEPARATE_POST_COMMENT: {
      return [...state.filter(c => c.id !== payload.comment.id),];
    }
    default:
      return state;
  }
}
