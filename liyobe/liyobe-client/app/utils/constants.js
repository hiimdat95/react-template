export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
// Part
export const PART_HOME = '/';
export const PART_DASHBOARD = '/dashboard';
// API Url
// export const URL = 'http://10.136.43.225:85/api/';
// export const URL_AUTH = 'http://10.136.43.225:85/api/';
// export const URL_UPLOAD = 'http://10.136.43.225:85';

// export const URL = 'http://localhost:56074/api/';
// export const URL_AUTH = 'http://localhost:56074/connect/token';
// export const URL_UPLOAD = 'http://localhost:56074';

export const URL_UPLOAD = 'http://localhost:4000/upload';
export const URL_SERVER = 'http://localhost:4000/';
export const URL = 'http://localhost:4000/api/';
export const URL_AUTH = 'http://localhost:4000/api/login';
export const clientId = 'vntm_spa';
export const clientSecret = '49C1A7E1-0C79-4A89-A3D6-A37998FG5R6';

export const defaultMenuType = 'menu-sub-hidden'; // 'menu-default', 'menu-hidden'
export const defaultStartPath = '/app/gogo/start';
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;

export const searchPath = '/app/gogo/start';

export const pageIndex = 1;
export const pageSize = 10;
export const OrderDefaut = 'createdAt';
export const OrderByRole = 'role';
export const OrderByParentId = 'parentId';

// noti code
export const NotiCode = {
  NotiCreateSuccess: 'NotiCreateSuccess',
  NotiCreateFailure: 'NotiCreateFailure',
  NotiUpdateSuccess: 'NotiUpdateSuccess',
  NotiUpdateFailure: 'NotiUpdateFailure',
  NotiDeleteSuccess: 'NotiDeleteSuccess',
  NotiDeleteFailure: 'NotiDeleteFailure',
  NotiSelectItem: 'NotiSelectItem',
  NotiSelectFiles: 'NotiSelectFiles',
  NotiSelectFilesLimit: 'NotiSelectFilesLimit',
};

// regex
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const usernameRegExp = /^[a-zA-Z0-9]+$/;

// Error Code
export const ErrCode = {
  DuplicateUserName: 'DUPLICATE_USERNAME',
  DuplicateEmail: 'DUPLICATE_EMAIL',
  DuplicateID: 'DUPLICATE_ID',
  InvalidLogin: 'InvalidLogin',
  InvalidCurrentPass: 'INVALID_CURRENT_PASS',
  IsLocked: 'IsLocked',
  ExistUserInRole: 'EXIST_USER_IN_ROLE',
  LimitCreateHeadMenu: 'LIMIT_CREATE_HEADMENU',
};
