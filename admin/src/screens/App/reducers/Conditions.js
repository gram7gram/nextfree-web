import {combineReducers} from 'redux';
import * as Actions from "../actions";

const items = (prev = [], action) => {
  switch (action.type) {
    case Actions.FETCH_BONUS_CONDITIONS_SUCCESS:
      return action.payload.items
    default:
      return prev
  }
}

export default combineReducers({
  items,
});
