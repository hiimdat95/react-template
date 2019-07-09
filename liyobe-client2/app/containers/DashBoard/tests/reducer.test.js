import { fromJS } from 'immutable';
import dashBoardReducer from '../reducer';

describe('dashBoardReducer', () => {
  it('returns the initial state', () => {
    expect(dashBoardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
