import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import * as Pages from "../router/Pages";
import {TOGGLE_MENU} from "../screens/Login/actions";

const Sidebar = ({isAuthenticated, isVisible, match}) => {

  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch({
      type: TOGGLE_MENU,
      payload: !isVisible
    })
  }

  const links = []

  if (isAuthenticated) {
    links.push({
      to: Pages.QR_CODE,
      icon: "fa fa-qrcode",
      text: i18n.t('navigation.qr')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.PROFILE,
      icon: "fa fa-user-circle",
      text: i18n.t('navigation.profile')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.PURCHASES,
      icon: "fa fa-shopping-cart",
      text: i18n.t('navigation.purchases')
    })
  }

  if (isVisible || links.length === 0) return null;

  return <div className="sidebar-container" onClick={toggleMenu}>
    <nav className="sidebar bg-darker">

      <button className="sidebar-control p-3 text-truncate">
        {i18n.t('navigation.menu')}
      </button>

      {links.map(link =>
        <Link key={link.to}
              to={link.to}
              className={"btn-nav p-3 text-truncate "
              + (match.url === link.to ? " active" : "")}
              onClick={toggleMenu}>
          <i className={link.icon}/>
          <span>&nbsp;{link.text}</span>
        </Link>
      )}
    </nav>
  </div>
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  isVisible: store => store.Nav.isVisible,
})

export default withRouter(
  connect(selectors)(Sidebar)
)
