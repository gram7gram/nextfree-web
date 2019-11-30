import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Nav from './Nav';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import ProfileSecurity from '../screens/ProfileSecurity/reducers';
import Staff from '../screens/Staff/reducers';
import StaffEdit from '../screens/StaffEdit/reducers';
import Store from '../screens/Store/reducers';
import StoreEdit from '../screens/StoreEdit/reducers';
import Company from '../screens/Company/reducers';
import CompanyEdit from '../screens/CompanyEdit/reducers';
import QRScanner from '../screens/QRScanner/reducers';
import Customer from '../screens/Customer/reducers';
import CustomerEdit from '../screens/CustomerEdit/reducers';
import Owner from '../screens/Owner/reducers';
import OwnerEdit from '../screens/OwnerEdit/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Nav,
  Login,
  Profile,
  ProfileSecurity,
  Staff,
  StaffEdit,
  Company,
  CompanyEdit,
  Store,
  StoreEdit,
  QRScanner,
  Customer,
  CustomerEdit,
  Owner,
  OwnerEdit,
});

export default createRootReducer