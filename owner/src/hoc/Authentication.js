import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Login from "../screens/Login/components";

const Authentication = ({children, isAuthenticated}) => {

  if (!isAuthenticated) return <Login/>

  return children;
}

const selectors = createStructuredSelector({
  isLoadingVisible: store => store.App.isLoadingVisible,
  isAuthenticated: store => store.App.isAuthenticated,
})

export default connect(selectors)(Authentication)