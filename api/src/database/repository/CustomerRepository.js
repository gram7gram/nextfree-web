const Customer = require('../model/Customer').Customer

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  const items = await Customer.find(filter, {createdAt: 'desc'}, {skip, limit}).lean()

  return items.map(item => {

    if (item.user)
      delete item.user.password

    return item
  })
}

const findOneByFilter = async (filter) => {
  const item = await Customer.findOne(filter).lean()

  if (item) {
    if (item.user)
      delete item.user.password
  }

  return item
}

const countByFilter = async (filter) => {
  return await Customer.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}