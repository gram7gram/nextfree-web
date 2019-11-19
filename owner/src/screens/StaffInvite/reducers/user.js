import {combineReducers} from 'redux'
import * as Action from '../actions'

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
      if (action.flatten['user.email'] !== undefined) {
        return action.flatten['user.email']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.email'] !== undefined) {
        return action.payload['user.email']
      }
      return prev
    default:
      return prev
  }
}


export default combineReducers({
  email,
})