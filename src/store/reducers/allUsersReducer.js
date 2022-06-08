import {
  UPDATE_ALL_USERS,
} from '../constants';

export default function allUsersReducer(state = [], data) {
  const { type, payload, } = data;

  switch (type) {
    case UPDATE_ALL_USERS: {
      return [...payload.users,];
    }
    default:
      return state;
  }
}
