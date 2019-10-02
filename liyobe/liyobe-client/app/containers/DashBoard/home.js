import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class HomeDashBoard extends React.PureComponent {
  render() {
    return (
      <h1>
        <FormattedMessage {...messages.TitleDashBoardHome} />
      </h1>
    );
  }
}
