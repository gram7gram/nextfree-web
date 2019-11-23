import {combineReducers} from 'redux';
import * as LoginActions from "../screens/Login/actions";

const isMobileMenuVisible = (prev = true, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return false
    case LoginActions.TOGGLE_MENU:
      return !!action.payload
    default:
      return prev
  }
}

export default combineReducers({
  isMobileMenuVisible,
});
