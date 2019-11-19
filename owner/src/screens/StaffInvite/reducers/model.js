import {combineReducers} from 'redux'
import * as Action from '../actions'
import user from './user'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
      if (action.flatten['_id'] !== undefined) {
        return action.flatten['_id']
      }
      return null
    default:
      return prev
  }
}

const position = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
      if (action.flatten['position'] !== undefined) {
        return action.flatten['position']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['position'] !== undefined) {
        return action.payload['position']
      }
      return prev
    default:
      return prev
  }
}

const storeId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
      if (action.flatten['storeId'] !== undefined) {
        return action.flatten['storeId']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['storeId'] !== undefined) {
        return action.payload['storeId']
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
    case Action.SAVE_SUCCESS:
      if (action.flatten['companyId'] !== undefined) {
        return action.flatten['companyId']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['companyId'] !== undefined) {
        return action.payload['companyId']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  user,
  position,
  companyId,
  storeId,
})