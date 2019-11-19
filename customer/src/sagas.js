import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import Register from './screens/Register/sagas';
import PasswordReset from './screens/PasswordReset/sagas';
import PasswordSet from './screens/PasswordSet/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(Register),
    fork(PasswordReset),
    fork(PasswordSet),
  ]);
}
