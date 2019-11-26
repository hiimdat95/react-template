import { take, call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { URL } from 'utils/constants';
import { GET_LOCALE_REQUEST } from './constants';
import * as actions from './actions';

export function* getLocale() {
  const requestURL = `${URL}locale/getall`;
  try {
    const response = yield call(request, requestURL);
    if (response.success) {
      yield put(actions.getLocaleSuccess(response.data));
    } else {
      yield put(push('/error'));
    }
  } catch (err) {
    yield put(push('/error'));
  }
}

export default function* langData() {
   yield takeLatest(GET_LOCALE_REQUEST, getLocale);
  yield take(LOCATION_CHANGE);
}
