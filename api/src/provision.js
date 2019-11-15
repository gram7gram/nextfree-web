const Owner = require('./database/model/Owner').Owner
const Customer = require('./database/model/Customer').Customer
const Staff = require('./database/model/Staff').Staff

const createAdminOwner = async () => {
  const admin = new Owner({
    user: {
      isAdmin: true,
      email: 'admin@nextfree.com.ua',
      firstName: 'Admin',
      lastName: 'Owner',
      password: 'nextfree',
    },
    isEnabled: true
  })

  try {
    await Owner.deleteOne({'user.email': admin.user.email})
    await admin.save()
  } catch (ignore) {
  }
}

const createOwner = async () => {
  const owner = new Owner({
    user: {
      email: 'owner@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Owner',
      password: 'nextfree',
    },
    isEnabled: true
  })

  try {
    await Owner.deleteOne({'user.email': owner.user.email})
    await owner.save()
  } catch (ignore) {
  }
}

const createCustomer = async () => {
  const customer = new Customer({
    user: {
      email: 'customer@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Customer',
      password: 'nextfree',
    },
    isEnabled: true
  })

  try {
    await Customer.deleteOne({'user.email': customer.user.email})
    await customer.save()
  } catch (ignore) {
  }
}

const createStaff = async () => {
  const staff = new Staff({
    user: {
      email: 'staff@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Staff',
      password: 'nextfree',
    },
    isEnabled: true
  })

  try {
    await Staff.deleteOne({'user.email': staff.user.email})
    await staff.save()
  } catch (ignore) {
  }
}

const start = async () => {

  console.log('Running system provision...')

  await createAdminOwner()

  await createOwner()

  await createStaff()

  await createCustomer()
}

module.exports = start