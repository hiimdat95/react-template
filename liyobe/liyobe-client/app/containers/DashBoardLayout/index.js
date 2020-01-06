import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
// import AccountPage from 'containers/AccountManagePage/';
// import SettingManagePage from 'containers/SettingManagePage/';
// import PageLandingManagePage from 'containers/PageLandingManagePage/';
import HomeDashBoard from 'containers/DashBoard/Loadable';
// import AccountInfo from './AccountInfoPage/Loadable';
// import UserSetting from './UserSettingPage/Loadable';
// import UserChangePass from './UserChangePassPage/Loadable';
import saga from './saga';
import makeSelectDashBoardLayout from './selectors';
import reducer from './reducer';
import TopNav from './TopNav';
import Sidebar from './SideBar';
import 'react-table/react-table.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';

/* eslint-disable react/prefer-stateless-function */
export class DashBoardLayout extends Component {
  render() {
    const { match } = this.props;
    const { containerClassnames } = this.props.DashBoardLayout;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Switch>
              <Route exact path={`${match.url}/`} component={HomeDashBoard} />
              {/* <Route path={`${match.url}/account`} component={AccountPage} />
              <Route path={`${match.url}/pagelanding`} component={PageLandingManagePage} /> */}
              {/* <Route
                path={`${match.url}/accountInfo`}
                component={AccountInfo}
              />
              <Route
                path={`${match.url}/userSetting`}
                component={UserSetting}
              />
              <Route
                path={`${match.url}/changePass`}
                component={UserChangePass}
              />
              <Route
                path={`${match.url}/system`}
                component={SettingManagePage}
              /> */}
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  DashBoardLayout: makeSelectDashBoardLayout(),
});

// export function mapDispatchToProps(dispatch) {
//   return {
//     // dispatch,
//   };
// }

const withReducer = injectReducer({ key: 'dashboardLayout', reducer });
const withSaga = injectSaga({ key: 'dashboardLayout', saga });

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

export default compose(
  withRouter,
  withReducer,
  withConnect,
  withSaga,
)(DashBoardLayout);
