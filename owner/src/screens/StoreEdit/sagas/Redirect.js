import {all, takeEvery, put} from 'redux-saga/effects'
import {replace} from 'connected-react-router'
import * as Actions from '../actions'
import * as Pages from '../../../router/Pages'

function* redirect() {
  yield put(replace(Pages.STORES))
}

export default function* sagas() {
  yield all([
    takeEvery(Actions.REMOVE_SUCCESS, redirect),
  ])
}
