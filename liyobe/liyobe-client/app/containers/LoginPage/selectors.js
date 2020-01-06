import { createSelector } from 'reselect';
import initialState from './reducer';

const selectLoginPageDomain = state => state.get('auth', initialState);

const makeSelectUser = () =>
  createSelector(selectLoginPageDomain, state => state.get('user').toJS());

export default selectLoginPageDomain;
export { makeSelectUser };
