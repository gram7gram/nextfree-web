import {combineReducers} from 'redux'
import * as Action from '../actions'

const userId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_USER_SUCCESS:
      return action.payload.user._id
    case Action.MODEL_CHANGED:
      if (action.payload.userId !== undefined) {
        return action.payload.userId
      }
      return prev
    default:
      return prev
  }
}

const displayId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_USER_SUCCESS:
      return action.payload.user.displayId
    case Action.MODEL_CHANGED:
      if (action.payload.displayId !== undefined) {
        return action.payload.displayId
      }
      return prev
    default:
      return prev
  }
}

const match = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_USER_SUCCESS:
      return action.payload
    case Action.FETCH_USER_FAILURE:
    case Action.RESET:
      return null
    default:
      return prev
  }
}

const storeId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.storeId !== undefined) {
        return action.payload.storeId
      }
      return prev
    default:
      return prev
  }
}

const companyId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.companyId !== undefined) {
        return action.payload.companyId
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  match,
  displayId,
  userId,
  storeId,
  companyId,
})