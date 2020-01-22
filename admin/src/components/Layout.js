import React from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const Layout = ({isMinimized, children}) => {

  // return <div className={(!isMinimized ? "col-11 col-md-9 col-lg-10" : "col")}>
  return <div className="col-12">

    {children}

  </div>
}

const selectors = createStructuredSelector({
  isMinimized: store => store.Nav.isMinimized,
})

export default connect(selectors)(Layout)
