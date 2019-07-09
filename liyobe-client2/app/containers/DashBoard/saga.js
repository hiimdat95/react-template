import { take, call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import {
  URL,
  CookiePath,
  CookieMaxAge,
  CookieListSideBar,
} from 'utils/constants';
import { optionsGet } from 'utils/optionsRequest';
import { HIERACHY_REQUEST } from './constants';

import * as actions from './actions';

export function* getAllHierachy(data) {
  const requestURL = `${URL}Function/GetAllHierachy`;
  const options = optionsGet();
  try {
    const response = yield call(request, requestURL, options);
    if (response) {
      if (!response.error) {
        if (data.cookies !== undefined) {
          data.cookies.set(CookieListSideBar, JSON.stringify(response), {
            path: CookiePath,
            maxAge: CookieMaxAge,
          });
        }
        yield put(actions.hierachySuccess(response));
      } else {
        yield put(push('/error'));
      }
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
