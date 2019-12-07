import {combineReducers} from 'redux'
import * as Action from '../actions'
import model from './model'

const serverErrors = (prev = [], action) => {
  switch (action.type) {
    case Action.FETCH_USER_FAILURE:
    case Action.SAVE_FAILURE:
      if (action.payload.data && action.payload.data.message !== undefined) {
        return [
          action.payload.data.message
        ]
      }
      return []
    case Action.RESET:
    case Action.SAVE_SUCCESS:
    case Action.SAVE_BEFORE:
      return []
    default:
      return prev
  }
}

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.SAVE_SUCCESS:
    case Action.SAVE_FAILURE:
      return false
    case Action.SAVE_BEFORE:
      return true
    default:
      return prev
  }
}

const isSuccess = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return true
    case Action.RESET:
    case Action.MODEL_CHANGED:
    case Action.SAVE_BEFORE:
      return false
    default:
      return prev
  }
}

const isLoadingUser = (prev = false, action) => {
  switch (action.type) {
    case Action.FETCH_USER_BEFORE:
      return true
    case Action.RESET:
    case Action.FETCH_USER_SUCCESS:
    case Action.FETCH_USER_FAILURE:
      return false
    default:
      return prev
  }
}

const purchase = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return action.payload
    case Action.RESET:
    case Action.MODEL_CHANGED:
    case Action.SAVE_BEFORE:
      return null
    default:
      return prev
  }
}

export default combineReducers({
  model,
  purchase,
  isSuccess,
  isLoadingUser,
  isLoading,
  serverErrors,
})

