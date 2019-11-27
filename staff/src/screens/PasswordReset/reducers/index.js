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

export default combineReducers({
  isLoading,
  model,
  serverErrors,
})

