import {all, put, select, takeLatest} from 'redux-saga/effects'
import {FILTER_CHANGED} from '../actions'
import FetchAction from '../actions/Fetch'

function* fetch({payload}) {
  const state = yield select(store => store.Company)

  const page = payload.page || state.page
  const limit = payload.limit || state.limit
  const filter = {search: payload.search !== undefined ? payload.search : state.search}

  yield put(FetchAction(filter, page, limit))
}

export default function* sagas() {
  yield all([
    takeLatest(FILTER_CHANGED, fetch)
  ])
}
