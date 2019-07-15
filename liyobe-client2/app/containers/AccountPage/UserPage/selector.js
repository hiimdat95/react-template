import { createSelector } from 'reselect';

const selectUserPage = () => state => state.get('userPage');

const makeSelectPagingRequest = () =>
  createSelector(selectUserPage(), state => state.get('pagingRequest').toJS());
const makeSelectListUser = () =>
  createSelector(selectUserPage(), state => state.get('listUser').toJS());
const makeSelectListUserLoading = () =>
  createSelector(selectUserPage(), state => state.get('loading'));
const makeSelectPageLoading = () =>
  createSelector(selectUserPage(), state => state.get('pageLoading'));
const makeSelectDetailModalOpen = () =>
  createSelector(selectUserPage(), state => state.get('detailModalOpen'));
const makeSelectConfirmModalOpen = () =>
  createSelector(selectUserPage(), state => state.get('confirmModalOpen'));
const makeSelectUserDetail = () =>
  createSelector(selectUserPage(), state => state.get('userDetail'));
const makeSelectRoleDropDown = () =>
  createSelector(selectUserPage(), state => state.get('dropdownRole'));
export {
  selectUserPage,
  makeSelectPagingRequest,
  makeSelectListUser,
  makeSelectListUserLoading,
  makeSelectDetailModalOpen,
  makeSelectConfirmModalOpen,
  makeSelectUserDetail,
  makeSelectRoleDropDown,
  makeSelectPageLoading,
};
