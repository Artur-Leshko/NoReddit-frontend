import { combineReducers, } from 'redux';
import { USER_LOGOUT, } from '../constants';
import currentUser from './currentUserReducer';

const appReducer = combineReducers({ currentUser, });

const initialState = {
  currentUser: null,
};

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
