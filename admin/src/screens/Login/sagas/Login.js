import {all, put, select, takeLatest} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import Cookie from 'js-cookie'
import * as Actions from '../actions'
import cid from '../../../utils/cid'

function* saveTokenAndRedirect({payload}) {

  Cookie.set('token', payload.token)

  const pathname = yield select(store => store.router.location.pathname)

  yield put(replace(pathname, {auth: true, key: cid()}))
}

function* removeToken() {

  Cookie.remove('token')

  const pathname = yield select(store => store.router.location.pathname)

  yield put(replace(pathname, {auth: false}))
}

export default function* sagas() {
  yield all([

    takeLatest([Actions.LOGIN_SUCCESS, Actions.LOGIN_CHECK_SUCCESS], saveTokenAndRedirect),

    takeLatest([
      Actions.LOGOUT,
      Actions.LOGIN_CHECK_FAILURE,
    ], removeToken)
  ])
}
