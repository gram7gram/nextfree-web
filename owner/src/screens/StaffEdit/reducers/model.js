import {combineReducers} from 'redux'
import * as Action from '../actions'
import * as StoreAction from '../../Store/actions'
import user from './user'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
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
    case Action.FETCH_SUCCESS:
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

const password1 = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['password1'] !== undefined) {
        return action.payload['password1']
      }
      return prev
    default:
      return prev
  }
}

const password2 = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['password2'] !== undefined) {
        return action.payload['password2']
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
    case StoreAction.FETCH_SUCCESS:
      if (action.payload.items) {
        if (action.payload.items.length === 0) {
          return action.payload.items[0]._id
        }
      }
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
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
    case Action.FETCH_SUCCESS:
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

const isEnabled = (prev = false, action) => {
  switch (action.type) {
    case Action.RESET:
      return false
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['isEnabled'] !== undefined) {
        return action.flatten['isEnabled']
      }
      return false
    case Action.MODEL_CHANGED:
      if (action.payload['isEnabled'] !== undefined) {
        return action.payload['isEnabled']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  isEnabled,
  user,
  position,
  companyId,
  storeId,
  password1,
  password2,
})