import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.flatten['user._id'] !== undefined) {
        return action.flatten['user._id']
      }
      return null
    default:
      return prev
  }
}

const isAdmin = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.flatten['user.isAdmin'] !== undefined) {
        return action.flatten['user.isAdmin']
      }
      return null
    default:
      return prev
  }
}

const displayId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.flatten['user.displayId'] !== undefined) {
        return action.flatten['user.displayId']
      }
      return null
    default:
      return prev
  }
}

const avatar = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.flatten['user.avatar'] !== undefined) {
        return action.flatten['user.avatar']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.avatar'] !== undefined) {
        return action.payload['user.avatar']
      }
      return prev
    default:
      return prev
  }
}

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['user.email'] !== undefined) {
        return action.flatten['user.email']
      }
      return null
    default:
      return prev
  }
}

const firstName = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['user.firstName'] !== undefined) {
        return action.flatten['user.firstName']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.firstName'] !== undefined) {
        return action.payload['user.firstName']
      }
      return prev
    default:
      return prev
  }
}

const lastName = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['user.lastName'] !== undefined) {
        return action.flatten['user.lastName']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.lastName'] !== undefined) {
        return action.payload['user.lastName']
      }
      return prev
    default:
      return prev
  }
}

const birthday = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['user.birthday'] !== undefined) {
        return action.flatten['user.birthday']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.birthday'] !== undefined) {
        return action.payload['user.birthday']
      }
      return prev
    default:
      return prev
  }
}

const phone = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['user.phone'] !== undefined) {
        return action.flatten['user.phone']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['user.phone'] !== undefined) {
        return action.payload['user.phone']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  displayId,
  avatar,
  isAdmin,
  email,
  firstName,
  lastName,
  phone,
  birthday,
})