import {combineReducers} from 'redux'
import * as Action from '../actions'

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      if (action.payload.email !== undefined) {
        return action.payload.email
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.email !== undefined) {
        return action.payload.email
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  email,
})