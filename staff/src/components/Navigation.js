import React from 'react';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import {LOGOUT, TOGGLE_MENU} from "../screens/Login/actions";
import parameters from "../parameters";

const Navigation = ({isAuthenticated, isVisible}) => {

  const dispatch = useDispatch()

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  const toggleMenu = () => {
    dispatch({
      type: TOGGLE_MENU,
      payload: !isVisible
    })
  }

  return <nav>

    <div className="container-fluid">

      <div className="row align-items-center no-gutters justify-content-around">

        <div className="col-auto">
          <button className={"sidebar-control p-3 text-truncate"
          + (isVisible ? " text-center" : '')}
                  onClick={toggleMenu}>
            <i className="fa fa-bars"/>
          </button>
        </div>

        <div className="col text-left text-md-center">
          <a href={parameters.host}>
            <img src={`${parameters.storageHost}/img/v2/logo-staff.svg`}
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
  isVisible: store => store.Nav.isVisible,
})

export default connect(selectors)(Navigation)
