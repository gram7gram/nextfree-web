const Owner = require('../../database/model/Owner').Owner
const _merge = require('lodash/merge')
const i18n = require('../../i18n').i18n

const OwnerService = {

  serialize: entity => {
    const result = {...entity}

    if (result.user)
      delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Owner()

    return await OwnerService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(
      _merge(entity.toObject(), content)
    )

    if (entity.isModified('user.email')) {

      const match = await Owner.findOne({
        _id: {$not: {$eq: entity._id}},
        'user.email': entity.user.email
      }).select('_id user.email').lean()
      if (match) {
        throw {
          code: 400,
          message: i18n.t('owner.duplicate_email'),
        }
      }

    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('owner.validation_failed'),
        errors: validator.errors
      }
    }

    const result = await entity.save()

    return result.toObject()
  },

  remove: async id => {
    await Owner.deleteOne({_id: id})
  },

}

module.exports = OwnerService