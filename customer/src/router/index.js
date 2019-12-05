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

import ErrorBoundary from "../components/ErrorBoundary";
import Authentication from "../hoc/Authentication";

export function createRouter() {

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Route exact path={Pages.REGISTER} component={Register}/>

          <Route path={Pages.ACTIVATION} component={Activation}/>

          <Route exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>
          <Route path={Pages.PASSWORD_SET} component={PasswordSet}/>

          <Authentication>
              <Route exact path={Pages.QR_CODE} component={QR}/>

              <Route exact path={Pages.PROFILE} component={Profile}/>
              <Route exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

              <Redirect path="*" to={Pages.HOME}/>

          </Authentication>
        </Switch>
      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </>
}