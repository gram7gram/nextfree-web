const Owner = require('../model/Owner').Owner

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Owner.find(filter, null, {skip, limit})
    .select('-user.password')
    .sort({createdAt: 'desc'})
    .lean()
}

const findOneByFilter = async (filter) => {
  return Owner.findOne(filter)
    .select('-user.password')
    .lean()
}

const countByFilter = async (filter) => {
  return Owner.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}