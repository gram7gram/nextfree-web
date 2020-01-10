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
import CompanyWebsite from '../screens/CompanyWebsite/components';

import Store from '../screens/Store/components';
import StoreEdit from '../screens/StoreEdit/components';

import PasswordReset from '../screens/PasswordReset/components';
import PasswordSet from '../screens/PasswordSet/components';
import Activation from '../screens/Activation/components';

import ErrorBoundary from "../components/ErrorBoundary";
import FirstLogin from "../hoc/FirstLogin";
import Loading from "../hoc/Loading";

import QRScanner from '../screens/QRScanner/components';
import QRScannerById from '../screens/QRScanner/components/ById';
import Login from "../screens/Login/components";

export function createRouter(store) {

  const PrivateRoute = ({component: Component, ...rest}) => {

    return <Route {...rest} render={(props) => {

      const state = store.getState()

      if (state.App.isLoadingVisible) {
        return null
      }

      if (state.App.isAuthenticated === true) {
        return <FirstLogin>
          <Component {...props} />
        </FirstLogin>
      }

      return <Redirect to={Pages.LOGIN}/>
    }}/>
  }

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Loading>

            <Route exact path={Pages.REGISTER} component={Register}/>
            <Route exact path={Pages.LOGIN} component={Login}/>

            <Route path={Pages.ACTIVATION} component={Activation}/>

            <Route path={Pages.PASSWORD_SET} component={PasswordSet}/>
            <Route exact path={Pages.PASSWORD_RESET} component={PasswordReset}/>

            <PrivateRoute exact path={Pages.HOME} component={Home}/>
            <PrivateRoute exact path={Pages.QR_CODE} component={QR}/>

            {!isIPhone() && <PrivateRoute exact path={Pages.QR_SCAN} component={QRScanner}/>}
            <PrivateRoute exact path={Pages.QR_SCAN_BY_ID} component={QRScannerById}/>

            <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>
            <PrivateRoute exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

            <PrivateRoute exact path={Pages.MY_COMPANY} component={CompanyEdit}/>
            <PrivateRoute exact path={Pages.MY_COMPANY_PAGE} component={CompanyWebsite}/>

            <PrivateRoute exact path={Pages.STORES} component={Store}/>
            <PrivateRoute exact path={Pages.STORE_NEW} component={StoreEdit}/>
            <PrivateRoute path={Pages.STORE_EDIT} component={StoreEdit}/>

            <PrivateRoute exact path={Pages.STAFF} component={Staff}/>
            <PrivateRoute exact path={Pages.STAFF_INVITE} component={StaffInvite}/>
            <PrivateRoute path={Pages.STAFF_EDIT} component={StaffEdit}/>
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