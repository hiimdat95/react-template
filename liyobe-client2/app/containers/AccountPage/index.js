import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import UserPage from './UserPage/index';

const AccountPage = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
      <Route path={`${match.url}/user`} component={UserPage} />
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default AccountPage;
