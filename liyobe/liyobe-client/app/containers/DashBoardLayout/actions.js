/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import * as types from './constants';

export const changeDefaultClassnames = strCurrentClasses => ({
  type: types.MENU_CHANGE_DEFAULT_CLASSES,
  payload: strCurrentClasses,
});

export const addContainerClassname = (classname, strCurrentClasses) => {
  const newClasses =
    !strCurrentClasses.indexOf(classname) > -1
      ? `${strCurrentClasses} ${classname}`
      : strCurrentClasses;
  return {
    type: types.MENU_CONTAINER_ADD_CLASSNAME,
    payload: newClasses,
  };
};

export const clickOnMobileMenu = strCurrentClasses => {
  const currentClasses = strCurrentClasses
    ? strCurrentClasses
      .split(' ')
      .filter(x => x !== '' && x !== 'sub-show-temporary')
    : '';
  let nextClasses = '';
  if (currentClasses.includes('main-show-temporary')) {
    nextClasses = currentClasses
      .filter(x => x !== 'main-show-temporary')
      .join(' ');
  } else {
    nextClasses = `${currentClasses.join(' ')} main-show-temporary`;
  }
  return {
    type: types.MENU_CLICK_MOBILE_MENU,
    payload: { containerClassnames: nextClasses, menuClickCount: 0 },
  };
};

export const setContainerClassnames = (clickIndex, strCurrentClasses) => {
  const currentClasses = strCurrentClasses
    ? strCurrentClasses.split(' ').filter(x => x !== '')
    : '';
  let nextClasses = '';
  if (clickIndex % 4 === 0) {
    if (
      currentClasses.includes('menu-default') &&
      currentClasses.includes('menu-sub-hidden')
    ) {
      nextClasses = 'menu-default menu-sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden';
    }
    clickIndex = 0;
  } else if (clickIndex % 4 === 1) {
    if (
      currentClasses.includes('menu-default') &&
      currentClasses.includes('menu-sub-hidden')
    ) {
      nextClasses = 'menu-default menu-sub-hidden main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary';
    }
  } else if (clickIndex % 4 === 2) {
    if (
      currentClasses.includes('menu-default') &&
      currentClasses.includes('menu-sub-hidden')
    ) {
      nextClasses = 'menu-default menu-sub-hidden sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary sub-show-temporary';
    }
  } else if (clickIndex % 4 === 3) {
    if (
      currentClasses.includes('menu-default') &&
      currentClasses.includes('menu-sub-hidden')
    ) {
      nextClasses = 'menu-default menu-sub-hidden sub-show-temporary';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden sub-show-temporary';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary';
    }
  }
  if (currentClasses.includes('menu-mobile')) {
    nextClasses += ' menu-mobile';
  }
  return {
    type: types.MENU_SET_CLASSNAMES,
    payload: { containerClassnames: nextClasses, menuClickCount: clickIndex },
  };
};

export const hierachyRequest = () => ({
  type: types.HIERACHY_REQUEST,
});

export const hierachySuccess = payload => ({
  type: types.HIERACHY_SUCCESS,
  payload,
});

export const setHierachy = values => ({
  type: types.HIERACHY_SET,
  values,
});

export const changePaging = data => ({
  type: types.CHANGE_PAGING,
  data,
});

export const resetPaging = () => ({
  type: types.RESET_PAGING,
});

// MODAL
export const onToggleModal = modalType => ({
  type: types.ON_TOGGLE_MODAL,
  modalType,
});