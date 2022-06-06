import {
  UPDATE_CATEGORY_POSTS,
  UPDATE_SEPARATE_CATEGORY_POSTS,
} from '../constants';

export default function categoryPostsReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_CATEGORY_POSTS: {
      return [...payload.posts,];
    }
    case UPDATE_SEPARATE_CATEGORY_POSTS: {
      const index = state.findIndex(p => p.id === payload.post.id);
      return [...state.slice(0, index), { ...payload.post, }, ...state.slice(index + 1),];
    }
    default:
      return state;
  }
}
