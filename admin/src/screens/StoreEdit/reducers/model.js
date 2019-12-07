import {combineReducers} from 'redux'
import * as Action from '../actions'

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

const city = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['city'] !== undefined) {
        return action.flatten['city']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['city'] !== undefined) {
        return action.payload['city']
      }
      return prev
    default:
      return prev
  }
}

const address = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['address'] !== undefined) {
        return action.flatten['address']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['address'] !== undefined) {
        return action.payload['address']
      }
      return prev
    default:
      return prev
  }
}

const lng = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['lng'] !== undefined) {
        return action.flatten['lng']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['lng'] !== undefined) {
        return action.payload['lng']
      }
      return prev
    default:
      return prev
  }
}

const lat = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.SAVE_SUCCESS:
    case Action.FETCH_SUCCESS:
      if (action.flatten['lat'] !== undefined) {
        return action.flatten['lat']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['lat'] !== undefined) {
        return action.payload['lat']
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
  companyId,
  lng,
  lat,
  city,
  address,
})