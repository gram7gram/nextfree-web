import {combineReducers} from 'redux'
import * as Action from '../actions'

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      if (action.payload['owner.user.email'] !== undefined) {
        return action.payload['owner.user.email']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['owner.user.email'] !== undefined) {
        return action.payload['owner.user.email']
      }
      return prev
    default:
      return prev
  }
}

const firstName = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      if (action.payload['owner.user.firstName'] !== undefined) {
        return action.payload['owner.user.firstName']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['owner.user.firstName'] !== undefined) {
        return action.payload['owner.user.firstName']
      }
      return prev
    default:
      return prev
  }
}

const lastName = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      if (action.payload['owner.user.lastName'] !== undefined) {
        return action.payload['owner.user.lastName']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['owner.user.lastName'] !== undefined) {
        return action.payload['owner.user.lastName']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  email,
  firstName,
  lastName,
})