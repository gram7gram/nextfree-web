import {all, takeLatest, put, select} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import * as Actions from '../actions'
import * as Pages from '../../../router/Pages'

function* saveTokenAndRedirect({payload}) {

  localStorage.setItem('admin-token', payload.token)

  if (window.location.origin !== payload.domain) {
    window.location = payload.domain
  } else {
    yield put(replace(Pages.HOME))
  }
}

function* saveTokenAndReload({payload}) {

  localStorage.setItem('admin-token', payload.token)

  if (window.location.origin !== payload.domain) {
    window.location = payload.domain
  } else {
    const pathname = yield select(store => store.router.location.pathname)

    yield put(replace(pathname))
  }
}

function* removeToken() {

  localStorage.removeItem('admin-token')

  yield put(replace(Pages.LOGIN))
}

export default function* sagas() {
  yield all([

    takeLatest(Actions.LOGIN_SUCCESS, saveTokenAndRedirect),

    takeLatest(Actions.LOGIN_CHECK_SUCCESS, saveTokenAndReload),

    takeLatest([
      Actions.LOGOUT,
      Actions.LOGIN_CHECK_FAILURE,
    ], removeToken)
  ])
}
