import {combineReducers} from 'redux'
import * as Action from '../actions'
import model from './model'

const serverErrors = (prev = [], action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_FAILURE:
      if (action.payload.data && action.payload.data.message !== undefined) {
        return [
          action.payload.data.message
        ]
      }
      return []
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.SAVE_WEBSITE_BEFORE:
      return []
    default:
      return prev
  }
}

const raw = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      return action.flatten
    default:
      return prev
  }
}

const isValid = (prev = false, action) => {
  switch (action.type) {
    case Action.VALIDATE_WEBSITE_SUCCESS:
      return true
    case Action.RESET:
    case Action.VALIDATE_WEBSITE_FAILURE:
    case Action.SAVE_WEBSITE_FAILURE:
      return false
    default:
      return prev
  }
}

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.FETCH_WEBSITE_FAILURE:
    case Action.FETCH_WEBSITE_SUCCESS:
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.SAVE_WEBSITE_FAILURE:
      return false
    case Action.FETCH_WEBSITE_BEFORE:
    case Action.SAVE_WEBSITE_BEFORE:
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
    case Action.RESET:
    case Action.FETCH_WEBSITE_BEFORE:
    case Action.FETCH_WEBSITE_SUCCESS:
    case Action.VALIDATE_WEBSITE_SUCCESS:
      return initialValidator
    case Action.VALIDATE_WEBSITE_FAILURE:
      return action.payload
    default:
      return prev
  }
}

const changes = (prev = {}, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.FETCH_WEBSITE_BEFORE:
    case Action.FETCH_WEBSITE_SUCCESS:
      return {}
    case Action.WEBSITE_CHANGED:

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
  isValid,
  isLoading,
  validator,
  model,
  raw,
  changes,
  serverErrors,
})

