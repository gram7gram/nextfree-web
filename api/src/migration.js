const {getNextSequence} = require('./database/mongo')
const migrations = require('./database/migrations').migrations
const Owner = require('./database/model/Owner').Owner
const Customer = require('./database/model/Customer').Customer
const Staff = require('./database/model/Staff').Staff

const migration1 = async () => {

  console.log('[migration1] started...')

  const owners = await Owner.find({
    $or: [
      {'user.displayId': {$exists: false}},
      {'user.displayId': ''},
      {'user.displayId': null},
    ]
  })
  const staff = await Staff.find({
    $or: [
      {'user.displayId': {$exists: false}},
      {'user.displayId': ''},
      {'user.displayId': null},
    ]
  })
  const customers = await Customer.find({
    $or: [
      {'user.displayId': {$exists: false}},
      {'user.displayId': ''},
      {'user.displayId': null},
    ]
  })

  const usersWithoutId = [].concat(owners).concat(staff).concat(customers)

  console.log(`[migration1] found ${usersWithoutId.length} invalid users`)

  for (let i = 0; i < usersWithoutId.length; i++) {
    const entity = usersWithoutId[i]

    entity.user.displayId = await getNextSequence('user_seq')

    await entity.save()
  }

  await migrations.create({name: 'migration1'})

  console.log('[migration1] completed')
}

const start = async () => {

  console.log('Running migrations...')

  const completed = await migrations.find().lean()

  if (!completed.find(item => item.name === 'migration1'))
    await migration1()

  console.log('Completed migration!')
}

module.exports = start