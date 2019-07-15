/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import { logout } from 'containers/LoginPage/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import Logo from 'assets/img/logo2.png';
import LogoMobile from 'assets/img/logo.png';
// import { makeSelectUser } from 'containers/LoginPage/selectors';
import { FormattedMessage } from 'react-intl';
import ChangeLanguage from './ChangeLang';
import {
  makeSelectContainerClassName,
  makeSelectMenuClickCount,
} from './selectors';
import * as actions from './actions';
import messages from './messages';

const LogoWrap = styled.span`
  background: url(${Logo}) no-repeat;
  background-size: contain;
`;

const LogoMobileWrap = styled.span`
  background: url(${LogoMobile}) no-repeat;
  background-size: contain;
`;

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
    };
  }

  isInFullScreen = () =>
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    const docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    this.props.onLogout();
    this.props.history.push('/');
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount, user } = this.props;
    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </NavLink>

        <div className="d-inline-block">
          <ChangeLanguage />
        </div>

        <a className="navbar-logo" href="/">
          <LogoWrap className="logo d-none d-xs-block" />
          <LogoMobileWrap className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <div className="position-relative d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle
                  className="header-icon notificationButton"
                  color="empty"
                >
                  <i className="simple-icon-bell" />
                  <span className="count">3</span>
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 scroll"
                  right
                  id="notificationDropdown"
                >
                  <PerfectScrollbar
                    option={{ suppressScrollX: true, wheelPropagation: false }}
                  >
                    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                      <a href="/app">
                        <img
                          alt="Notification"
                          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                        />
                      </a>
                      <div className="pl-3 pr-2">
                        <a href="/app">
                          <p className="font-weight-medium mb-1">a</p>
                          <p className="text-muted mb-0 text-small">123122</p>
                        </a>
                      </div>
                    </div>
                  </PerfectScrollbar>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{user.get('fullname')}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>
                  <FormattedMessage {...messages.Account} />
                </DropdownItem>
                <DropdownItem>
                  <FormattedMessage {...messages.Setting} />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  <FormattedMessage {...messages.SignOut} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  containerClassnames: makeSelectContainerClassName(),
  menuClickCount: makeSelectMenuClickCount(),
  user: makeSelectUser(),
  // locale: [],
});

export function mapDispatchToProps(dispatch) {
  return {
    setContainerClassnames: (index, className) => {
      dispatch(actions.setContainerClassnames(index, className));
    },
    clickOnMobileMenu: className => {
      dispatch(actions.clickOnMobileMenu(className));
    },
    onLogout: () => {
      dispatch(logout());
    },
    changeLocale: () => {},
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNav);

// export default injectIntl(
//   connect(
//     mapStateToProps,
//     {
//       setContainerClassnames,
//       clickOnMobileMenu,
//       logout,
//       //  changeLocale
//     },
//   )(TopNav),
// );
