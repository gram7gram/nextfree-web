import {combineReducers} from 'redux'
import * as Action from '../actions'

const isSuccess = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      return true
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
  isSuccess,
  isLoading,
})

