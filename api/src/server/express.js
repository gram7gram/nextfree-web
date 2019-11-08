const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

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

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Public API
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
    message: 'No route found'
  })
});

module.exports = app
