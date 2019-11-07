import {combineReducers} from 'redux'
import * as Action from '../actions'

const name = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_SUCCESS:
      if (action.payload['company.name'] !== undefined) {
        return action.payload['company.name']
      }
      return null
    case Action.MODEL_CHANGED:
      if (action.payload['company.name'] !== undefined) {
        return action.payload['company.name']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  name,
})