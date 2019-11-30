import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
      if (action.payload._id !== undefined) {
        return action.payload._id
      }
      return null
    default:
      return prev
  }
}

const currentPassword = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.currentPassword !== undefined) {
        return action.payload.currentPassword
      }
      return prev
    default:
      return prev
  }
}

const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
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
    case Action.RESET:
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
  id,
  currentPassword,
  password1,
  password2,
})