const Purchase = require('../model/Purchase').Purchase

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Purchase.find(filter, null, {skip, limit})
    .sort({createdAt: 'desc'})
    .select('-_id')
    .lean()
}

const findOneByFilter = async (filter) => {
  return Purchase.findOne(filter).select('-_id').lean()
}

const countByFilter = async (filter) => {
  return Purchase.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}