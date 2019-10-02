/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },
  Account: {
    id: `TopNav.Account`,
    defaultMessage: '',
  },
  Setting: {
    id: `TopNav.Setting`,
    defaultMessage: '',
  },
  SignOut: {
    id: `TopNav.SignOut`,
    defaultMessage: '',
  },
  TitleDashBoardHome: {
    id: `DashBoard.Home.Title`,
    defaultMessage: '',
  },
});
