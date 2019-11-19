import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import Register from '../screens/Register/reducers';
import PasswordReset from '../screens/PasswordReset/reducers';
import PasswordSet from '../screens/PasswordSet/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  Register,
  PasswordReset,
  PasswordSet,
});

export default createRootReducer