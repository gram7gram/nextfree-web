import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import * as Pages from "../router/Pages";
import {TOGGLE_MENU} from "../screens/Login/actions";
import {isIPhone} from "../utils/ios";

const Sidebar = ({isAuthenticated, isVisible, match}) => {

  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch({
      type: TOGGLE_MENU,
      payload: !isVisible
    })
  }

  const links = []

  if (isAuthenticated && !isIPhone()) {
    links.push({
      to: Pages.QR_SCAN,
      icon: "fa fa-camera",
      text: i18n.t('navigation.qr_scanner')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.QR_SCAN_BY_ID,
      icon: "fa fa-search",
      text: i18n.t('navigation.qr_scanner_by_id')
    })
  }

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

  if (isAuthenticated) {
    links.push({
      to: Pages.COMPANIES,
      icon: "fa fa-cubes",
      text: i18n.t('navigation.companies')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.STORES,
      icon: "fa fa-map-marker-alt",
      text: i18n.t('navigation.stores')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.OWNERS,
      icon: "fa fa-user-secret",
      text: i18n.t('navigation.owners')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.STAFF,
      icon: "fa fa-user-tie",
      text: i18n.t('navigation.staff')
    })
  }

  if (isAuthenticated) {
    links.push({
      to: Pages.CUSTOMERS,
      icon: "fa fa-child",
      text: i18n.t('navigation.customers')
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

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  isVisible: store => store.Nav.isVisible,
})

export default withRouter(
  connect(selectors)(Sidebar)
)
