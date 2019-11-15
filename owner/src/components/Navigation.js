import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import * as Pages from "../router/Pages";
import {LOGOUT} from "../screens/Login/actions";

class Navigation extends PureComponent {

  state = {
    isNavOpen: false
  }

  hideMobileNavigation = () => {
    this.setState(({
      isNavOpen: false
    }))
  }

  toggleMobileNavigation = () => {
    this.setState(({
      isNavOpen: !this.state.isNavOpen
    }))
  }

  logout = () => {
    this.props.dispatch({
      type: LOGOUT
    })
  }

  render() {

    const {isAuthenticated} = this.props

    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <Link className="navbar-brand py-1" to={Pages.HOME}>
        {i18n.t('navigation.logo')}
        <br/><small className="text-success">{i18n.t('navigation.logo_footer')}</small>
      </Link>

      <button className="navbar-toggler"
              type="button"
              onClick={this.toggleMobileNavigation}>
        <i className="fa fa-bars"/>
      </button>

      <div className={"navbar-collapse collapse" + (this.state.isNavOpen ? " show" : "")}>
        <ul className="navbar-nav mr-auto text-center">

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.QR_SCAN}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>
              <i className="fa fa-camera"/>&nbsp;{i18n.t('navigation.qr_scanner')}
            </Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.QR_CODE}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>
              <i className="fa fa-qrcode"/>&nbsp;{i18n.t('navigation.qr')}
            </Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.PROFILE}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>{i18n.t('navigation.profile')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.COMPANIES}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>{i18n.t('navigation.companies')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.STORES}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>{i18n.t('navigation.stores')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.STAFF}
                  className="nav-link text-white"
                  onClick={this.hideMobileNavigation}>{i18n.t('navigation.staff')}</Link>
          </li>}

        </ul>
        <ul className="navbar-nav ml-auto text-center">

          {!isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
            <Link className="btn btn-outline-success"
                  onClick={this.hideMobileNavigation}
                  to={Pages.LOGIN}>{i18n.t('navigation.login')}</Link>
          </li>}

          {!isAuthenticated && <li className="nav-ite mx-1 mb-1 mb-lg-0">
            <Link className="btn btn-success"
                  onClick={this.hideMobileNavigation}
                  to={Pages.REGISTER}>{i18n.t('navigation.register')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item mx-1 mb-1 mb-lg-0">
            <button className="btn btn-outline-success"
                    onClick={this.logout}>{i18n.t('navigation.logout')}</button>
          </li>}

        </ul>
      </div>
    </nav>
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
})

export default withRouter(
  connect(selectors)(Navigation)
);
