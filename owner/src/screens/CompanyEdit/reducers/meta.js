import {combineReducers} from 'redux'
import * as Action from '../actions'

const title = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['meta.title'] !== undefined) {
        return action.flatten['meta.title']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['meta.title'] !== undefined) {
        return action.payload['meta.title']
      }
      return prev
    default:
      return prev
  }
}

const description = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['meta.description'] !== undefined) {
        return action.flatten['meta.description']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['meta.description'] !== undefined) {
        return action.payload['meta.description']
      }
      return prev
    default:
      return prev
  }
}

const keywords = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['meta.keywords'] !== undefined) {
        return action.flatten['meta.keywords']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['meta.keywords'] !== undefined) {
        return action.payload['meta.keywords']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  description,
  keywords,
  title,
})