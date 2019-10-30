const Store = require('../model/Store').Store

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return await Store.find(filter, {createdAt: 'desc'}, {skip, limit}).lean()
}

const findOneByFilter = async (filter) => {
  return await Store.findOne(filter).lean()
}

const countByFilter = async (filter) => {
  return await Store.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}