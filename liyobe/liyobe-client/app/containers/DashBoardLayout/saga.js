import { take, call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { URL } from 'utils/constants';
import { optionsGet } from 'utils/optionsRequest';
import { HIERACHY_REQUEST } from './constants';

import * as actions from './actions';

export function* getAllHierachy() {
  const requestURL = `${URL}Function/GetAllHierachy`;
  const options = optionsGet();
  try {
    const response = yield call(request, requestURL, options);
    if (response.success) {
      yield put(actions.hierachySuccess(response.data));
    } else {
      yield put(push('/error'));
    }
  } catch (err) {
    yield put(push('/error'));
  }
}

export default function* authData() {
  yield takeLatest(HIERACHY_REQUEST, getAllHierachy);
  yield take(LOCATION_CHANGE);
}
