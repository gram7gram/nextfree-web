import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import QRScanner from '../screens/QRScanner/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  QRScanner,
  PasswordReset,
  PasswordSet,
});

export default createRootReducer