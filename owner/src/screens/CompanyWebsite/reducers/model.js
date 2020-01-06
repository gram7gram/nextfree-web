import {combineReducers} from 'redux'
import * as Action from '../actions'
import social from './social'
import meta from './meta'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      return action.flatten['_id']
    default:
      return prev
  }
}

const status = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['status'] !== undefined) {
        return action.flatten['status']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['isEnabled'] !== undefined) {
        return action.payload['isEnabled']
      }
      return prev
    default:
      return prev
  }
}

const isEnabled = (prev = false, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['isEnabled'] !== undefined) {
        return action.flatten['isEnabled']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['isEnabled'] !== undefined) {
        return action.payload['isEnabled']
      }
      return prev
    default:
      return prev
  }
}

const title = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['title'] !== undefined) {
        return action.flatten['title']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['title'] !== undefined) {
        return action.payload['title']
      }
      return prev
    default:
      return prev
  }
}

const content = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['content'] !== undefined) {
        return action.flatten['content']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['content'] !== undefined) {
        return action.payload['content']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  id,
  isEnabled,
  status,
  title,
  content,
  meta,
  social,
})