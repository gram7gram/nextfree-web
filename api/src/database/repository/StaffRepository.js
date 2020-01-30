const Staff = require('../model/Staff').Staff

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Staff.find(filter, null, {skip, limit})
    .select('-user.password')
    .sort({createdAt: 'desc'})
    .lean()
}

const findOneByFilter = async (filter) => {
  return Staff.findOne(filter)
    .select('-user.password')
    .lean()
}

const countByFilter = async (filter) => {
  return Staff.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}