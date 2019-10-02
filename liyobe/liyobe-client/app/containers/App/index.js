/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'components/ReactNotification';
import DashBoardLayout from 'containers/DashBoardLayout/Loadable';
// import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ErrorPage from 'containers/ErrorPage/Loadable';
// import LoginPage from 'containers/LoginPage/Loadable';

// import PrivateRoute from 'components/PrivateRoute/';

import 'react-perfect-scrollbar/dist/css/styles.css';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Fragment>
      <NotificationContainer />
      <Switch>
        <Route exact path="/dashboard" component={DashBoardLayout} />
        {/* <Route exact path="/login" component={LoginPage} />
        <Route exact path="/error" component={ErrorPage} /> */}
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
