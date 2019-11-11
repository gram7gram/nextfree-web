import {combineReducers} from 'redux'
import * as Action from '../actions'
import user from './user'

const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['password1'] !== undefined) {
        return action.payload['password1']
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
      if (action.payload['password2'] !== undefined) {
        return action.payload['password2']
      }
      return prev
    default:
      return prev
  }
}

const hasAccepted = (prev = false, action) => {
  switch (action.type) {
    case Action.MODEL_CHANGED:
      if (action.payload['hasAccepted'] !== undefined) {
        return action.payload['hasAccepted']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  user,
  hasAccepted,
  password1,
  password2,
})