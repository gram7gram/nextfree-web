import {all, fork} from 'redux-saga/effects'

import Purchase from './Purchase'

export default function* sagas() {
    yield all([
        fork(Purchase),
    ])
}
