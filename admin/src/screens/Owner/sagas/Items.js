import {all, put, select, takeEvery} from 'redux-saga/effects'
import {FILTER_CHANGED} from '../actions'
import FetchAction from '../actions/Fetch'

function* fetch({payload}) {
    const state = yield select(store => store.Owner)

    const page = payload.page || state.page
    const limit = payload.limit || state.limit

    yield put(FetchAction(page, limit))
}

export default function* sagas() {
    yield all([
        takeEvery(FILTER_CHANGED, fetch)
    ])
}
