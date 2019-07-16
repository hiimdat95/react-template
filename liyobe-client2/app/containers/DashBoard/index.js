import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import AccountPage from 'containers/AccountPage';
import saga from './saga';
import { makeSelectContainerClassName } from './selectors';
import HomeDashBoard from './home';
import reducer from './reducer';
import TopNav from './TopNav';
import Sidebar from './SideBar';
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

const mapStateToProps = createStructuredSelector({
  containerClassnames: makeSelectContainerClassName(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withReducer,
  withConnect,
  withSaga,
)(DashBoard);
