import {all, takeEvery} from 'redux-saga/effects'
import * as Actions from '../actions'
import {toast} from 'react-toastify';
import i18n from '../../../i18n'

function alertSuccess() {
  toast.success(i18n.t('notification.save_success'), {
    position: toast.POSITION.TOP_RIGHT,
  });
}

function removeSuccess() {
  toast.success(i18n.t('notification.remove_success'), {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export default function* sagas() {
  yield all([
    takeEvery(Actions.SAVE_SUCCESS, alertSuccess),
    takeEvery(Actions.REMOVE_SUCCESS, removeSuccess),
  ])
}
