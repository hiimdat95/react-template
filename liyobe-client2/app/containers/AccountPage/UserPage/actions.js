import * as types from './constants';

// LIST USER
export const getListUserRequest = data => ({
  type: types.GET_LIST_USER_REQUEST,
  data,
});

export const getListUserSuccess = payload => ({
  type: types.GET_LIST_USER_SUCCESS,
  payload,
});

export const getListUserFailure = error => ({
  type: types.GET_LIST_USER_FAILURE,
  error,
});

export const changePaging = data => ({
  type: types.CHANGE_PAGING,
  data,
});

export const resetPaging = () => ({
  type: types.RESET_PAGING,
});

// MODAL
export const onToggleModal = modalType => ({
  type: types.ON_TOGGLE_MODAL,
  modalType,
});

// DROP DOWN ROLE
export const getDropDownRoleRequest = cookies => ({
  type: types.GET_DROPDOWN_ROLE_REQUEST,
  cookies,
});

export const getDropDownRoleSuccess = payload => ({
  type: types.GET_DROPDOWN_ROLE_SUCCESS,
  payload,
});

export const getDropDownRoleFailure = error => ({
  type: types.GET_DROPDOWN_ROLE_FAILURE,
  error,
});

export const setDropDownRole = values => ({
  type: types.SET_DROPDOWN_ROLE,
  values,
});

// USER DETAIL
export const getUserDetailRequest = data => ({
  type: types.GET_USER_DETAIL_REQUEST,
  data,
});

export const getUserDetailSuccess = payload => ({
  type: types.GET_USER_DETAIL_SUCCESS,
  payload,
});

export const getUserDetailFailure = error => ({
  type: types.GET_USER_DETAIL_FAILURE,
  error,
});

export const initUserDetail = () => ({
  type: types.ON_INIT_USER_DETAIL,
});

export const onResetUserDetail = () => ({
  type: types.ON_RESET_USER_DETAIL,
});

// CREATE USER
export const onCreateUserRequest = data => ({
  type: types.ON_CREATE_USER_REQUEST,
  data,
});

export const onCreateUserSuccess = payload => ({
  type: types.ON_CREATE_USER_SUCCESS,
  payload,
});

export const onCreateUserFailure = error => ({
  type: types.ON_CREATE_USER_FAILURE,
  error,
});

// DELETE USER
export const onDeleteUserRequest = data => ({
  type: types.ON_DELETE_USER_REQUEST,
  data,
});

export const onDeleteUserSuccess = (payload, typeDelete) => ({
  type: types.ON_DELETE_USER_SUCCESS,
  payload,
  typeDelete,
});

export const onDeleteUserFailure = error => ({
  type: types.ON_DELETE_USER_FAILURE,
  error,
});

// UPDATE USER
export const onUpdateUserRequest = data => ({
  type: types.ON_UPDATE_USER_REQUEST,
  data,
});

export const onUpdateUserSuccess = payload => ({
  type: types.ON_UPDATE_USER_SUCCESS,
  payload,
});

export const onUpdateUserFailure = error => ({
  type: types.ON_UPDATE_USER_FAILURE,
  error,
});
