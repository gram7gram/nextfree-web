import {combineReducers} from 'redux'
import * as Action from '../actions'

const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.password1 !== undefined) {
        return action.payload.password1
      }
      return prev
    default:
      return prev
  }
}

const password2 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.password2 !== undefined) {
        return action.payload.password2
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  password1,
  password2,
})