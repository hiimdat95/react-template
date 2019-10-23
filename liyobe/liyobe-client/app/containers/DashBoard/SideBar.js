/* eslint-disable react/no-find-dom-node */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Nav, NavItem } from "reactstrap";
import { withRouter, NavLink } from 'react-router-dom';
import classnames from "classnames";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withCookies } from 'react-cookie';
import { CookieListSideBar } from 'utils/constants';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectContainerClassName,
    makeSelectMenuClickCount,
    makeSelectMenuHiddenBreakpoint,
    makeSelectSubHiddenBreakPoint,
    makeSelectHiarachy,
  } from './selectors';
  import messages from './messages';
  
  import * as actions from './actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: "",
      viewingParentMenu:"", 
    };
  }

  initSideBar = () => {
    const { cookies } = this.props;
    const listSideBar = cookies.get(CookieListSideBar);
    // if (listSideBar) {
    //   this.props.setHierachy(listSideBar);
    // } else {
    //   this.props.getHierachy(cookies);
    // }
  };
  componentWillMount() {
    this.initSideBar();
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
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick =e => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (
      (container.contains(e.target) || container === e.target) ||
      isMenuClick
    ) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu:""
    })
  }

  getMenuClassesForResize = classes=> {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter(x => x != "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => x != "menu-sub-hidden");
      }
    }
    return nextClasses;
  }

  getContainer = () => ReactDOM.findDOMNode(this);
  toggle =() => {
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount == 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps = () => {
    this.addEvents();
  }

  addEvents = () => {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }
  removeEvents = () => {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }
  setSelectedLiActive = () => {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          "data-parent"
        )
      });
    }else{
      var selectedParentNoSubItem = document.querySelector(".main-menu  li a.active");
      if(selectedParentNoSubItem!=null){
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            "data-flag"
          )
        });
      }else if (this.state.selectedParentMenu == "") {
        this.setState({
          selectedParentMenu: "dashboards"
        });
      }

    } 
  }



  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent) {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 2 || menuClickCount == 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else {
      this.props.addContainerClassname(
        "sub-show-temporary",
        containerClassnames
      );
    }
    this.setState({
      viewingParentMenu : selectedParent 
    });
  }
  changeViewingParentMenu(menu){
    this.toggle();

    this.setState({
      viewingParentMenu:menu
    })
  }

  render() {
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "dashboards" && this.state.viewingParentMenu=="" )|| this.state.viewingParentMenu=="dashboards")
                  })}
                >
                  <NavLink
                    to="/app/dashboards/default"
                    onClick={e => this.openSubMenu(e, "dashboards")}
                  >
                    <i className="iconsmind-Shop-4" />{" "}
                    <FormattedMessage {...messages["DASHBOARD"]}  />
                  </NavLink>
                </NavItem>


                
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "dashboards" && this.state.viewingParentMenu=="" )|| this.state.viewingParentMenu=="dashboards")
                })}
                data-parent="dashboards"
              >
                <NavItem>
                  <NavLink to="/dashboard">
                    <i className="simple-icon-briefcase" />{" "}
                    <FormattedMessage {...messages["SETTING"]}/>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink to="/app/dashboards/analytics">
                    <i className="simple-icon-pie-chart" />{" "}
                    <FormattedMessage id="menu.analytics" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/dashboards/ecommerce">
                    <i className="simple-icon-basket-loaded" />{" "}
                    <FormattedMessage id="menu.ecommerce" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/dashboards/content">
                    <i className="simple-icon-doc" />{" "}
                    <FormattedMessage id="menu.content" />
                  </NavLink>
                </NavItem> */}
              </Nav>
              
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    containerClassnames: makeSelectContainerClassName(),
    menuClickCount: makeSelectMenuClickCount(),
    subHiddenBreakpoint: makeSelectSubHiddenBreakPoint(),
    menuHiddenBreakpoint: makeSelectMenuHiddenBreakpoint(),
    hiarachy: makeSelectHiarachy(),
  });
  
  export function mapDispatchToProps(dispatch) {
    return {
      setContainerClassnames: (index, className) => {
        dispatch(actions.setContainerClassnames(index, className));
      },
      addContainerClassname: (className, strCurrentClass) => {
        dispatch(actions.addContainerClassname(className, strCurrentClass));
      },
      getHierachy: cookies => {
        dispatch(actions.hierachyRequest(cookies));
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
    withCookies,
    withRouter,
    withConnect,
  )(Sidebar);
  