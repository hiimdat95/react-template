import { createSelector } from 'reselect';

const selectDashBoard = () => state => state.get('dashboard');

const makeSelectContainerClassName = () =>
  createSelector(selectDashBoard(), state => state.get('containerClassnames'));
const makeSelectMenuClickCount = () =>
  createSelector(selectDashBoard(), state => state.get('menuClickCount'));
const makeSelectSubHiddenBreakPoint = () =>
  createSelector(selectDashBoard(), state => state.get('subHiddenBreakpoint'));
const makeSelectMenuHiddenBreakpoint = () =>
  createSelector(selectDashBoard(), state => state.get('menuHiddenBreakpoint'));
const makeSelectHiarachy = () =>
  createSelector(selectDashBoard(), state => state.get('hiarachy'));
export {
  selectDashBoard,
  makeSelectContainerClassName,
  makeSelectMenuClickCount,
  makeSelectSubHiddenBreakPoint,
  makeSelectMenuHiddenBreakpoint,
  makeSelectHiarachy,
};
