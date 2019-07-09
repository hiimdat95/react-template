import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
} from 'utils/constants';
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  containerClassnames: defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  menuClickCount: 0,
  hiarachy: null,
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
    case types.HIERACHY_FAILURE:
      return state.set('hiarachy', null).set('errors', action.error);
    case types.HIERACHY_SET:
      return state.set('hiarachy', action.values);
    default:
      return state;
  }
};
