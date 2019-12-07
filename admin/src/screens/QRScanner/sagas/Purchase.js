import {all, put, select, takeEvery} from 'redux-saga/effects'
import {MODEL_CHANGED, SET_DEFAULTS, RESET} from '../actions'

function* setDefaults() {
  const {defaultCompany, defaultStore} = yield select(store => store.App)

  yield put({
    type: RESET
  })

  yield put({
    type: MODEL_CHANGED,
    payload: {
      companyId: defaultCompany ? defaultCompany._id : null,
      storeId: defaultStore ? defaultStore._id : null,
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
