import {all, put, select, takeEvery, throttle} from 'redux-saga/effects'
import {MODEL_CHANGED, VALIDATE_REQUEST, FETCH_SUCCESS} from '../actions'
import Validate from '../actions/Validate'

function* requestValidation() {
    yield put({
        type: VALIDATE_REQUEST
    })
}

function* runValidation() {
    const {model, changes} = yield select(store => store.Profile)

    yield put(Validate(model, changes))
}

export default function* sagas() {
    yield all([
        throttle(400, [MODEL_CHANGED, FETCH_SUCCESS], requestValidation),

        takeEvery(VALIDATE_REQUEST, runValidation)
    ])
}
