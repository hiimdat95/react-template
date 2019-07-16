/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Row, Container, Collapse } from 'reactstrap';
import { Colxx } from 'components/CustomBootstrap';
import { NavLink } from 'react-router-dom';
export class HomeFooter extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      accordion: [false, false, false, false],
    };
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
    });
  }

  componentDidMount() {
    this.onResizeLandingPage();
    window.addEventListener('resize', this.onResizeLandingPage, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeLandingPage, true);
  }

  onResizeLandingPage() {
    const rowOffestFooter = document.querySelector('.footer-row').offsetLeft;
    document.querySelector(
      '.landing-page .section.footer',
    ).style.backgroundPositionX = `${window.outerWidth -
      rowOffestFooter -
      1668}px`;
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row className="footer-row">
            <Colxx xxs="12" className="text-right">
              <NavLink
                className="btn btn-circle btn-outline-semi-light footer-circle-button "
                to="#"
                onClick={event => {
                  this.props.onClick('home', event);
                }}
              >
                <i className="simple-icon-arrow-up" />
              </NavLink>
            </Colxx>
            <Colxx xxs="12" className="text-center footer-content">
              <NavLink to="/multipage-home">
                <img
                  className="footer-logo"
                  alt="footer logo"
                  src="/assets/img/landing-page/logo-footer.svg"
                />
              </NavLink>
            </Colxx>
          </Row>

          <Row>
            <Colxx
              xxs={{ size: 12, offset: 0 }}
              xs="6"
              sm="3"
              lg={{ size: 2, offset: 2 }}
              className="footer-menu mb-5"
            >
              <div className="d-flex flex-column align-items-center">
                <a
                  className="d-inline-block d-xs-none collapse-button mb-1"
                  onClick={() => this.toggleAccordion(0)}
                  aria-expanded={this.state.accordion[0]}
                >
                  sda
                  <i className="simple-icon-arrow-down" />
                </a>

                <Collapse
                  tag="ul"
                  isOpen={this.state.accordion[0]}
                  className="list-unstyled footer-menu d-xs-block mb-0"
                >
                  <li className="d-none d-xs-inline-block">
                    <p>
                      asd
                    </p>
                  </li>
                  <li>
                    <NavLink to="/about">
                      asd
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog">
                      fds
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/careers">
                    dbf
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">
                 fds
                    </NavLink>
                  </li>
                </Collapse>
              </div>
            </Colxx>

            <Colxx
              xxs={{ size: 12, offset: 0 }}
              xs="6"
              sm="3"
              lg={{ size: 2 }}
              className="footer-menu mb-5"
            >
              <div className="d-flex flex-column align-items-center">
                <a
                  className="d-inline-block d-xs-none collapse-button mb-1"
                  onClick={() => this.toggleAccordion(1)}
                  aria-expanded={this.state.accordion[1]}
                >
                 vd
                  <i className="simple-icon-arrow-down" />
                </a>

                <Collapse
                  tag="ul"
                  isOpen={this.state.accordion[1]}
                  className="list-unstyled footer-menu  d-xs-block mb-0"
                >
                  <li className="d-none d-xs-inline-block">
                    <p>
                     fds
                    </p>
                  </li>
                  <li>
                    <NavLink to="/features">
                     fsd
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/prices">
                     bgf
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/docs-details">
                      sdf
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/docs-details">
                      fsd
                    </NavLink>
                  </li>
                </Collapse>
              </div>
            </Colxx>

            <Colxx
              xxs={{ size: 12, offset: 0 }}
              xs="6"
              sm="3"
              lg={{ size: 2 }}
              className="footer-menu mb-5"
            >
              <div className="d-flex flex-column align-items-center">
                <a
                  className="d-inline-block d-xs-none collapse-button mb-1"
                  onClick={() => this.toggleAccordion(2)}
                  aria-expanded={this.state.accordion[2]}
                >
                  sdf
                  <i className="simple-icon-arrow-down" />
                </a>

                <Collapse
                  tag="ul"
                  isOpen={this.state.accordion[2]}
                  className="list-unstyled footer-menu  d-xs-block mb-0"
                >
                  <li className="d-none d-xs-inline-block">
                    <p>
                   sdf
                    </p>
                  </li>
                  <li>
                    <NavLink to="/contact">
                      hrt
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/docs-details">
                      ger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/docs">
                 ger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/videos">
                    ger
                    </NavLink>
                  </li>
                </Collapse>
              </div>
            </Colxx>

            <Colxx
              xxs={{ size: 12, offset: 0 }}
              xs="6"
              sm="3"
              lg={{ size: 2 }}
              className="footer-menu mb-5"
            >
              <div className="d-flex flex-column align-items-center">
                <a
                  className="d-inline-block d-xs-none collapse-button mb-1"
                  onClick={() => this.toggleAccordion(3)}
                  aria-expanded={this.state.accordion[3]}
                >
                 erger
                  <i className="simple-icon-arrow-down" />
                </a>

                <Collapse
                  tag="ul"
                  isOpen={this.state.accordion[3]}
                  className="list-unstyled footer-menu collapse d-xs-block mb-0"
                >
                  <li className="d-none d-xs-inline-block">
                    <p>
                    ger
                    </p>
                  </li>
                  <li>
                    <NavLink to="/content">
                     bdf
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/content">
                    fds
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/content">
                     few
                    </NavLink>
                  </li>
                </Collapse>
              </div>
            </Colxx>
          </Row>
        </Container>

        <div className="separator mt-5" />

        <Container className="copyright pt-5 pb-5">
          <Row>
            <div className="col-6">
              <p className="mb-0">
               few
              </p>
            </div>
            <div className="col-6 text-right social-icons">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="simple-icon-social-facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="simple-icon-social-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="simple-icon-social-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
export default HomeFooter;
