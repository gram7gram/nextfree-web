import {combineReducers} from 'redux'
import * as Action from '../actions'

const items = (prev = [], action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
      return action.payload.items
    default:
      return prev
  }
}

const page = (prev = 1, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
      return action.payload.page
    default:
      return prev
  }
}

const limit = (prev = 16, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
      return action.payload.limit
    default:
      return prev
  }
}

const total = (prev = 0, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
      return action.payload.total
    default:
      return prev
  }
}

const filters = (prev = {}, action) => {
  return prev
}

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Action.FETCH_FAILURE:
    case Action.FETCH_SUCCESS:
      return false
    case Action.FETCH_BEFORE:
      return true
    default:
      return prev
  }
}

export default combineReducers({
  items,
  isLoading,
  page,
  limit,
  total,
  filters,
})

