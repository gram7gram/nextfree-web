const Customer = require('../../database/model/Customer').Customer
const uuid = require('uuid')
const _merge = require('lodash/merge')
const i18n = require('../../i18n').i18n

const CustomerService = {

  serialize: entity => {
    const result = {...entity}

    if (result.user)
      delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Customer({
      user: {
        activationToken: uuid()
      }
    })

    return await CustomerService.update(entity, content)
  },

  update: async (entity, content) => {

    delete entity.user.password;
    if (content.user)
      delete content.user.password;

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
          message: i18n.t('customer.duplicate_email'),
        }
      }
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('customer.validation_failed'),
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