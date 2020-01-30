const Customer = require('../model/Customer').Customer

const findByFilter = async (filter, page, limit) => {
  const skip = page > 0 && limit > 0 ? limit * (page - 1) : 0

  return Customer.find(filter, null, {skip, limit})
    .select('-user.password')
    .sort({createdAt: 'desc'})
    .lean()
}

const findOneByFilter = async (filter) => {
  return Customer.findOne(filter)
    .select('-user.password')
    .lean()
}

const countByFilter = async (filter) => {
  return Customer.countDocuments(filter)
}

module.exports = {
  findByFilter,
  findOneByFilter,
  countByFilter,
}