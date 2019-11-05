const Owner = require('./database/model/Owner').Owner

const createAdminOwner = async () => {
  const admin = new Owner({
    user : {
      isAdmin: true,
      email: 'admin',
      firstName: 'Admin',
      lastName: 'Owner',
      password: 'admin',
    },
    isEnabled: true
  })

  try {
    await Owner.deleteOne({'user.email': admin.user.email})
    await admin.save()
  } catch (ignore) {}
}

const start = async () => {

  console.log('Running system provision...')

  await createAdminOwner()
}

module.exports = start