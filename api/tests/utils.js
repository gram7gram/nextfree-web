const Staff = require('../src/database/model/Staff').Staff
const Customer = require('../src/database/model/Customer').Customer
const Owner = require('../src/database/model/Owner').Owner
const AuthService = require('../src/server/services/AuthService')

const cid = (length = 5) => Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, length);

const createStaff = async () => {
  const password = cid(), email = cid()

  let entity = new Staff({
    user: {
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

const authorizeStaff = (user, isAdmin = false) => {
  return AuthService.generateAuthToken({
    isStaff: true,
    isAdmin,
    user
  })
}

const createOwner = async () => {
  const password = cid(), email = cid()

  let entity = new Owner({
    user: {
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

const authorizeOwner = (user, isAdmin = false) => {
  return AuthService.generateAuthToken({
    isOwner: true,
    isAdmin,
    user
  })
}

const createCustomer = async () => {
  const password = cid(), email = cid()

  let entity = new Customer({
    user: {
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

const authorizeCustomer = (user, isAdmin = false) => {
  return AuthService.generateAuthToken({
    isCustomer: true,
    isAdmin,
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
}
