const Owner = require('../model/Owner').Owner

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return await Owner.find(filter, {createdAt: 'desc'}, {skip, limit})
    .select('-user.password')
    .lean()
}

const findOneByFilter = async (filter) => {
  return await Owner.findOne(filter)
    .select('-user.password')
    .lean()
}

const countByFilter = async (filter) => {
  return await Owner.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}