import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Spinner from "../components/Loading";

const Loading = ({children, isLoadingVisible}) => {

  if (isLoadingVisible) return <Spinner/>

  return children;
}

const selectors = createStructuredSelector({
  isLoadingVisible: store => store.App.isLoadingVisible,
})

export default connect(selectors)(Loading)