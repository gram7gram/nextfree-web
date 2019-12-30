import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {isIPhone} from "../utils/ios";

import * as Pages from './Pages';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Register from '../screens/Register/components';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';

import Staff from '../screens/Staff/components';
import StaffEdit from '../screens/StaffEdit/components';
import StaffInvite from '../screens/StaffInvite/components';

import CompanyEdit from '../screens/CompanyEdit/components';

import Store from '../screens/Store/components';
import StoreEdit from '../screens/StoreEdit/components';

import PasswordReset from '../screens/PasswordReset/components';
import PasswordSet from '../screens/PasswordSet/components';
import Activation from '../screens/Activation/components';

import ErrorBoundary from "../components/ErrorBoundary";
import Authentication from "../hoc/Authentication";
import FirstLogin from "../hoc/FirstLogin";
import Loading from "../hoc/Loading";

import QRScanner from '../screens/QRScanner/components';
import QRScannerById from '../screens/QRScanner/components/ById';

export function createRouter() {

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Loading>

            <Route exact path={Pages.REGISTER} component={Register}/>

            <Route path={Pages.ACTIVATION} component={Activation}/>

            <Route path={Pages.PASSWORD_SET} component={PasswordSet}/>
            <Route exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>

            <Authentication>
              <FirstLogin>
                <Route exact path={Pages.HOME} component={Home}/>
                <Route exact path={Pages.QR_CODE} component={QR}/>

                {!isIPhone() && <Route exact path={Pages.QR_SCAN} component={QRScanner}/>}
                <Route exact path={Pages.QR_SCAN_BY_ID} component={QRScannerById}/>

                <Route exact path={Pages.PROFILE} component={Profile}/>
                <Route exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

                <Route exact path={Pages.MY_COMPANY} component={CompanyEdit}/>

                <Route exact path={Pages.STORES} component={Store}/>
                <Route exact path={Pages.STORE_NEW} component={StoreEdit}/>
                <Route path={Pages.STORE_EDIT} component={StoreEdit}/>

                <Route exact path={Pages.STAFF} component={Staff}/>
                <Route exact path={Pages.STAFF_INVITE} component={StaffInvite}/>
                <Route path={Pages.STAFF_EDIT} component={StaffEdit}/>

                <Redirect path="*" to={Pages.HOME}/>
              </FirstLogin>
            </Authentication>
          </Loading>
        </Switch>

      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </>
}