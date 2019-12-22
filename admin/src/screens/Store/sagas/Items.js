import {all, put, select, takeEvery} from 'redux-saga/effects'
import {FILTER_CHANGED} from '../actions'
import FetchAction from '../actions/Fetch'

function* fetch({payload}) {
  const state = yield select(store => store.Store)

  const page = payload.page || state.page
  const limit = payload.limit || state.limit
  const filter = {search: payload.search !== undefined ? payload.search : state.search}

  yield put(FetchAction(filter, page, limit))
}

export default function* sagas() {
  yield all([
    takeEvery(FILTER_CHANGED, fetch)
  ])
}
