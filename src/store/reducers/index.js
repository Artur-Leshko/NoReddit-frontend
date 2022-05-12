import { combineReducers, } from 'redux';

import currentUser from './currentUserReducer';

const rootReducer = combineReducers({ currentUser, });
export default rootReducer;
