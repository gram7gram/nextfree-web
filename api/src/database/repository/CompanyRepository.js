const Company = require('../model/Company').Company

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return await Company.find(filter, {createdAt: 'desc'}, {skip, limit}).lean()
}

const findOneByFilter = async (filter) => {
  return await Company.findOne(filter).lean()
}

const countByFilter = async (filter) => {
  return await Company.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}