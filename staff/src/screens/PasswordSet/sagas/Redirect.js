import {all, put, takeLatest} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import * as Actions from '../actions'
import * as Pages from '../../../router/Pages'

function* redirect() {
  yield put(replace(Pages.LOGIN))
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.SAVE_SUCCESS, redirect),
  ])
}
