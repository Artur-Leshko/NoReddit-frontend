import { combineReducers, } from 'redux';
import { USER_LOGOUT, } from '../constants';
import currentUser from './currentUserReducer';
import user from './userReducer';

const appReducer = combineReducers({ currentUser, user, });

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
