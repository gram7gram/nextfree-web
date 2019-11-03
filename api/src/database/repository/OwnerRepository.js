const Owner = require('../model/Owner').Owner

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  const items = await Owner.find(filter, {createdAt: 'desc'}, {skip, limit}).lean()

  return items.map(item => {

    if (item.user)
      delete item.user.password

    return item
  })
}

const findOneByFilter = async (filter) => {
  const item = await Owner.findOne(filter).lean()

  if (item) {
    if (item.user)
      delete item.user.password
  }

  return item
}

const countByFilter = async (filter) => {
  return await Owner.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}