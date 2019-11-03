const Staff = require('../src/database/model/Staff').Staff
const Customer = require('../src/database/model/Customer').Customer
const Owner = require('../src/database/model/Owner').Owner
const Store = require('../src/database/model/Store').Store
const Company = require('../src/database/model/Company').Company
const AuthService = require('../src/server/services/AuthService')

const cid = (length = 5) => Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, length);

const createCompany = async (ownerId) => {

  let entity = new Company({
    ownerId,
    isEnabled: true,
    bonusCondition: cid(),
    name: cid(),
  })

  await entity.save()

  return entity.toObject()
}

const createStore = async (companyId, store = {}) => {

  let entity = new Store({
    companyId,
    isEnabled: true,
    bonusCondition: cid(),
    city: cid(),
    address: cid(),
    lng: 0,
    lat: 0,
    ...store
  })

  await entity.save()

  return entity.toObject()
}

const createStaff = async (isAdmin = false, staff = {}) => {
  const password = cid(), email = cid()

  let entity = new Staff({
    user: {
      isAdmin,
      email,
      password,
    },
    isEnabled: true,
    ...staff
  })

  await entity.save()

  entity = entity.toObject()

  entity.user.password = password

  return entity
}

const authorizeStaff = (user) => {
  return AuthService.generateAuthToken({
    isStaff: true,
    isAdmin: user.user.isAdmin === true,
    user
  })
}

const createOwner = async (isAdmin = false) => {
  const password = cid(), email = cid()

  let entity = new Owner({
    user: {
      isAdmin,
      email,
      password,
    },
    isEnabled: true
  })

  await entity.save()

  entity = entity.toObject()

  entity.user.password = password

  return entity
}

const authorizeOwner = (user) => {
  return AuthService.generateAuthToken({
    isOwner: true,
    isAdmin: user.user.isAdmin === true,
    user
  })
}

const createCustomer = async (isAdmin = false) => {
  const password = cid(), email = cid()

  let entity = new Customer({
    user: {
      isAdmin,
      email,
      password,
    },
    isEnabled: true
  })

  await entity.save()

  entity = entity.toObject()

  entity.user.password = password

  return entity
}

const authorizeCustomer = (user) => {
  return AuthService.generateAuthToken({
    isCustomer: true,
    isAdmin: user.user.isAdmin === true,
    user
  })
}

module.exports = {
  cid,
  createStaff,
  authorizeStaff,
  createOwner,
  authorizeOwner,
  createCustomer,
  authorizeCustomer,
  createCompany,
  createStore,
}
