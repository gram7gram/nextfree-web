import React from 'react';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import {LOGOUT, TOGGLE_MENU_MINIMIZE} from "../screens/Login/actions";
import parameters from "../parameters";

const Navigation = ({isAuthenticated, isMinimized}) => {

  const dispatch = useDispatch()

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  const toggleMinimize = () => {
    dispatch({
      type: TOGGLE_MENU_MINIMIZE,
      payload: !isMinimized
    })
  }

  return <nav>

    <div className="container-fluid">

      <div className="row align-items-center no-gutters justify-content-around">

        <div className="col-auto">
          <button className={"sidebar-control p-3 text-truncate"
          + (isMinimized ? " text-center" : '')}
                  onClick={toggleMinimize}>
            <i className="fa fa-bars"/>
          </button>
        </div>

        <div className="col text-left text-md-center">
          <a href={parameters.wwwHost}>
            <img src={`${parameters.storageHost}/img/v2/logo-admin.svg`}
                 alt=""
                 className="img-fluid"/>
          </a>
        </div>

        <div className="col-auto">
          {isAuthenticated &&
          <button className="btn btn-link small text-truncate text-danger"
                  onClick={logout}>{i18n.t('navigation.logout')}</button>}
        </div>
      </div>
    </div>

  </nav>
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  isMinimized: store => store.Nav.isMinimized,
})

export default connect(selectors)(Navigation)
