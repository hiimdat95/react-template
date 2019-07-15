// import { getLoggedInUser } from './auth';
export const optionsLogin = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: 'Bearer'
  },
  body,
});

export const optionsModifyPass = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json',
    // 'x-token': getLoggedInUser() ? getLoggedInUser().access_token : null,
    // 'x-refresh-token': getLoggedInUser()
    //   ? getLoggedInUser().refreshToken
    //   : null,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  body,
});

export const optionsGet = () => ({
  method: 'get',
  headers: {
    Accept: 'application/json',
    // Authorization: getLoggedInUser()
    //   ? `Bearer ${getLoggedInUser().access_token}`
    //   : null,
    'Content-Type': 'application/json',
  },
});

export const optionsPost = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    // Authorization: getLoggedInUser()
    //   ? `Bearer ${getLoggedInUser().access_token}`
    //   : null,
    'Content-Type': 'application/json',
  },
  body,
});

export const optionsPostForm = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    // 'x-token': getLoggedInUser() ? getLoggedInUser().access_token : null,
    // 'x-refresh-token': getLoggedInUser()
    //   ? getLoggedInUser().refreshToken
    //   : null,
  },
  body,
});

export const optionsPostUploadFile = body => {
  const data = new FormData();
  data.append('file', body);
  return {
    method: 'post',
    headers: {
      Accept: 'application/json',
      // 'x-token': getLoggedInUser() ? getLoggedInUser().access_token : null,
      // 'x-refresh-token': getLoggedInUser()
      //   ? getLoggedInUser().refreshToken
      //   : null,
    },
    body: data,
  };
};

export const optionsDelete = () => ({
  method: 'delete',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    // 'x-token': getLoggedInUser() ? getLoggedInUser().access_token : null,
    // 'x-refresh-token': getLoggedInUser()
    //   ? getLoggedInUser().refreshToken
    //   : null,
  },
});
export const optionsPut = body => ({
  method: 'put',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    // 'x-token': getLoggedInUser() ? getLoggedInUser().access_token : null,
    // 'x-refresh-token': getLoggedInUser()
    //   ? getLoggedInUser().refreshToken
    //   : null,
  },
  body,
});
export default { optionsLogin, optionsGet, optionsDelete, optionsPut };
