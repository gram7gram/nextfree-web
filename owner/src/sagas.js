import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import Staff from './screens/Staff/sagas';
import Register from './screens/Register/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(Register),
    fork(Staff),
  ]);
}
