import {combineReducers} from 'redux';
import * as LoginActions from "../screens/Login/actions";

const isMinimized = (prev = true, action) => {
  switch (action.type) {
    case LoginActions.TOGGLE_MENU_MINIMIZE:
      return !!action.payload
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
    case "@@router/LOCATION_CHANGE":
      return true
    default:
      return prev
  }
}

export default combineReducers({
  isMinimized,
});
