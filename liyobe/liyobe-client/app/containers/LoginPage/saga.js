import { take, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { URL_AUTH, ErrCode } from 'utils/constants';
import { NotificationManager } from 'components/ReactNotification';
import { optionsLogin } from 'utils/optionsRequest';
import { LOGIN_USER_REQUEST, LOGOUT_USER } from './constants';
import * as loginActions from './actions';

// Function Login
export function* getLogin(action) {
  // Get Param and Body
  const { username, password } = action.values;
  const optionBody = `client_id=${encodeURIComponent(
    'react_code_client',
  )}&grant_type=${encodeURIComponent('password')}
  &scope=${encodeURIComponent('api1')}&`;
  const body = `${optionBody}username=${encodeURIComponent(
    username,
  )}&password=${encodeURIComponent(password)}&`;
  const requestURL = `${URL_AUTH}`;
  const options = optionsLogin(body);
  try {
    // Call API
    const response = yield call(request, requestURL, options);
    // Response handling
    if (response) {
      if (response.success) {
        sessionStorage.setItem(
          'access_token',
          JSON.stringify(response.access_token),
        );
        yield put(loginActions.loginUserSuccess(response));
        yield put(push('/dashboard'));
      } else if (response.type === ErrCode.InvalidLogin) {
        // Noti Error
        NotificationManager.error(ErrCode.InvalidLogin, '', null, null);
      } else if (response.type === ErrCode.IsLocked) {
        // Noti Error
        NotificationManager.error(ErrCode.IsLocked, '', null, null);
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

export function* logOut() {
  console.log('run logout');
}

export default function* authData() {
  yield takeLatest(LOGIN_USER_REQUEST, getLogin);
  yield takeEvery(LOGOUT_USER, logOut);
  yield take(LOCATION_CHANGE);
}
