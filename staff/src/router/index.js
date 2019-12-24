import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {isIPhone} from "../utils/ios";

import * as Pages from './Pages';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';

import PasswordSet from '../screens/PasswordSet/components';
import PasswordReset from '../screens/PasswordReset/components';
import Invitation from '../screens/Invitation/components';
import Activation from '../screens/Activation/components';

import ErrorBoundary from "../components/ErrorBoundary";
import Authentication from "../hoc/Authentication";

import QRScanner from '../screens/QRScanner/components';
import QRScannerById from '../screens/QRScanner/components/ById';

export function createRouter() {

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Route path={Pages.PASSWORD_SET} component={PasswordSet}/>
          <Route exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>

          <Route path={Pages.INVITATION} component={Invitation}/>
          <Route path={Pages.ACTIVATION} component={Activation}/>

          <Authentication>
            <Route exact path={Pages.HOME} component={Home}/>
            <Route exact path={Pages.QR_CODE} component={QR}/>

            {!isIPhone() && <Route exact path={Pages.QR_SCAN} component={QRScanner}/>}
            <Route exact path={Pages.QR_SCAN_BY_ID} component={QRScannerById}/>

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