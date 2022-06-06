import { combineReducers, } from 'redux';
import { USER_LOGOUT, } from '../constants';
import currentUser from './currentUserReducer';
import user from './userReducer';
import followers from './followersReducer';
import followed from './followedReducer';
import currentUserFollowed from './currentUserFollowed';
import popularPosts from './popularPostsReducer';
import userPosts from './userPostsReducer';
import votedPosts from './votedPostsReducer';
import separatePost from './separatePostReducer';
import postComments from './postCommentsReducer';
import votedComments from './votedCommentsReducer';
import categories from './categoriesReducer';
import categoryPosts from './categoryPostsReducer';

const appReducer = combineReducers({
  currentUser,
  currentUserFollowed,
  votedPosts,
  user,
  followers,
  followed,
  popularPosts,
  userPosts,
  separatePost,
  postComments,
  votedComments,
  categories,
  categoryPosts,
});

const initialState = {
  currentUser: null,
  currentUserFollowed: [],
  votedPosts: { up: [], down: [], },
  user: {},
  followers: [],
  followed: [],
  popularPosts: [],
  userPosts: [],
  separatePost: {},
  postComments: [],
  votedComments: { up: [], down: [], },
  categories: [],
  categoryPost: [],
};

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
