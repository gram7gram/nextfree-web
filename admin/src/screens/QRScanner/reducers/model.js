import {combineReducers} from 'redux'
import * as Action from '../actions'

const userId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_USER_SUCCESS:
      return action.payload.user._id
    case Action.MODEL_CHANGED:
      if (action.payload.userId !== undefined) {
        return action.payload.userId
      }
      return prev
    default:
      return prev
  }
}

const displayId = (prev = null, action) => {
  switch (action.type) {
    case Action.RESET:
      return null
    case Action.FETCH_USER_BEFORE:
      return action.payload.id
    case Action.FETCH_USER_SUCCESS:
      return action.payload.user.displayId
    case Action.MODEL_CHANGED:
      if (action.payload.displayId !== undefined) {
        return action.payload.displayId
      }
      return prev
    default:
      return prev
  }
}

const cell0 = (prev = '', action) => {
  switch (action.type) {
    case Action.RESET:
      return ''
    case Action.MODEL_CHANGED:
      if (action.payload.cell0 !== undefined) {
        return action.payload.cell0
      }
      return prev
    default:
      return prev
  }
}

const cell1 = (prev = '', action) => {
  switch (action.type) {
    case Action.RESET:
      return ''
    case Action.MODEL_CHANGED:
      if (action.payload.cell1 !== undefined) {
        return action.payload.cell1
      }
      return prev
    default:
      return prev
  }
}

const cell2 = (prev = '', action) => {
  switch (action.type) {
    case Action.RESET:
      return ''
    case Action.MODEL_CHANGED:
      if (action.payload.cell2 !== undefined) {
        return action.payload.cell2
      }
      return prev
    default:
      return prev
  }
}

const cell3 = (prev = '', action) => {
  switch (action.type) {
    case Action.RESET:
      return ''
    case Action.MODEL_CHANGED:
      if (action.payload.cell3 !== undefined) {
        return action.payload.cell3
      }
      return prev
    default:
      return prev
  }
}

const cell4 = (prev = '', action) => {
  switch (action.type) {
    case Action.RESET:
      return ''
    case Action.MODEL_CHANGED:
      if (action.payload.cell4 !== undefined) {
        return action.payload.cell4
      }
      return prev
    default:
      return prev
  }
}

const match = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_USER_SUCCESS:
      return action.payload
    case Action.FETCH_USER_FAILURE:
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
      return 'null'
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
  match,
  displayId,
  userId,
  storeId,
  companyId,
  cell0,
  cell1,
  cell2,
  cell3,
  cell4,
})