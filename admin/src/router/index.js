import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Login from '../screens/Login/components';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import QRScanner from '../screens/QRScanner/components';
import Profile from '../screens/Profile/components';
import ProfileSecurity from '../screens/ProfileSecurity/components';
import Staff from '../screens/Staff/components';
import StaffEdit from '../screens/StaffEdit/components';

import Company from '../screens/Company/components';
import CompanyEdit from '../screens/CompanyEdit/components';

import Store from '../screens/Store/components';
import StoreEdit from '../screens/StoreEdit/components';

import Customer from '../screens/Customer/components';
import CustomerEdit from '../screens/CustomerEdit/components';

import Owner from '../screens/Owner/components';
import OwnerEdit from '../screens/OwnerEdit/components';

import ErrorBoundary from "../components/ErrorBoundary";
import Authentication from "../hoc/Authentication";

export function createRouter() {

  return <>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <Route exact path={Pages.LOGIN} component={Login}/>

        </Switch>

        <Authentication>
          <Switch>
            <Route exact path={Pages.HOME} component={Home}/>
            <Route exact path={Pages.QR_CODE} component={QR}/>
            <Route exact path={Pages.QR_SCAN} component={QRScanner}/>

            <Route exact path={Pages.PROFILE} component={Profile}/>
            <Route exact path={Pages.PROFILE_SECURITY} component={ProfileSecurity}/>

            <Route exact path={Pages.COMPANIES} component={Company}/>
            <Route exact path={Pages.COMPANY_NEW} component={CompanyEdit}/>
            <Route path={Pages.COMPANY_EDIT} component={CompanyEdit}/>

            <Route exact path={Pages.STORES} component={Store}/>
            <Route exact path={Pages.STORE_NEW} component={StoreEdit}/>
            <Route path={Pages.STORE_EDIT} component={StoreEdit}/>

            <Route exact path={Pages.STAFF} component={Staff}/>
            <Route exact path={Pages.STAFF_NEW} component={StaffEdit}/>
            <Route path={Pages.STAFF_EDIT} component={StaffEdit}/>

            <Route exact path={Pages.OWNERS} component={Owner}/>
            <Route exact path={Pages.OWNER_NEW} component={OwnerEdit}/>
            <Route path={Pages.OWNER_EDIT} component={OwnerEdit}/>

            <Route exact path={Pages.CUSTOMERS} component={Customer}/>
            <Route exact path={Pages.CUSTOMER_NEW} component={CustomerEdit}/>
            <Route path={Pages.CUSTOMER_EDIT} component={CustomerEdit}/>

            <Redirect path="*" to={Pages.HOME}/>

          </Switch>
        </Authentication>

      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </>
}