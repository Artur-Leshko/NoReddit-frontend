import {
  UPDATE_POPULAR_POSTS,
  UPDATE_SEPARATE_POPULAR_POST,
} from '../constants';

export default function popularPostsReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_POPULAR_POSTS: {
      return [...payload.posts,];
    }
    case UPDATE_SEPARATE_POPULAR_POST: {
      const index = state.findIndex(p => p.id === payload.post.id);
      return [...state.slice(0, index), { ...payload.post, }, ...state.slice(index + 1),];
    }
    default:
      return state;
  }
}
