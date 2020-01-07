const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const langParser = require('accept-language-parser')

const i18n = require('../i18n').i18n
const prepareTranslations = require('../i18n').prepareTranslations

const AdminCompanyRESTController = require('./controllers/admin/CompanyRESTController');
const AdminCustomerRESTController = require('./controllers/admin/CustomerRESTController');
const AdminStaffRESTController = require('./controllers/admin/StaffRESTController');
const AdminStoreRESTController = require('./controllers/admin/StoreRESTController');
const AdminOwnerRESTController = require('./controllers/admin/OwnerRESTController');
const AdminLoginController = require('./controllers/admin/LoginController');
const AdminSecurityController = require('./controllers/admin/SecurityController');

const OwnerCompanyRESTController = require('./controllers/owner/CompanyRESTController');
const OwnerProfileController = require('./controllers/owner/ProfileController');
const OwnerStoreRESTController = require('./controllers/owner/StoreRESTController');
const OwnerStaffRESTController = require('./controllers/owner/StaffRESTController');
const OwnerPurchaseRESTController = require('./controllers/owner/PurchaseRESTController');
const OwnerRegisterController = require('./controllers/owner/RegisterController');
const OwnerPasswordController = require('./controllers/owner/PasswordController');
const OwnerActivationController = require('./controllers/owner/ActivationController');
const OwnerLoginController = require('./controllers/owner/LoginController');
const OwnerSecurityController = require('./controllers/owner/SecurityController');
const OwnerCompanyPageRESTController = require('./controllers/owner/CompanyPageRESTController');

const StaffProfileController = require('./controllers/staff/ProfileController');
const StaffPurchaseRESTController = require('./controllers/staff/PurchaseRESTController');
const StaffPasswordController = require('./controllers/staff/PasswordController');
const StaffInvitationController = require('./controllers/staff/InvitationController');
const StaffActivationController = require('./controllers/staff/ActivationController');
const StaffLoginController = require('./controllers/staff/LoginController');
const StaffSecurityController = require('./controllers/staff/SecurityController');

const CustomerProfileController = require('./controllers/customer/ProfileController');
const CustomerRegisterController = require('./controllers/customer/RegisterController');
const CustomerPasswordController = require('./controllers/customer/PasswordController');
const CustomerActivationController = require('./controllers/customer/ActivationController');
const CustomerLoginController = require('./controllers/customer/LoginController');
const CustomerSecurityController = require('./controllers/customer/SecurityController');

const BonusConditionController = require('./controllers/BonusConditionController');
const UserRESTController = require('./controllers/UserRESTController');
const CompanyPageRESTController = require('./controllers/CompanyPageRESTController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, `../../public`)))

app.use((req, res, next) => {

  const supported = ['ua']

  let locale = langParser.pick(supported, req.headers['accept-language'] || '')
  if (!locale) {
    locale = supported[0]
  }

  prepareTranslations(locale)

  next()
})

//Public login API
app.use('/api/v1', AdminLoginController);
app.use('/api/v1', CustomerLoginController);
app.use('/api/v1', StaffLoginController);
app.use('/api/v1', OwnerLoginController);

//Public activation API
app.use('/api/v1', OwnerActivationController);
app.use('/api/v1', StaffActivationController);
app.use('/api/v1', CustomerActivationController);

//Public register API
app.use('/api/v1', CustomerRegisterController);
app.use('/api/v1', OwnerRegisterController);
app.use('/api/v1', StaffInvitationController);

//Public reset password API
app.use('/api/v1', CustomerPasswordController);
app.use('/api/v1', StaffPasswordController);
app.use('/api/v1', OwnerPasswordController);

//Public partner website API
app.use('/api/v1', CompanyPageRESTController);
app.use('/api/v1', BonusConditionController);

//Private API
app.use('/api/v1', UserRESTController);

//Admin API
app.use('/api/v1/admin', AdminCompanyRESTController);
app.use('/api/v1/admin', AdminOwnerRESTController);
app.use('/api/v1/admin', AdminStoreRESTController);
app.use('/api/v1/admin', AdminStaffRESTController);
app.use('/api/v1/admin', AdminCustomerRESTController);
app.use('/api/v1/admin', AdminSecurityController);

//Owner API
app.use('/api/v1/owner', OwnerCompanyRESTController);
app.use('/api/v1/owner', OwnerStoreRESTController);
app.use('/api/v1/owner', OwnerStaffRESTController);
app.use('/api/v1/owner', OwnerProfileController);
app.use('/api/v1/owner', OwnerPurchaseRESTController);
app.use('/api/v1/owner', OwnerSecurityController);
app.use('/api/v1/owner', OwnerCompanyPageRESTController);

//Staff API
app.use('/api/v1/staff', StaffProfileController);
app.use('/api/v1/staff', StaffPurchaseRESTController);
app.use('/api/v1/staff', StaffSecurityController);

//Customer API
app.use('/api/v1/customer', CustomerProfileController);
app.use('/api/v1/customer', CustomerSecurityController);

app.all('*', (req, res) => {
  res.status(404).json({
    message: i18n.t('request.no_route_found')
  })
});

module.exports = app
