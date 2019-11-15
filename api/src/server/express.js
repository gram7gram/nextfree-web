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

const OwnerCompanyRESTController = require('./controllers/owner/CompanyRESTController');
const OwnerProfileController = require('./controllers/owner/ProfileController');
const OwnerStoreRESTController = require('./controllers/owner/StoreRESTController');
const OwnerStaffRESTController = require('./controllers/owner/StaffRESTController');
const OwnerPurchaseRESTController = require('./controllers/owner/PurchaseRESTController');
const OwnerRegisterController = require('./controllers/owner/RegisterController');
const OwnerLoginController = require('./controllers/owner/LoginController');

const StaffProfileController = require('./controllers/staff/ProfileController');
const StaffPurchaseRESTController = require('./controllers/staff/PurchaseRESTController');
const StaffLoginController = require('./controllers/staff/LoginController');

const CustomerProfileController = require('./controllers/customer/ProfileController');
const CustomerLoginController = require('./controllers/customer/LoginController');
const CustomerRegisterController = require('./controllers/customer/RegisterController');

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

//Public API
app.use('/api/v1', CustomerRegisterController);
app.use('/api/v1', CustomerLoginController);
app.use('/api/v1', OwnerRegisterController);
app.use('/api/v1', OwnerLoginController);
app.use('/api/v1', StaffLoginController);

//Admin API
app.use('/api/v1/admin', AdminCompanyRESTController);
app.use('/api/v1/admin', AdminOwnerRESTController);
app.use('/api/v1/admin', AdminStoreRESTController);
app.use('/api/v1/admin', AdminStaffRESTController);
app.use('/api/v1/admin', AdminCustomerRESTController);

//Owner API
app.use('/api/v1/owner', OwnerCompanyRESTController);
app.use('/api/v1/owner', OwnerStoreRESTController);
app.use('/api/v1/owner', OwnerStaffRESTController);
app.use('/api/v1/owner', OwnerProfileController);
app.use('/api/v1/owner', OwnerPurchaseRESTController);

//Staff API
app.use('/api/v1/staff', StaffProfileController);
app.use('/api/v1/staff', StaffPurchaseRESTController);

//Customer API
app.use('/api/v1/customer', CustomerProfileController);

app.all('*', (req, res) => {
  res.status(404).json({
    message: i18n.t('request.no_route_found')
  })
});

module.exports = app
