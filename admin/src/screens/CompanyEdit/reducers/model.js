import {combineReducers} from 'redux'
import * as Action from '../actions'

const id = (prev = null, action) => {
  switch (action.type) {
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

const companyId = (prev = null, action) => {
  switch (action.type) {
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

const name = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['name'] !== undefined) {
        return action.flatten['name']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['name'] !== undefined) {
        return action.payload['name']
      }
      return prev
    default:
      return prev
  }
}

const bonusCondition = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['bonusCondition'] !== undefined) {
        return action.flatten['bonusCondition']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['bonusCondition'] !== undefined) {
        return action.payload['bonusCondition']
      }
      return prev
    default:
      return prev
  }
}

const isEnabled = (prev = false, action) => {
  switch (action.type) {
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
  companyId,
  name,
  bonusCondition,
})