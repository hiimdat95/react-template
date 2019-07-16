import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { intlShape } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import Logo from 'assets/img/logo2.png';

const LogoContent = styled.span`
  background: url(${Logo});
  background-size: contain;
`;

export class MenuPageMobile extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  componentDidMount() {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true),
    );
  }

  componentWillUnmount() {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true),
    );
    this.props.onUnmountingMenu();
  }

  handleDocumentClick = e => {
    // eslint-disable-next-line react/no-find-dom-node
    const container = ReactDOM.findDOMNode(this);
    if (container.contains(e.target) || container === e.target) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return this.props.onUnmountingMenu();
  };

  render() {
    const { formatMessage } = this.context.intl;
    return (
      <div className="mobile-menu">
        <NavLink
          className="logo-mobile scrollTo"
          to="#"
          onClick={event => {
            this.props.onClick('home', event);
          }}
        >
          <LogoContent />
        </NavLink>
        <Nav className="navbar-nav">
          <NavItem>
            <NavLink
              to="#"
              onClick={event => {
                this.props.onClick('features', event);
              }}
            >
              {formatMessage(messages.MenuFeature)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              onClick={event => {
                this.props.onClick('reviews', event);
              }}
            >
              {formatMessage(messages.MenuReviews)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              onClick={event => {
                this.props.onClick('pricing', event);
              }}
            >
              {formatMessage(messages.MenuPricing)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              onClick={event => {
                this.props.onClick('blog', event);
              }}
            >
              {formatMessage(messages.MenuBlogs)}
            </NavLink>
          </NavItem>
          <NavItem>
            <div className="separator" />
          </NavItem>

          <NavItem>
            <NavLink to="/auth-login">
              {formatMessage(messages.MenuSignIn)}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/auth-register">
              {formatMessage(messages.MenuSignUp)}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
