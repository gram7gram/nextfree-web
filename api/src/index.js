const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const LoginController = require('./server/controllers/LoginController');
const RegisterController = require('./server/controllers/RegisterController');
const AdminCompanyRESTController = require('./server/controllers/admin/CompanyRESTController');
const AdminCustomerRESTController = require('./server/controllers/admin/CustomerRESTController');
const AdminStaffRESTController = require('./server/controllers/admin/StaffRESTController');
const AdminStoreRESTController = require('./server/controllers/admin/StoreRESTController');
const AdminOwnerRESTController = require('./server/controllers/admin/OwnerRESTController');
const OwnerCompanyRESTController = require('./server/controllers/owner/CompanyRESTController');
const OwnerProfileController = require('./server/controllers/owner/ProfileController');
const OwnerStoreRESTController = require('./server/controllers/owner/StoreRESTController');
const OwnerStaffRESTController = require('./server/controllers/owner/StaffRESTController');
const StaffProfileController = require('./server/controllers/staff/ProfileController');
const CustomerProfileController = require('./server/controllers/customer/ProfileController');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Public API
app.use('/api/v1', LoginController);
app.use('/api/v1', RegisterController);

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

//Staff API
app.use('/api/v1/staff', StaffProfileController);

//Customer API
app.use('/api/v1/customer', CustomerProfileController);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No route found'
  })
});

module.exports = app
