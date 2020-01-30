const Company = require('../model/Company').Company

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Company.find(filter, null, {skip, limit})
    .sort({createdAt: 'desc'})
    .lean()
}

const findOneByFilter = async (filter) => {
  return Company.findOne(filter).lean()
}

const countByFilter = async (filter) => {
  return Company.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}