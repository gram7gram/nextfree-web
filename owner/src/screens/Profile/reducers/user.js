import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.payload.user !== undefined) {
        if (action.payload.user._id !== undefined) {
          return action.payload.user._id
        }
      }
      return null
    default:
      return prev
  }
}

const isAdmin = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.payload.user !== undefined) {
        if (action.payload.user.isAdmin !== undefined) {
          return action.payload.user.isAdmin
        }
      }
      return null
    default:
      return prev
  }
}

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.user !== undefined) {
        if (action.payload.user.email !== undefined) {
          return action.payload.user.email
        }
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

const firstName = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.user !== undefined) {
        if (action.payload.user.firstName !== undefined) {
          return action.payload.user.firstName
        }
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.firstName !== undefined) {
        return action.payload.firstName
      }
      return prev
    default:
      return prev
  }
}

const lastName = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.payload.user !== undefined) {
        if (action.payload.user.lastName !== undefined) {
          return action.payload.user.lastName
        }
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.lastName !== undefined) {
        return action.payload.lastName
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  isAdmin,
  email,
  firstName,
  lastName,
})