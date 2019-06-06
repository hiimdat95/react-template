/**
 *
 * DashBoard
 *
 */

import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AccountPage from 'containers/AccountPage';

import HomeDashBoard from './home';
import reducer from './reducer';
import TopNav from './TopNav';
import Sidebar from './SideBar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectContainerClassName } from './selectors';
import reducer from './reducer';
import saga from './saga';

import 'react-table/react-table.css';
import 'react-datepicker/dist/react-datepicker.css';


/* eslint-disable react/prefer-stateless-function */
export class DashBoard extends React.Component {
  render() {
    const { containerClassnames, match } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Switch>
              <Route exact path={`${match.url}/`} component={HomeDashBoard} />
              <Route path={`${match.url}/account`} component={AccountPage} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  containerClassnames: makeSelectContainerClassName(),
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

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashBoard);
