import * as types from './constants';

export function changeLocale(languageLocale) {
  sessionStorage.setItem('locale', languageLocale);
  return {
    type: types.CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export const getLocaleRequest = cookies => ({
  type: types.GET_LOCALE_REQUEST,
  cookies,
});

export const setLocale = values => ({
  type: types.SET_LOCALE,
  values,
});

export const getLocaleSuccess = response => ({
  type: types.GET_LOCALE_SUCCESS,
  response,
});

export const getLocaleFailure = error => ({
  type: types.GET_LOCALE_FAILURE,
  error,
});
