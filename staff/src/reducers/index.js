import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Nav from './Nav';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import ProfileSecurity from '../screens/ProfileSecurity/reducers';
import QRScanner from '../screens/QRScanner/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';
import Invitation from '../screens/Invitation/reducers';
import Activation from '../screens/Activation/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Nav,
  Login,
  Profile,
  ProfileSecurity,
  QRScanner,
  PasswordReset,
  PasswordSet,
  Invitation,
  Activation,
});

export default createRootReducer