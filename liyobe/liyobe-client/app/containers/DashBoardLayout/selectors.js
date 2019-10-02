import { createSelector } from 'reselect';
import initialState from './reducer';

const selectDashBoardLayoutDomain = state =>
  state.get('dashboardLayout', initialState);

const makeSelectDashBoardLayout = () =>
  createSelector(selectDashBoardLayoutDomain, substate => substate.toJS());

const makeSelectPagingRequest = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('pagingRequest').toJS(),
  );

const makeSelectDetailModalOpen = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('detailModalOpen'),
  );

const makeSelectDetailSubModalOpen = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('detailSubModalOpen'),
  );

const makeSelectConfirmModalOpen = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('confirmModalOpen'),
  );
const makeSelectConfirmSubModalOpen = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('confirmSubModalOpen'),
  );
const makeSelectHiarachy = () =>
  createSelector(selectDashBoardLayoutDomain, substate =>
    substate.get('hiarachy'),
  );

export default makeSelectDashBoardLayout;

export {
  selectDashBoardLayoutDomain,
  makeSelectPagingRequest,
  makeSelectDetailModalOpen,
  makeSelectDetailSubModalOpen,
  makeSelectConfirmModalOpen,
  makeSelectConfirmSubModalOpen,
  makeSelectHiarachy,
};
