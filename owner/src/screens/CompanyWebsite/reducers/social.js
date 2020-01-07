import {combineReducers} from 'redux'
import * as Action from '../actions'

const email = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['social.email'] !== undefined) {
        return action.flatten['social.email']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['social.email'] !== undefined) {
        return action.payload['social.email']
      }
      return prev
    default:
      return prev
  }
}

const website = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['social.website'] !== undefined) {
        return action.flatten['social.website']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['social.website'] !== undefined) {
        return action.payload['social.website']
      }
      return prev
    default:
      return prev
  }
}

const phone = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['social.phone'] !== undefined) {
        return action.flatten['social.phone']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['social.phone'] !== undefined) {
        return action.payload['social.phone']
      }
      return prev
    default:
      return prev
  }
}

const facebook = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['social.facebook'] !== undefined) {
        return action.flatten['social.facebook']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['social.facebook'] !== undefined) {
        return action.payload['social.facebook']
      }
      return prev
    default:
      return prev
  }
}

const instagram = (prev = null, action) => {
  switch (action.type) {
    case Action.SAVE_WEBSITE_SUCCESS:
    case Action.FETCH_WEBSITE_SUCCESS:
      if (action.flatten['social.instagram'] !== undefined) {
        return action.flatten['social.instagram']
      }
      return null
    case Action.WEBSITE_CHANGED:
      if (action.payload['social.instagram'] !== undefined) {
        return action.payload['social.instagram']
      }
      return prev
    default:
      return prev
  }
}

export default combineReducers({
  email,
  website,
  phone,
  instagram,
  facebook,
})