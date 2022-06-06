import {
  UPDATE_CATEGORIES,
} from '../constants';

export default function categoriesReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_CATEGORIES: {
      return [...payload.categories,];
    }
    default:
      return state;
  }
}
