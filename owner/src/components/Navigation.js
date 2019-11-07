import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import * as Pages from "../router/Pages";
import {LOGOUT} from "../screens/Login/actions";

class Navigation extends PureComponent {

  logout = () => {
    this.props.dispatch({
      type: LOGOUT
    })
  }

  render() {

    const {isAuthenticated} = this.props

    return <nav className="navbar navbar-expand navbar-dark bg-primary">

      <Link className="navbar-brand" to={Pages.HOME}>
        {i18n.t('navigation.logo')}
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.PROFILE} className="nav-link">{i18n.t('navigation.profile')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item">
            <Link to={Pages.STAFF} className="nav-link">{i18n.t('navigation.staff')}</Link>
          </li>}

        </ul>
        <ul className="navbar-nav ml-auto">

          {!isAuthenticated && <li className="nav-item mx-1">
            <Link className="btn btn-outline-success"
                  to={Pages.LOGIN}>{i18n.t('navigation.login')}</Link>
          </li>}

          {!isAuthenticated && <li className="nav-ite mx-1">
            <Link className="btn btn-success"
                  to={Pages.REGISTER}>{i18n.t('navigation.register')}</Link>
          </li>}

          {isAuthenticated && <li className="nav-item mx-1">
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
