import { fromJS, Map } from 'immutable';
import { getLoggedInUser } from 'utils/auth';
import * as types from './constants';

const initialState = fromJS({
  user: getLoggedInUser() ? Map(getLoggedInUser()) : [],
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return state.set('user', getLoggedInUser() ? Map(getLoggedInUser()) : []);
    case types.LOGOUT_USER:
      return state.set('user', Map([]));
    default:
      return state;
  }
};

export default authReducer;
