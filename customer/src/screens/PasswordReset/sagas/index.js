import {all, fork} from 'redux-saga/effects'

import Notification from './Notification'
import Redirect from './Redirect'

export default function* sagas() {
    yield all([
        fork(Notification),
        fork(Redirect),
    ])
}
