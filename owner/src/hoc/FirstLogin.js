import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import FirstLoginScreen from "../screens/FirstLogin/components";

const FirstLogin = ({children, isViewed}) => {

  if (isViewed === false) return <FirstLoginScreen/>

  return children;
}

const selectors = createStructuredSelector({
  isViewed: store => store.App.isFirstLoginGreetingViewed,
})

export default connect(selectors)(FirstLogin)