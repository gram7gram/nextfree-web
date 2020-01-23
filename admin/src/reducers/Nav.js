import {combineReducers} from 'redux';
import * as LoginActions from "../screens/Login/actions";

const isVisible = (prev = true, action) => {
  switch (action.type) {
    case LoginActions.TOGGLE_MENU:
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
  isVisible,
});
