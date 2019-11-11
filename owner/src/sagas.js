import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import Staff from './screens/Staff/sagas';
import Register from './screens/Register/sagas';
import StaffEdit from './screens/StaffEdit/sagas';
import Store from './screens/Store/sagas';
import StoreEdit from './screens/StoreEdit/sagas';
import Company from './screens/Company/sagas';
import CompanyEdit from './screens/CompanyEdit/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(Register),
    fork(Staff),
    fork(StaffEdit),
    fork(Store),
    fork(StoreEdit),
    fork(Company),
    fork(CompanyEdit),
  ]);
}
