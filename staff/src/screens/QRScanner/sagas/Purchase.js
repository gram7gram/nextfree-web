import {all, put, select, takeEvery} from 'redux-saga/effects'
import {MODEL_CHANGED, SET_DEFAULTS, RESET} from '../actions'

function* setDefaults() {
  const {company, store} = yield select(store => store.App)

  yield put({
    type: RESET
  })

  yield put({
    type: MODEL_CHANGED,
    payload: {
      companyId: company ? company._id : null,
      storeId: store ? store._id : null,
      displayId: null,
      userId: null,
      user: null,
    }
  })
}

export default function* sagas() {
  yield all([
    takeEvery(SET_DEFAULTS, setDefaults)
  ])
}
