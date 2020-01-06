import { getLoggedInUser } from './auth';
export const optionsLogin = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body,
});

export const optionsGet = () => ({
  method: 'get',
  headers: {
    Accept: 'application/json',
    Authorization: getLoggedInUser()
      ? `JWT ${getLoggedInUser().access_token}`
      : null,
    'Content-Type': 'application/json',
  },
});

export const optionsPost = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    Authorization: getLoggedInUser()
      ? `JWT ${getLoggedInUser().access_token}`
      : null,
    'Content-Type': 'application/json',
  },
  body,
});

export const optionsModifyPass = body => ({
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    Authorization: getLoggedInUser()
      ? `JWT ${getLoggedInUser().access_token}`
      : null,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  body,
});

export const optionsPostUploadFile = body => {

  const data = new FormData();
  if (body) {
    console.log(body)
    body.FileList.forEach(x => {
      data.append('file', x);
    });
  }
  return {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: getLoggedInUser()
        ? `JWT ${getLoggedInUser().access_token}`
        : null,
    },
    body: data,
  };
};

export default { optionsLogin, optionsGet };
