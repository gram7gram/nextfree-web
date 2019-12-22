const bcrypt = require('bcryptjs')
const Owner = require('./database/model/Owner').Owner
const Customer = require('./database/model/Customer').Customer
const Staff = require('./database/model/Staff').Staff
const Company = require('./database/model/Company').Company
const Store = require('./database/model/Store').Store
const Condition = require('./BonusCondition')

const superpass = bcrypt.hashSync('nextfree', 10)

const createAdminOwner = async () => {
  const admin = new Owner({
    user: {
      displayId: '00001',
      isAdmin: true,
      email: 'admin@nextfree.com.ua',
      firstName: 'Admin',
      lastName: 'Owner',
      password: superpass,
    },
    isEnabled: true
  })

  try {
    await Owner.deleteOne({'user.email': admin.user.email})
    await admin.save()
  } catch (e) {
    console.error(e);
  }
}

const createOwner = async () => {
  let owner = new Owner({
    user: {
      displayId: '00002',
      email: 'owner@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Owner',
      password: superpass,
    },
    isEnabled: true
  })

  try {
    await Owner.deleteOne({'user.email': owner.user.email})
    owner = await owner.save()
  } catch (e) {
    console.error(e);
  }

  await createCompany(owner._id)
}

const createCompany = async (ownerId) => {
  let entity = new Company({
    name: 'ТОВ "Унікальная кав\'ярня"',
    bonusCondition: Condition.BC_4_PLUS_1,
    ownerId,
    isEnabled: true
  })

  try {
    await Company.deleteMany({'ownerId': ownerId})
    entity = await entity.save()
  } catch (e) {
    console.error(e);
  }

  await createStore(entity._id)
}

const createStore = async (companyId) => {
  const entity = new Store({
    city: 'Київ',
    address: 'пр. Перемоги 12',
    isEnabled: true,
    companyId
  })

  try {
    await Store.deleteMany({'companyId': companyId})
    await entity.save()
  } catch (e) {
    console.error(e);
  }
}

const createCustomer = async () => {
  const customer = new Customer({
    user: {
      displayId: '00003',
      email: 'customer@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Customer',
      password: superpass,
    },
    isEnabled: true
  })

  try {
    await Customer.deleteOne({'user.email': customer.user.email})
    await customer.save()
  } catch (e) {
    console.error(e);
  }
}

const createStaff = async () => {
  const staff = new Staff({
    user: {
      displayId: '00004',
      email: 'staff@nextfree.com.ua',
      firstName: 'Simple',
      lastName: 'Staff',
      password: superpass,
    },
    isEnabled: true
  })

  try {
    await Staff.deleteOne({'user.email': staff.user.email})
    await staff.save()
  } catch (e) {
    console.error(e);
  }
}

const start = async () => {

  console.log('Running system provision...')

  await createAdminOwner()

  await createOwner()

  await createStaff()

  await createCustomer()

  console.log('Completed provision!')
}

module.exports = start