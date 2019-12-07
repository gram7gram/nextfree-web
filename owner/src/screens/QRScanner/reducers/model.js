import {combineReducers} from 'redux'
import * as Action from '../actions'
import * as StoreAction from '../../Store/actions'

const userId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_USER_SUCCESS:
      return action.payload._id
    case Action.MODEL_CHANGED:
      if (action.payload.userId !== undefined) {
        return action.payload.userId
      }
      return prev
    default:
      return prev
  }
}

const user = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_USER_SUCCESS:
      return action.payload
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
    case StoreAction.FETCH_SUCCESS:
      if (!prev && action.payload.items) {
        if (action.payload.items.length > 0) {
          return action.payload.items[0]._id
        }
      }
      return prev
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
  user,
  userId,
  storeId,
  companyId,
})