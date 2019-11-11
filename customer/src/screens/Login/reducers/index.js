import {combineReducers} from 'redux'
import * as Action from '../actions'

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.LOGIN_CREDENTIALS_CHANGED:
      if (action.payload.email !== undefined) {
        return action.payload.email
      }

      return prev
    default:
      return prev
  }
}

const password = (prev = null, action) => {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
    case Action.LOGIN_CHECK_SUCCESS:
      return null
    case Action.LOGIN_CREDENTIALS_CHANGED:
      if (action.payload.password !== undefined) {
        return action.payload.password
      }

      return prev
    default:
      return prev
  }
}

const errors = (prev = [], action) => {
  switch (action.type) {
    case Action.LOGIN_BEFORE:
    case Action.LOGIN_SUCCESS:
    case Action.LOGIN_VALIDATE_SUCCESS:
      return []
    case Action.LOGIN_VALIDATE_FAILURE:
      return action.payload.errors
    case Action.LOGIN_FAILURE:
      const data = action.payload.data
      if (data !== undefined && data.message !== undefined) {
        return [
          action.payload.data.message
        ]
      }

      return []
    default:
      return prev
  }
}

const isValid = (prev = false, action) => {
  switch (action.type) {
    case Action.LOGIN_VALIDATE_FAILURE:
    case Action.LOGIN_SUCCESS:
      return false
    case Action.LOGIN_VALIDATE_SUCCESS:
      return true
    default:
      return prev
  }
}

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.LOGIN_BEFORE:
      return true
    case Action.LOGIN_SUCCESS:
    case Action.LOGIN_FAILURE:
      return false
    default:
      return prev
  }
}

export default combineReducers({
  email,
  password,
  errors,
  isValid,
  isLoading,
})
