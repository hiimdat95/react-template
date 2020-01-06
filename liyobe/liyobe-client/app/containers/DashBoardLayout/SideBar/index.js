/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem } from 'reactstrap';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter, NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import commonMessages from 'utils/commonMessage';
import _groupBy from 'lodash/groupBy';
import _orderBy from 'lodash/orderBy';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import { createStructuredSelector } from 'reselect';
import makeSelectDashBoardLayout from '../selectors';

import * as actions from '../actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
    };
  }

  componentWillMount() {
    this.props.getHierachy();
  }

  componentDidUpdate = prevProps => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }
    this.handleProps();
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = event => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props.DashBoardLayout;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(' '));
  };

  handleDocumentClick = e => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile',
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: '',
    });
  };

  getMenuClassesForResize = classes => {
    const {
      menuHiddenBreakpoint,
      subHiddenBreakpoint,
    } = this.props.DashBoardLayout;
    let nextClasses = classes.split(' ').filter(x => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => ReactDOM.findDOMNode(this);

  toggle = () => {
    const { containerClassnames, menuClickCount } = this.props.DashBoardLayout;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : '';

    if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true),
    );
  };

  removeEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true),
    );
  };

  setSelectedLiActive = () => {
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector('.sub-menu  a.active');
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          'data-parent',
        ),
      });
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active',
      );
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute('data-flag'),
        });
      } else if (this.state.selectedParentMenu === '') {
        this.setState({
          selectedParentMenu: 'dashboards',
        });
      }
    }
  };

  changeDefaultMenuType = (e, containerClassnames) => {
    e.preventDefault();
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(' '));
  };

  openSubMenu = (e, selectedParent, isHasSubItem, pathNoSubItem) => {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props.DashBoardLayout;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : '';
    if (!isHasSubItem) {
      this.props.setContainerClassnames(2, containerClassnames);
      this.props.history.push(pathNoSubItem);
    }
    if (!currentClasses.includes('menu-mobile') && isHasSubItem) {
      if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes('menu-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes('menu-default') &&
        !currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else if (isHasSubItem) {
      this.props.addContainerClassname(
        'sub-show-temporary',
        containerClassnames,
      );
    }
    this.setState({
      viewingParentMenu: selectedParent,
    });
  };

  changeViewingParentMenu = menu => {
    this.toggle();

    this.setState({
      viewingParentMenu: menu,
    });
  };

  render() {
    const { hiarachy } = this.props.DashBoardLayout;
    let functionTree = null;
    if (!_isEmpty(hiarachy)) {
      functionTree = _groupBy(hiarachy, 'ParentId');
      functionTree.null.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.children = functionTree[item.Id];
      });
      functionTree = functionTree.null;
    }

    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {_orderBy(functionTree, ['SortOrder'], ['true']).map(
                  x =>
                    x.Status == true ? (
                      <NavItem
                        key={x.Id}
                        className={classnames({
                          active:
                            (this.state.selectedParentMenu === x.Id &&
                              this.state.viewingParentMenu === x.Id) ||
                            this.state.viewingParentMenu === x.Id,
                        })}
                      >
                        <NavLink
                          to={x.URL}
                          onClick={e => {
                            this.openSubMenu(
                              e,
                              x.Id,
                              !_isEmpty(x.children),
                              x.URL,
                            );
                          }}
                        >
                          <i className={x.IconCss} />
                          <FormattedMessage {...commonMessages[x.Id]} />
                        </NavLink>
                      </NavItem>
                    ) : null,
                )}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {_map(
                functionTree,
                x =>
                  x.Status == true ? (
                    <Nav
                      className={classnames({
                        'd-block':
                          (this.state.selectedParentMenu === x.Id &&
                            this.state.viewingParentMenu === '') ||
                          this.state.viewingParentMenu === x.Id,
                      })}
                      data-parent={x.Id}
                      key={x.Id}
                    >
                      {_orderBy(x.children, ['SortOrder'], 1).map(
                        y =>
                          y.Status == true ? (
                            <NavItem key={y.Id}>
                              <NavLink to={y.URL}>
                                <i className={y.IconCss} />
                                <FormattedMessage {...commonMessages[y.Id]} />
                              </NavLink>
                            </NavItem>
                          ) : null,
                      )}
                    </Nav>
                  ) : null,
              )}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  DashBoardLayout: makeSelectDashBoardLayout(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setContainerClassnames: (index, className) => {
      dispatch(actions.setContainerClassnames(index, className));
    },
    addContainerClassname: (className, strCurrentClass) => {
      dispatch(actions.addContainerClassname(className, strCurrentClass));
    },
    getHierachy: () => {
      dispatch(actions.hierachyRequest());
    },
    setHierachy: values => {
      dispatch(actions.setHierachy(values));
    },
    changeDefaultClassnames: () => {
      dispatch(actions.changeDefaultClassnames());
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Sidebar);
