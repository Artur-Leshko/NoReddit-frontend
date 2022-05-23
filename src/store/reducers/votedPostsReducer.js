import {
  UPDATE_VOTED_POSTS,
  UPDATE_UPVOTED_POST,
  UPDATE_DOWNVOTED_POST,
  ADD_UPVOTED_POST,
  ADD_DOWNVOTED_POST,
  REMOVE_UPVOTED_POST,
  REMOVE_DOWNVOTED_POST,
} from '../constants';

export default function votedPostsReducer(state = { up: [], down: [], }, data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_VOTED_POSTS: {
      return { ...payload.posts, };
    }
    case ADD_UPVOTED_POST: {
      return {
        up: [...state.up, { ...payload.post, },],
        down: [...state.down,],
      };
    }
    case REMOVE_UPVOTED_POST: {
      return {
        up: [...state.up.filter(p => p.id !== payload.post.id),],
        down: [...state.down,],
      };
    }
    case UPDATE_UPVOTED_POST: {
      const index = state.up.findIndex(p => p.id === payload.post.id);
      return {
        up: [...state.up.slice(0, index), { ...payload.post, }, ...state.up.slice(index + 1),],
        down: [...state.down,],
      };
    }
    case ADD_DOWNVOTED_POST: {
      return {
        up: [...state.up,],
        down: [...state.down, { ...payload.post, },],
      };
    }
    case REMOVE_DOWNVOTED_POST: {
      return {
        up: [...state.up,],
        down: [...state.down.filter(p => p.id !== payload.post.id),],
      };
    }
    case UPDATE_DOWNVOTED_POST: {
      const index = state.down.findIndex(p => p.id === payload.post.id);
      return {
        up: [...state.up,],
        down: [...state.down.slice(0, index), { ...payload.post, }, ...state.down.slice(index + 1),],
      };
    }
    default:
      return state;
  }
}
