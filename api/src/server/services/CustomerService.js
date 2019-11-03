const Customer = require('../../database/model/Customer').Customer
const _merge = require('lodash/merge')

const CustomerService = {

  serialize: entity => {
    const result = {...entity}

    if (result.user)
      delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Customer()

    return await CustomerService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(
      _merge(entity.toObject(), content)
    )

    if (entity.isModified('user.email')) {
      const match = await Customer.findOne({
        _id: {$not: {$eq: entity._id}},
        'user.email': entity.user.email
      }).select('_id user.email').lean()
      if (match) {
        throw {
          code: 400,
          message: `There is already customer with such email`,
        }
      }
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check customer information for errors',
        errors: validator.errors
      }
    }

    const result = await entity.save()

    return result.toObject()
  },

  remove: async id => {
    await Customer.deleteOne({_id: id})
  },

}

module.exports = CustomerService