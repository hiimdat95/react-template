/* eslint-disable no-param-reassign */
import { fromJS, Map } from 'immutable';
import { pageIndex, pageSize, userPageOrderDefaut } from 'utils/constants';
import _ from 'lodash';
import * as types from './constants';

const initialState = fromJS({
  listUser: {
    data: null,
    pageIndex: null,
    pageSize: null,
    totalRows: null,
  },
  userDetail: null,
  pagingRequest: {
    pageSize,
    pageIndex,
    orderBy: userPageOrderDefaut,
    search: null,
    isDesc: true,
    includeDeleted: false,
  },
  dropdownRole: null,
  detailModalOpen: false,
  confirmModalOpen: false,
  loading: false,
  pageLoading: true,
  errors: null,
});

const UserPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PAGING:
      return state.set('pagingRequest', Map(action.data));
    case types.RESET_PAGING:
      return state.set(
        'pagingRequest',
        Map({
          pageSize,
          pageIndex,
          orderBy: userPageOrderDefaut,
          search: null,
          isDesc: true,
          includeDeleted: false,
        }),
      );
    case types.GET_LIST_USER_REQUEST:
      return state.set('loading', true);
    case types.GET_LIST_USER_SUCCESS:
      return state
        .set('listUser', Map(action.payload))
        .set('loading', false)
        .set('pageLoading', false);
    case types.GET_LIST_USER_FAILURE:
      return state.set('listUser', null).set('errors', action.error);
    case types.GET_USER_DETAIL_SUCCESS:
      return state.set('userDetail', action.payload).set('loading', false);
    case types.GET_USER_DETAIL_FAILURE:
      return state.set('userDetail', null).set('errors', action.error);
    case types.GET_DROPDOWN_ROLE_SUCCESS:
      return state.set('dropdownRole', action.payload).set('loading', false);
    case types.ON_UPDATE_USER_SUCCESS:
      return state.updateIn(['listUser', 'data'], list =>
        _.map(
          list,
          x =>
            x.id === action.payload.id
              ? _.pick(action.payload, [
                  'id',
                  'fullName',
                  'email',
                  'userName',
                  'status',
                  'isEnabled',
                  'isDeleted',
                ])
              : x,
        ),
      );
    case types.GET_DROPDOWN_ROLE_FAILURE:
      return state.set('dropdownRole', null).set('errors', action.error);
    case types.SET_DROPDOWN_ROLE:
      return state.set('dropdownRole', action.values);
    case types.ON_TOGGLE_MODAL:
      return state.set(action.modalType, !state.get(action.modalType));
    case types.ON_RESET_USER_DETAIL:
      return state.set('userDetail', null);
    case types.ON_INIT_USER_DETAIL:
      return state.set('userDetail', []);
    case types.ON_DELETE_USER_SUCCESS:
      if (action.typeDelete) {
        return state.updateIn(['listUser', 'data'], list =>
          _.map(list, x => {
            if (x.id === action.payload) {
              x.isDeleted = true;
              return x;
            }
            return x;
          }),
        );
      }
      return state
        .updateIn(['listUser', 'data'], list =>
          list.filter(x => x.id !== action.payload),
        )
        .updateIn(['listUser', 'totalRows'], data => data - 1)
        .updateIn(['listUser', 'pageSize'], data => data - 1);
    default:
      return state;
  }
};

export default UserPageReducer;
