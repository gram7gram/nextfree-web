import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import Nav from './Nav';
import App from '../screens/App/reducers/App';
import Conditions from '../screens/App/reducers/Conditions';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import ProfileSecurity from '../screens/ProfileSecurity/reducers';
import Staff from '../screens/Staff/reducers';
import StaffEdit from '../screens/StaffEdit/reducers';
import StaffInvite from '../screens/StaffInvite/reducers';
import Register from '../screens/Register/reducers';
import Store from '../screens/Store/reducers';
import StoreEdit from '../screens/StoreEdit/reducers';
import CompanyEdit from '../screens/CompanyEdit/reducers';
import CompanyWebsite from '../screens/CompanyWebsite/reducers';
import QRScanner from '../screens/QRScanner/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';
import Activation from '../screens/Activation/reducers';
import Purchases from '../screens/Purchases/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Conditions,
  Nav,
  Login,
  Profile,
  ProfileSecurity,
  Staff,
  StaffEdit,
  Register,
  CompanyEdit,
  CompanyWebsite,
  Store,
  StoreEdit,
  StaffInvite,
  QRScanner,
  PasswordSet,
  PasswordReset,
  Activation,
  Purchases,
});

export default createRootReducer