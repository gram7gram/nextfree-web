import {all, fork} from 'redux-saga/effects'

import Validation from './Validation'
import Login from './Login'

export default function* sagas() {
    yield all([
        fork(Validation),
        fork(Login),
    ])
}
