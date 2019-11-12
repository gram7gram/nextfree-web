import {combineReducers} from 'redux'
import * as Action from '../actions'

const customerId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.customerId !== undefined) {
        return action.payload.customerId
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  customerId,
})