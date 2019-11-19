import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import Staff from '../screens/Staff/reducers';
import StaffEdit from '../screens/StaffEdit/reducers';
import StaffInvite from '../screens/StaffInvite/reducers';
import Register from '../screens/Register/reducers';
import Store from '../screens/Store/reducers';
import StoreEdit from '../screens/StoreEdit/reducers';
import Company from '../screens/Company/reducers';
import CompanyEdit from '../screens/CompanyEdit/reducers';
import QRScanner from '../screens/QRScanner/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  Staff,
  StaffEdit,
  Register,
  Company,
  CompanyEdit,
  Store,
  StoreEdit,
  StaffInvite,
  QRScanner,
  PasswordSet,
  PasswordReset,
});

export default createRootReducer