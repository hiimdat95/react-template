import { fromJS } from 'immutable';
import dashBoardLayoutReducer from '../reducer';

describe('dashBoardLayoutReducer', () => {
  it('returns the initial state', () => {
    expect(dashBoardLayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
