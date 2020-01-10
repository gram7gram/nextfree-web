import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import * as Pages from "../router/Pages";
import {LOGOUT, TOGGLE_MENU} from "../screens/Login/actions";

const Navigation = (props) => {

  const dispatch = useDispatch()

  const hideMobileNavigation = () => {
    dispatch({
      type: TOGGLE_MENU,
      payload: false
    })
  }

  const toggleMobileNavigation = () => {
    const {isMobileMenuVisible} = props.Nav

    dispatch({
      type: TOGGLE_MENU,
      payload: !isMobileMenuVisible
    })
  }

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  const {isAuthenticated} = props
  const {isMobileMenuVisible} = props.Nav

  return <nav className="navbar navbar-expand-sm bg-dark-gray">

    <a className="navbar-brand py-0" href="https://nextfree.com.ua">
      {i18n.t('navigation.logo')}
      <br/><small className="text-light-red">{i18n.t('navigation.logo_footer')}</small>
    </a>

    <button className="navbar-toggler"
            type="button"
            onClick={toggleMobileNavigation}>
      <i className="fa fa-bars"/>
    </button>

    <div className={"navbar-collapse collapse" + (isMobileMenuVisible ? " show" : "")}>
      <ul className="navbar-nav mr-auto text-center">

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.QR_CODE}
                className="nav-link small text-truncate text-white"
                onClick={hideMobileNavigation}>
            <i className="fa fa-qrcode"/>&nbsp;{i18n.t('navigation.qr')}
          </Link>
        </li>}

        {isAuthenticated && <li className="nav-item">
          <Link to={Pages.PROFILE}
                className="nav-link small text-truncate text-white"
                onClick={hideMobileNavigation}>{i18n.t('navigation.profile')}</Link>
        </li>}

      </ul>
      <ul className="navbar-nav ml-auto text-center">

        {!isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
          <Link className="btn btn-outline-light btn-sm"
                onClick={hideMobileNavigation}
                to={Pages.LOGIN}>{i18n.t('navigation.login')}</Link>
        </li>}

        {!isAuthenticated && <li className="nav-ite mx-1 mb-1 mb-lg-0">
          <Link className="btn btn-light btn-sm"
                onClick={hideMobileNavigation}
                to={Pages.REGISTER}>{i18n.t('navigation.register')}</Link>
        </li>}

        {isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
          <button className="btn btn-outline-light btn-sm"
                  onClick={logout}>{i18n.t('navigation.logout')}</button>
        </li>}

      </ul>
    </div>
  </nav>
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  Nav: store => store.Nav,
})

export default connect(selectors)(Navigation)
