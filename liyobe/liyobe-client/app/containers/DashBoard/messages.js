/*
 * DashBoard Messages
 *
 * This contains all the text for the DashBoard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashBoard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DashBoard container!',
  },
});
