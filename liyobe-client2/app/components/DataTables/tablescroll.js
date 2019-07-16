import React, { Component } from 'react';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

const CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody", props.className || [])}>
      <PerfectScrollbar option={{ suppressScrollX: true }}>{props.children}</PerfectScrollbar>
    </div>
);
export default CustomTbodyComponent;