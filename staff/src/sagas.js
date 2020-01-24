import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import ProfileSecurity from './screens/ProfileSecurity/sagas';
import PasswordSet from './screens/PasswordSet/sagas';
import PasswordReset from './screens/PasswordReset/sagas';
import Invitation from './screens/Invitation/sagas';
import QRScanner from './screens/QRScanner/sagas';
import Purchases from './screens/Purchases/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(ProfileSecurity),
    fork(PasswordSet),
    fork(PasswordReset),
    fork(Invitation),
    fork(QRScanner),
    fork(Purchases),
  ]);
}
