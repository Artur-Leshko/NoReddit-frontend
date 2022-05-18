import { combineReducers, } from 'redux';
import { USER_LOGOUT, } from '../constants';
import currentUser from './currentUserReducer';
import user from './userReducer';
import followers from './followersReducer';
import followed from './followedReducer';
import currentUserFollowed from './currentUserFollowed';

const appReducer = combineReducers({ currentUser, currentUserFollowed, user, followers, followed, });

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
