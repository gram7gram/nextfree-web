import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import PasswordSet from './screens/PasswordSet/sagas';
import PasswordReset from './screens/PasswordReset/sagas';
import Invitation from './screens/Invitation/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(PasswordSet),
    fork(PasswordReset),
    fork(Invitation),
  ]);
}
