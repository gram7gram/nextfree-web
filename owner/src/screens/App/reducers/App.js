import {combineReducers} from 'redux';
import * as LoginActions from "../../Login/actions";
import * as FirstLogin from "../../FirstLogin/actions";
import * as StoreEdit from "../../StoreEdit/actions";
import * as CompanyEdit from "../../CompanyEdit/actions";

const isLoadingVisible = (prev = true, action) => {
  switch (action.type) {
    case LoginActions.LOGIN_CHECK_BEFORE:
      return true
    case LoginActions.LOGIN_CHECK_SUCCESS:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return false
    default:
      return prev
  }
}

const isAuthenticated = (prev = false, action) => {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      return true
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_BEFORE:
    case LoginActions.LOGIN_CHECK_BEFORE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return false
    default:
      return prev
  }
}

const token = (prev = null, action) => {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      if (action.payload.token !== undefined) {
        return action.payload.token
      }

      return null
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return null
    default:
      return prev
  }
}

const owner = (prev = null, action) => {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      if (action.payload.user !== undefined) {
        return action.payload.user
      }
      return null
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return null
    default:
      return prev
  }
}

const defaultCompany = (prev = null, action) => {
  switch (action.type) {
    case CompanyEdit.SAVE_SUCCESS:
      if (!prev) {
        return action.payload
      }

      return prev
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      if (action.payload.company !== undefined) {
        return action.payload.company
      }
      return null
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return null
    default:
      return prev
  }
}

const defaultStore = (prev = null, action) => {
  switch (action.type) {
    case StoreEdit.SAVE_SUCCESS:
      if (!prev) {
        return action.payload
      }

      return prev
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      if (action.payload.store !== undefined) {
        return action.payload.store
      }
      return null
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return null
    default:
      return prev
  }
}

const isFirstLoginGreetingViewed = (prev = null, action) => {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
    case LoginActions.LOGIN_CHECK_SUCCESS:
      if (action.payload.user.isFirstLoginGreetingViewed !== undefined) {
        return action.payload.user.isFirstLoginGreetingViewed
      }
      return false
    case FirstLogin.SAVE_SUCCESS:
      if (action.payload.isFirstLoginGreetingViewed !== undefined) {
        return action.payload.isFirstLoginGreetingViewed
      }
      return null
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE:
    case LoginActions.LOGIN_CHECK_FAILURE:
      return null
    default:
      return prev
  }
}

const locale = (prev = null) => prev

export default combineReducers({
  isLoadingVisible,
  isAuthenticated,
  token,
  owner,
  defaultCompany,
  defaultStore,
  locale,
  isFirstLoginGreetingViewed,
});
