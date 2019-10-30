const Staff = require('../model/Staff').Staff

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return await Staff.find(filter, {createdAt: 'desc'}, {skip, limit})
    .select('-user.password')
    .lean()
}

const findOneByFilter = async (filter) => {
  return await Staff.findOne(filter)
    .select('-user.password')
    .lean()
}

const countByFilter = async (filter) => {
  return await Staff.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}