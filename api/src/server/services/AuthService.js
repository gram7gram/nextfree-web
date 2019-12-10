const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const params = require('../../../parameters')
const i18n = require('../../i18n').i18n

const Staff = require('../../database/model/Staff').Staff
const Company = require('../../database/model/Company').Company
const Store = require('../../database/model/Store').Store
const Owner = require('../../database/model/Owner').Owner
const Customer = require('../../database/model/Customer').Customer

const StaffService = require('../services/StaffService')
const StoreService = require('../services/StoreService')
const CompanyService = require('../services/CompanyService')
const OwnerService = require('../services/OwnerService')
const CustomerService = require('../services/CustomerService')

const getToken = req => req.headers['authorization'];

const isAdmin = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isAdmin !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_admin")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isOwner = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isOwner !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_owner")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isStaff = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isStaff !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_staff")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isCustomer = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isCustomer !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_customer")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isAuthenticated = (req, res, next) => {

  const token = getToken(req)
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !(decoded.isOwner || decoded.isCustomer || decoded.isStaff)) {
      res.status(403).json({
        message: i18n.t("auth.access_denied")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const generateAuthToken = content => {
  return jwt.sign(content, params.secret, {
    expiresIn: '7d'
  });
}

const verifyToken = token => {
  try {
    return jwt.verify(token, params.secret);
  } catch (e) {
    return null;
  }
}


const authorizeStaffByEmailPassword = async (email, password) => {
  const entity = await Staff.findOne({"user.email": email})

  if (!entity) return null

  if (!entity.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.staff_inactive')
    }
  }

  if (!bcrypt.compareSync(password, entity.user.password)) {
    throw {
      code: 401,
      message: i18n.t('login.bad_credentials')
    }
  }

  return await authorizeStaff(entity.toObject())
}

const authorizeStaffById = async (id) => {

  const entity = await Staff.findById(id).lean()

  if (!entity) {
    throw {
      code: 404,
      message: i18n.t('login.no_user_found')
    }
  }

  if (!entity.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.staff_inactive')
    }
  }

  return await authorizeStaff(entity)
}

const authorizeStaff = async (staff) => {

  let company = null
  if (staff.companyId) {
    company = await Company.findById(staff.companyId).lean()
  }

  let store = null
  if (staff.storeId) {
    store = await Store.findById(staff.storeId).lean()
  }

  return {
    isStaff: true,
    isAdmin: staff.user.isAdmin === true,
    user: StaffService.serialize(staff),
    company: company ? CompanyService.serialize(company) : null,
    store: store ? StoreService.serialize(store) : null,
    domain: staff.user.isAdmin ? params.adminHost : params.staffHost,
  }
}


const authorizeOwnerByEmailPassword = async (email, password) => {
  const entity = await Owner.findOne({"user.email": email})

  if (!entity) return null

  if (!entity.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.owner_inactive')
    }
  }

  if (!bcrypt.compareSync(password, entity.user.password)) {
    throw {
      code: 401,
      message: i18n.t('login.bad_credentials')
    }
  }

  return await authorizeOwner(entity.toObject())
}

const authorizeOwnerById = async (id) => {

  const entity = await Owner.findById(id).lean()

  if (!entity) {
    throw {
      code: 404,
      message: i18n.t('login.no_user_found')
    }
  }

  if (!entity.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.owner_inactive')
    }
  }

  return await authorizeOwner(entity)
}

const authorizeOwner = async (owner) => {

  const company = await Company.findOne({
    ownerId: owner._id
  }).lean()

  let store = null
  if (company) {
    store = await Store.findOne({
      companyId: company._id
    }).lean()
  }

  return {
    isOwner: true,
    isAdmin: owner.user.isAdmin === true,
    user: OwnerService.serialize(owner),
    company: company ? CompanyService.serialize(company) : null,
    store: store ? StoreService.serialize(store) : null,
    domain: owner.user.isAdmin ? params.adminHost : params.ownerHost,
  }
}


const authorizeCustomerByEmailPassword = async (email, password) => {
  const entity = await Customer.findOne({"user.email": email})

  if (!entity) return null

  if (!entity.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.customer_inactive')
    }
  }

  if (!bcrypt.compareSync(password, entity.user.password)) {
    throw {
      code: 401,
      message: i18n.t('login.bad_credentials')
    }
  }

  return authorizeCustomer(entity.toObject())
}

const authorizeCustomerById = async (id) => {

  const customer = await Customer.findById(id).lean()

  if (!customer) {
    throw {
      code: 404,
      message: i18n.t('login.no_user_found')
    }
  }

  if (!customer.isEnabled) {
    throw {
      code: 401,
      message: i18n.t('login.owner_inactive')
    }
  }

  return authorizeCustomer(customer)
}

const authorizeCustomer = (customer) => {

  return {
    isCustomer: true,
    isAdmin: customer.user.isAdmin === true,
    user: CustomerService.serialize(customer),
    domain: customer.user.isAdmin ? params.adminHost : params.customerHost,
  }
}

module.exports = {
  authorizeCustomerByEmailPassword,
  authorizeOwnerByEmailPassword,
  authorizeStaffByEmailPassword,
  authorizeOwnerById,
  authorizeStaffById,
  authorizeCustomerById,
  authorizeOwner,
  authorizeStaff,
  getToken,
  isAuthenticated,
  isAdmin,
  isCustomer,
  isStaff,
  isOwner,
  verifyToken,
  generateAuthToken
}