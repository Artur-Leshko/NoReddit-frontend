import {
  UPDATE_VOTED_COMMENTS,
  UPDATE_UPVOTED_COMMENT,
  UPDATE_DOWNVOTED_COMMENT,
  ADD_UPVOTED_COMMENT,
  ADD_DOWNVOTED_COMMENT,
  REMOVE_UPVOTED_COMMENT,
  REMOVE_DOWNVOTED_COMMENT,
} from '../constants';

export default function votedCommentsReducer(state = { up: [], down: [], }, data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_VOTED_COMMENTS: {
      return { ...payload.comments, };
    }
    case ADD_UPVOTED_COMMENT: {
      return {
        up: [...state.up, { ...payload.comment, },],
        down: [...state.down,],
      };
    }
    case REMOVE_UPVOTED_COMMENT: {
      return {
        up: [...state.up.filter(c => c.id !== payload.comment.id),],
        down: [...state.down,],
      };
    }
    case UPDATE_UPVOTED_COMMENT: {
      const index = state.up.findIndex(c => c.id === payload.comment.id);
      return {
        up: [...state.up.slice(0, index), { ...payload.comment, }, ...state.up.slice(index + 1),],
        down: [...state.down,],
      };
    }
    case ADD_DOWNVOTED_COMMENT: {
      return {
        up: [...state.up,],
        down: [...state.down, { ...payload.comment, },],
      };
    }
    case REMOVE_DOWNVOTED_COMMENT: {
      return {
        up: [...state.up,],
        down: [...state.down.filter(c => c.id !== payload.comment.id),],
      };
    }
    case UPDATE_DOWNVOTED_COMMENT: {
      const index = state.down.findIndex(c => c.id === payload.comment.id);
      return {
        up: [...state.up,],
        down: [...state.down.slice(0, index), { ...payload.comment, }, ...state.down.slice(index + 1),],
      };
    }
    default:
      return state;
  }
}
