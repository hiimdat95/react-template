import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Nav, NavItem } from 'reactstrap';
import { intlShape } from 'react-intl';
import messages from './messages';
import LogoWhite from 'assets/img/logo.png';
import LogoBlack from 'assets/img/logo2.png';

const LogoWhiteContent = styled.span`
  background: url(${LogoWhite});
  background-size: contain;
`;

const LogoBlackContent = styled.span`
  background: url(${LogoBlack});
  background-size: contain;
`;

export class MenuPage extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  openMobileMenu(event) {
    event.preventDefault();
    this.props.onMobileMenuToggle();
  }

  render() {
    const { formatMessage } = this.context.intl;
    return (
      <Container className="d-flex align-items-center justify-content-between">
        <NavLink
          className="navbar-logo pull-left"
          to="#"
          onClick={event => {
            this.props.onClick('home', event);
          }}
        >
          <LogoWhiteContent className="white" />
          <LogoBlackContent className="dark" />
        </NavLink>
        <Nav className="navbar-nav d-none d-lg-flex flex-row">
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
        </Nav>
        <NavLink
          className="mobile-menu-button"
          to="#"
          onClick={event => this.openMobileMenu(event)}
        >
          <i className="simple-icon-menu" />
        </NavLink>
      </Container>
    );
  }
}
