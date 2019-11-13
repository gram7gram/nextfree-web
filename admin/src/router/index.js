import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import Login from '../screens/Login/components';

import Home from '../screens/Home/components';
import QR from '../screens/QR/components';
import QRScanner from '../screens/QRScanner/components';
import Profile from '../screens/Profile/components';
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

export function createRouter(store) {

  const PrivateRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) return <Loading/>

    if (appState.isAuthenticated === true) {
      return <Route {...rest} render={(props) => <Component {...props}/>}/>
    }

    return <Redirect to={Pages.LOGIN}/>
  }

  const PublicRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) return <Loading/>

    if (appState.isAuthenticated === false) {
      return <Route {...rest} render={(props) => <Component {...props}/>}/>
    }

    return <Redirect to={Pages.HOME}/>
  }

  return <div>

    <Navigation/>

    <main id="main-content">

      <ErrorBoundary>

        <Switch>
          <PublicRoute exact path={Pages.LOGIN} component={Login}/>

          <PrivateRoute exact path={Pages.HOME} component={Home}/>
          <PrivateRoute exact path={Pages.QR_CODE} component={QR}/>
          <PrivateRoute exact path={Pages.QR_SCAN} component={QRScanner}/>

          <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>

          <PrivateRoute exact path={Pages.COMPANIES} component={Company}/>
          <PrivateRoute exact path={Pages.COMPANY_NEW} component={CompanyEdit}/>
          <PrivateRoute path={Pages.COMPANY_EDIT} component={CompanyEdit}/>

          <PrivateRoute exact path={Pages.STORES} component={Store}/>
          <PrivateRoute exact path={Pages.STORE_NEW} component={StoreEdit}/>
          <PrivateRoute path={Pages.STORE_EDIT} component={StoreEdit}/>

          <PrivateRoute exact path={Pages.STAFF} component={Staff}/>
          <PrivateRoute exact path={Pages.STAFF_NEW} component={StaffEdit}/>
          <PrivateRoute path={Pages.STAFF_EDIT} component={StaffEdit}/>

          <PrivateRoute exact path={Pages.OWNERS} component={Owner}/>
          <PrivateRoute exact path={Pages.OWNER_NEW} component={OwnerEdit}/>
          <PrivateRoute path={Pages.OWNER_EDIT} component={OwnerEdit}/>

          <PrivateRoute exact path={Pages.CUSTOMERS} component={Customer}/>
          <PrivateRoute exact path={Pages.CUSTOMER_NEW} component={CustomerEdit}/>
          <PrivateRoute path={Pages.CUSTOMER_EDIT} component={CustomerEdit}/>

          <Redirect path="*" to={Pages.HOME}/>

        </Switch>
      </ErrorBoundary>

    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </div>
}