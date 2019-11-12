import {combineReducers} from 'redux'
import * as Action from '../actions'
import model from './model'

const serverErrors = (prev = [], action) => {
  switch (action.type) {
    case Action.SAVE_FAILURE:
      if (action.payload.data.message !== undefined) {
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

const isBonus = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return action.payload.isBonus
    case Action.RESET:
    case Action.MODEL_CHANGED:
    case Action.SAVE_BEFORE:
      return false
    default:
      return prev
  }
}

export default combineReducers({
  model,
  isBonus,
  isSuccess,
  isLoading,
  serverErrors,
})

