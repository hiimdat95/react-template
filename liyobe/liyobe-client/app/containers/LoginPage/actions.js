import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from './constants';

export const loginUser = (values, actions) => ({
  type: LOGIN_USER_REQUEST,
  values,
  actions,
});

export const loginUserSuccess = response => {
  return {
    type: LOGIN_USER_SUCCESS,
    response,
  };
};

export const logout = () => {
  sessionStorage.removeItem('access_token');
  return {
    type: LOGOUT_USER,
  };
};
