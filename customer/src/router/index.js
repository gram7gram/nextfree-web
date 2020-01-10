import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Register from '../screens/Register/components';

import QR from '../screens/QR/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';

import PasswordReset from '../screens/PasswordReset/components';
import PasswordSet from '../screens/PasswordSet/components';
import Activation from '../screens/Activation/components';
import Login from '../screens/Login/components';

import ErrorBoundary from "../components/ErrorBoundary";

export function createRouter(store) {

  const PrivateRoute = ({component: Component, ...rest}) => {

    return <Route {...rest} render={(props) => {

      const state = store.getState()

      if (state.App.isLoadingVisible) {
        return null
      }

      if (state.App.isAuthenticated === true) {
        return <Component {...props} />
      }

      return <Redirect to={Pages.LOGIN}/>
    }}/>
  }

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Route exact path={Pages.REGISTER} component={Register}/>
          <Route exact path={Pages.LOGIN} component={Login}/>

          <Route path={Pages.ACTIVATION} component={Activation}/>

          <Route exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>
          <Route path={Pages.PASSWORD_SET} component={PasswordSet}/>

          <PrivateRoute exact path={Pages.HOME} component={QR}/>
          <PrivateRoute exact path={Pages.QR_CODE} component={QR}/>

          <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>
          <PrivateRoute exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>
        </Switch>
      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </>
}