import { Fragment } from 'react';
import React from 'react'



const Layout = (props) => {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
