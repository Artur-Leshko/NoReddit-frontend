import {
  UPDATE_CATEGORIES,
} from '../constants';

export const updateCategories = (dispatch, categories) => {
  dispatch({
    type: UPDATE_CATEGORIES,
    payload: { categories, },
  });
};
