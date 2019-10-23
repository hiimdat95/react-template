/**
 *
 * DashBoard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashBoard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>DashBoard</title>
          <meta name="description" content="Description of DashBoard" />
        </Helmet>
        Hello
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dashBoard: makeSelectDashBoard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashBoard', reducer });
const withSaga = injectSaga({ key: 'dashBoard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashBoard);
