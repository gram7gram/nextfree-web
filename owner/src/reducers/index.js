import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import Staff from '../screens/Staff/reducers';
import StaffEdit from '../screens/StaffEdit/reducers';
import Register from '../screens/Register/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  Staff,
  StaffEdit,
  Register,
});

export default createRootReducer