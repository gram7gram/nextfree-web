import {combineReducers} from 'redux'
import * as Action from '../actions'
import * as StoreAction from '../../Store/actions'

const userId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.SAVE_SUCCESS:
      return null
    case Action.MODEL_CHANGED:
      if (action.payload.userId !== undefined) {
        return action.payload.userId
      }
      return prev
    default:
      return prev
  }
}

const storeId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
    case Action.SAVE_SUCCESS:
      return null
    case StoreAction.FETCH_SUCCESS:
      if (action.payload.items) {
        if (action.payload.items.length > 0) {
          return action.payload.items[0]._id
        }
      }
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
    case Action.SAVE_SUCCESS:
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
  userId,
  storeId,
  companyId,
})