import {
  UPDATE_POPULAR_POSTS,
} from '../constants';

export default function popularPostsReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_POPULAR_POSTS: {
      return [...payload.posts,];
    }
    default:
      return state;
  }
}
