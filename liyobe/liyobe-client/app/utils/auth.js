/* eslint-disable camelcase */
import decode from 'jwt-decode';

export const isAuthenticated = () => {
  try {
    const access_token = JSON.parse(sessionStorage.getItem('access_token'));
    if (!access_token) return false;
    decode(access_token);
    const { exp } = decode(access_token);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const getLoggedInUser = () => {
  try {
    const access_token = JSON.parse(sessionStorage.getItem('access_token'));
    if (!access_token) return null;
    const detail = decode(access_token);
    return {
      ...detail.user,
      access_token,
    };
  } catch (err) {
    return null;
  }
};
