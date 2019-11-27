import {combineReducers} from 'redux'
import * as Action from '../actions'

const userId = (prev = "5dc9d4c8119c4f03c7f078de", action) => {
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

export default combineReducers({
  userId,
})