import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Nav from './Nav';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import ProfileSecurity from '../screens/ProfileSecurity/reducers';
import Register from '../screens/Register/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';
import Activation from '../screens/Activation/reducers';
import Purchases from '../screens/Purchases/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Nav,
  Login,
  Profile,
  ProfileSecurity,
  Register,
  PasswordReset,
  PasswordSet,
  Activation,
  Purchases,
});

export default createRootReducer