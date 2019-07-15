/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import { DEFAULT_LOCALE } from '../../i18n'; // eslint-disable-line
import * as types from './constants';

export const initialState = fromJS({
  locale: sessionStorage.getItem('locale')
    ? sessionStorage.getItem('locale')
    : DEFAULT_LOCALE,
  listLocales: [],
  errors: [],
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_LOCALE:
      return state.set('locale', action.locale);
    case types.GET_LOCALE_SUCCESS:
      return state.set('listLocales', action.response);
    case types.GET_LOCALE_FAILURE:
      return state.set('errors', action.errors);
    case types.SET_LOCALE:
      return state.set('listLocales', action.values);
    default:
      return state;
  }
}

export default languageProviderReducer;
