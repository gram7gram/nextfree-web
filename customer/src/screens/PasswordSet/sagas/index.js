import {all, fork} from 'redux-saga/effects'

import Notification from './Notification'
import Validation from './Validation'

export default function* sagas() {
    yield all([
        fork(Notification),
        fork(Validation),
    ])
}
