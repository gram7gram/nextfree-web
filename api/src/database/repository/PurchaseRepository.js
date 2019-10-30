const Purchase = require('../model/Purchase').Purchase

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return await Purchase.find(filter, {createdAt: 'desc'}, {skip, limit}).select('-_id').lean()
}

const findOneByFilter = async (filter) => {
  return await Purchase.findOne(filter).select('-_id').lean()
}

const countByFilter = async (filter) => {
  return await Purchase.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}