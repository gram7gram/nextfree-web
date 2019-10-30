const Customer = require('../../database/model/Customer').Customer

const CustomerService = {

  serialize: entity => {
    const result = {...entity}

    delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Customer()

    return await CustomerService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(content)

    const match = await Customer.findOne({
      _id: {$not: {$eq: entity._id}},
      user: {
        email: entity.email
      }
    }).select('_id email').lean()
    if (match) {
      throw {
        code: 400,
        message: `There is already customer with such email`,
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