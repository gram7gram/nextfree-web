import {all, put, select, takeEvery, throttle} from 'redux-saga/effects'
import {WEBSITE_CHANGED, VALIDATE_WEBSITE_REQUEST, FETCH_WEBSITE_SUCCESS} from '../actions'
import Validate from '../actions/ValidateWebsite'

function* requestValidation() {
    yield put({
        type: VALIDATE_WEBSITE_REQUEST
    })
}

function* runValidation() {
    const {model, changes} = yield select(store => store.CompanyWebsite)

    yield put(Validate(model, changes))
}

export default function* sagas() {
    yield all([
        throttle(400, [WEBSITE_CHANGED, FETCH_WEBSITE_SUCCESS], requestValidation),

        takeEvery(VALIDATE_WEBSITE_REQUEST, runValidation)
    ])
}
