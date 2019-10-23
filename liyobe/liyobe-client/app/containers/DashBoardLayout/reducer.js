import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  pageIndex,
  pageSize,
  OrderDefaut,
} from 'utils/constants';
import { fromJS, Map } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  containerClassnames: defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  menuClickCount: 0,
  hiarachy: null,
  pagingRequest: {
    pageSize,
    pageIndex,
    orderBy: OrderDefaut,
    search: [],
    isDesc: false,
  },
  detailModalOpen: false,
  confirmModalOpen: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.MENU_SET_CLASSNAMES:
      return state
        .set('containerClassnames', action.payload.containerClassnames)
        .set('menuClickCount', action.payload.menuClickCount);
    case types.MENU_CLICK_MOBILE_MENU:
      return state
        .set('containerClassnames', action.payload.containerClassnames)
        .set('menuClickCount', action.payload.menuClickCount);
    case types.MENU_CONTAINER_ADD_CLASSNAME:
      return state.set('containerClassnames', action.payload);
    case types.MENU_CHANGE_DEFAULT_CLASSES:
      return state.set('containerClassnames', action.payload);
    case types.HIERACHY_SUCCESS:
      return state.set('hiarachy', action.payload);
    case types.HIERACHY_SET:
      return state.set('hiarachy', action.values);
    case types.CHANGE_PAGING:
      return state.set('pagingRequest', Map(action.data));
    case types.RESET_PAGING:
      return state.set(
        'pagingRequest',
        Map({
          pageSize,
          pageIndex,
          orderBy: OrderDefaut,
          search: [],
          isDesc: false,
        }),
      );
    case types.ON_TOGGLE_MODAL:
      return state.set(action.modalType, !state.get(action.modalType));
    default:
      return state;
  }
};
