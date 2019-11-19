import {all, fork} from 'redux-saga/effects'

import Notification from './Notification'

export default function* sagas() {
    yield all([
        fork(Notification),
    ])
}
