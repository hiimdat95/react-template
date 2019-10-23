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
// import ProfileImg from 'assets/img/profile.png';
import styled, { keyframes } from "styled-components";
// import Logo from 'assets/img/logo2.png';
// import LogoMobile from 'assets/img/logo.png';
import Icon from '-!svg-react-loader?name=Icon!assets/img/logo.svg';
// import { makeSelectUser } from 'containers/LoginPage/selectors';
import { FormattedMessage } from 'react-intl';
import commonMessage from 'utils/commonMessage';
import ChangeLanguage from 'components/DropdownLang';
import makeSelectDashBoardLayout from '../selectors';
import * as actions from '../actions';
import messages from '../messages';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const fade = keyframes`
0% {
fill:#61DAFB;
}
50% {
 fill:black;
}
100%{
  fill:#61DAFB;
}
`;

const pulse = keyframes`
0% {
  transform: scale(0);
  opacity: 1;
  transform-origin: center;
}
100% {
  transform: scale(4.5);
  opacity: 0;
  transform-origin: center;
}
`;

const StyledLogo = styled(Icon)`
  animation: ${rotate} infinite 20s linear;
  height: 25rem;
  width: 25rem;
  display: block;
  margin: auto;
  .lines {
    animation: ${fade} infinite 8s linear;
  }
  .circle {
    animation: ${pulse} infinite 4s linear;
    &:hover {
      animation-play-state: paused;
      cursor: pointer;
    }
  }
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
    // const { user } = this.props;
    const { containerClassnames, menuClickCount } = this.props.DashBoardLayout;
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
          <StyledLogo className="logo d-none d-xs-block"/>
        </a>
        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
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
          {/* <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{user ? user.fullname : null}</span>
                <span>
                  <img alt="Profile" src={ProfileImg} />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <NavLink to="/dashboard/accountInfo" key="accountInfo">
                  <DropdownItem>
                    <FormattedMessage {...messages.Account} />
                  </DropdownItem>
                </NavLink>
                <NavLink to="/dashboard/userSetting" key="userSetting">
                  <DropdownItem>
                    <FormattedMessage {...messages.Setting} />
                  </DropdownItem>
                </NavLink>
                <NavLink to="/dashboard/changePass" key="changePass">
                  <DropdownItem>
                    <FormattedMessage {...commonMessage.CHANGEPASS} />
                  </DropdownItem>
                </NavLink>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  <FormattedMessage {...messages.SignOut} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div> */}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  DashBoardLayout: makeSelectDashBoardLayout(),
  // user: makeSelectUser(),
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
