import * as types from './constants';

export function changeLocale(languageLocale) {
  sessionStorage.setItem('locale', languageLocale);
  return {
    type: types.CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export const getLocaleRequest = () => ({
  type: types.GET_LOCALE_REQUEST,
});

export const getLocaleSuccess = response => ({
  type: types.GET_LOCALE_SUCCESS,
  response,
});
