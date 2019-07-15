import { take, call, put, takeLatest, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import {
  URL,
  CookiePath,
  CookieMaxAge,
  CookieDropDownRole,
  DuplicateUserName,
  DuplicateEmail,
} from 'utils/constants';
import _ from 'lodash';
import { optionsPost, optionsGet } from 'utils/optionsRequest';
import { NotificationManager } from 'components/ReactNotification';
import { makeSelectPagingRequest } from './selector';
import {
  GET_USER_DETAIL_REQUEST,
  GET_LIST_USER_REQUEST,
  GET_DROPDOWN_ROLE_REQUEST,
  ON_UPDATE_USER_REQUEST,
  ON_DELETE_USER_REQUEST,
  ON_CREATE_USER_REQUEST,
} from './constants';
import * as actions from './actions';

export function* getListUser(values) {
  const {
    orderBy,
    pageIndex,
    pageSize,
    search,
    isDesc,
    includeDeleted,
  } = values.data;
  const body = JSON.stringify(search);
  const requestURL = `${URL}Account/GetAllPagingUser?column=${orderBy}&isDesc=${isDesc}&page=${pageIndex}&pageSize=${pageSize}&includeDeleted=${includeDeleted}`;
  const options = optionsPost(body);
  try {
    yield delay(100);
    const response = yield call(request, requestURL, options);
    if (response) {
      if (!response.error) {
        yield put(actions.getListUserSuccess(response));
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

export function* getRoleDropDown(data) {
  const requestURL = `${URL}Role/GetAllDropDown`;
  const options = optionsGet();
  try {
    const response = yield call(request, requestURL, options);
    if (response) {
      if (!response.error) {
        if (data.cookies !== undefined) {
          data.cookies.set(CookieDropDownRole, response, {
            path: CookiePath,
            maxAge: CookieMaxAge,
          });
        }
        yield put(actions.getDropDownRoleSuccess(response));
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

export function* getUserDetail(values) {
  if (values.data !== null && values.data !== undefined) {
    const options = optionsGet();
    const requestURL = `${URL}Account/Detail?userId=${values.data}`;
    try {
      const response = yield call(request, requestURL, options);
      if (response) {
        if (!response.error) {
          yield put(actions.getUserDetailSuccess(response));
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
}

export function* updateUser(values) {
  // eslint-disable-next-line prefer-destructuring
  const data = values.data;
  data.roles = _.map(data.roles, 'value');
  const body = JSON.stringify(data);
  const options = optionsPost(body);
  const requestURL = `${URL}Account/Update`;
  try {
    const response = yield call(request, requestURL, options);
    if (response) {
      if (!response.error) {
        NotificationManager.success(
          'NotiUpdateSuccess',
          '',
          3000,
          null,
          null,
          '',
          'text-success',
        );
        yield put(actions.onToggleModal('detailModalOpen'));
        yield put(actions.onUpdateUserSuccess(data));
      } else {
        NotificationManager.error(
          'NotiUpdateFailure',
          '',
          3000,
          null,
          null,
          '',
          'text-danger',
        );
      }
    } else {
      yield put(push('/error'));
    }
  } catch (err) {
    yield put(push('/error'));
  }
}

export function* deleteUser(values) {
  const options = optionsPost();
  const { data } = values;
  const requestURL = `${URL}Account/Delete?userId=${data}`;
  try {
    const response = yield call(request, requestURL, options);
    if (response) {
      const pagingRequest = yield select(makeSelectPagingRequest());
      if (!response.error) {
        NotificationManager.success(
          'NotiDeleteSuccess',
          '',
          3000,
          null,
          null,
          '',
          'text-success',
        );
        yield put(actions.onToggleModal('confirmModalOpen'));
        yield put(
          actions.onDeleteUserSuccess(data, pagingRequest.includeDeleted),
        );
      } else {
        NotificationManager.error(
          'NotiDeleteFailure',
          '',
          3000,
          null,
          null,
          '',
          'text-danger',
        );
      }
    } else {
      yield put(push('/error'));
    }
  } catch (err) {
    yield put(push('/error'));
  }
}

export function* createUser(values) {
  // eslint-disable-next-line prefer-destructuring
  const data = values.data;
  data.roles = _.map(data.roles, 'value');
  const body = JSON.stringify(data);
  const options = optionsPost(body);
  const requestURL = `${URL}Account/Create`;
  try {
    const response = yield call(request, requestURL, options);
    if (response) {
      if (!response.error) {
        NotificationManager.success(
          'NotiCreateSuccess',
          '',
          3000,
          null,
          null,
          '',
          'text-success',
        );
        yield put(actions.onToggleModal('detailModalOpen'));
        yield put(actions.onCreateUserSuccess(data));
      } else if (response.body.includes(DuplicateUserName)) {
        NotificationManager.error(
          DuplicateUserName,
          '',
          3000,
          null,
          null,
          '',
          'text-danger',
        );
      } else if (response.body.includes(DuplicateEmail)) {
        NotificationManager.error(
          DuplicateEmail,
          '',
          3000,
          null,
          null,
          '',
          'text-danger',
        );
      } else {
        NotificationManager.error(
          'NotiCreateFailure',
          '',
          3000,
          null,
          null,
          '',
          'text-danger',
        );
      }
    } else {
      yield put(push('/error'));
    }
  } catch (err) {
    yield put(push('/error'));
  }
}

export default function* userData() {
  yield all([
    takeLatest(GET_LIST_USER_REQUEST, getListUser),
    takeLatest(GET_DROPDOWN_ROLE_REQUEST, getRoleDropDown),
    takeLatest(GET_USER_DETAIL_REQUEST, getUserDetail),
    takeLatest(ON_UPDATE_USER_REQUEST, updateUser),
    takeLatest(ON_DELETE_USER_REQUEST, deleteUser),
    takeLatest(ON_CREATE_USER_REQUEST, createUser),
  ]);
  yield take(LOCATION_CHANGE);
}
