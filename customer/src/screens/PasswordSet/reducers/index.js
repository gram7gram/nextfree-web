import {combineReducers} from 'redux'
import * as Action from '../actions'
import model from './model'

const serverErrors = (prev = [], action) => {
  switch (action.type) {
    case Action.SAVE_FAILURE:
      if (action.payload.data && action.payload.data.message !== undefined) {
        return [
          action.payload.data.message
        ]
      }
      return []
    case Action.SAVE_SUCCESS:
    case Action.SAVE_BEFORE:
      return []
    default:
      return prev
  }
}

const isTokenValid = (prev = true, action) => {
  switch (action.type) {
    case Action.FETCH_FAILURE:
      return false
    case Action.FETCH_SUCCESS:
      return true
    default:
      return prev
  }
}

const isValid = (prev = false, action) => {
  switch (action.type) {
    case Action.VALIDATE_SUCCESS:
      return true
    case Action.VALIDATE_FAILURE:
    case Action.SAVE_FAILURE:
    case Action.SAVE_SUCCESS:
      return false
    default:
      return prev
  }
}

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.SAVE_FAILURE:
      return false
    case Action.SAVE_BEFORE:
      return true
    default:
      return prev
  }
}

const initialValidator = {
  count: 0,
  messages: [],
  errors: {}
}
const validator = (prev = initialValidator, action) => {
  switch (action.type) {
    case Action.VALIDATE_SUCCESS:
      return initialValidator
    case Action.VALIDATE_FAILURE:
      return action.payload
    default:
      return prev
  }
}

const changes = (prev = {}, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return {}
    case Action.MODEL_CHANGED:

      const changes = {...prev}

      Object.keys(action.payload).forEach(key => {
        changes[key] = true
      })

      return changes
    default:
      return prev
  }
}

export default combineReducers({
  isTokenValid,
  isValid,
  isLoading,
  validator,
  model,
  changes,
  serverErrors,
})

