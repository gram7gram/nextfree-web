import {all, fork} from 'redux-saga/effects'

import Items from './Items'

export default function* sagas() {
    yield all([
        fork(Items),
    ])
}
