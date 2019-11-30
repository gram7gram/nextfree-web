import {all, fork} from 'redux-saga/effects'

import Validation from './Validation'
import Notification from './Notification'
import Redirect from './Redirect'

export default function* sagas() {
    yield all([
        fork(Validation),
        fork(Notification),
        fork(Redirect),
    ])
}
