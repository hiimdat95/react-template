import { take, call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { URL } from 'utils/constants';
import { optionsGet } from 'utils/optionsRequest';
import { HIERACHY_REQUEST } from './constants';

import * as actions from './actions';

export function* getAllHierachy() {
  const requestURL = `${URL}function/getall`;
  try {
    const response = yield call(request, requestURL);
    console.log(response.Metadata.Success);
    if (response.Metadata.Success) {
      yield put(actions.hierachySuccess(response.Results[0]));
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
