import { Fragment } from 'react';
import React from 'react'
import ReactDOM from 'react-dom'


const Layout = (props) => {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
