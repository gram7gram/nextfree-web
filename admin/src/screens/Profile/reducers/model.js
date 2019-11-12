import {combineReducers} from 'redux'
import * as Action from '../actions'
import user from './user'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.payload._id !== undefined) {
        return action.payload._id
      }
      return null
    default:
      return prev
  }
}

const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
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
    case Action.FETCH_SUCCESS:
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
  user,
  password1,
  password2,
})