import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashBoard state domain
 */

const selectDashBoardDomain = state => state.get('dashBoard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashBoard
 */

const makeSelectDashBoard = () =>
  createSelector(selectDashBoardDomain, substate => substate.toJS());

export default makeSelectDashBoard;
export { selectDashBoardDomain };
