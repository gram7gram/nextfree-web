const Store = require('../model/Store').Store

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Store.find(filter, null, {skip, limit})
    .sort({createdAt: 'desc'})
    .lean()
}

const findOneByFilter = async (filter) => {
  return Store.findOne(filter).lean()
}

const countByFilter = async (filter) => {
  return Store.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}