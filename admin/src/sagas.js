import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import ProfileSecurity from './screens/ProfileSecurity/sagas';
import Staff from './screens/Staff/sagas';
import StaffEdit from './screens/StaffEdit/sagas';
import Store from './screens/Store/sagas';
import StoreEdit from './screens/StoreEdit/sagas';
import Company from './screens/Company/sagas';
import CompanyEdit from './screens/CompanyEdit/sagas';
import CompanyWebsite from './screens/CompanyWebsite/sagas';
import Customer from './screens/Customer/sagas';
import CustomerEdit from './screens/CustomerEdit/sagas';
import Owner from './screens/Owner/sagas';
import OwnerEdit from './screens/OwnerEdit/sagas';
import QRScanner from './screens/QRScanner/sagas';
import Purchases from './screens/Purchases/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(ProfileSecurity),
    fork(Staff),
    fork(StaffEdit),
    fork(Store),
    fork(StoreEdit),
    fork(Company),
    fork(CompanyEdit),
    fork(CompanyWebsite),
    fork(Customer),
    fork(CustomerEdit),
    fork(Owner),
    fork(OwnerEdit),
    fork(QRScanner),
    fork(Purchases),
  ]);
}
