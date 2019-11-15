const Staff = require('../../database/model/Staff').Staff
const _merge = require('lodash/merge')
const i18n = require('../../i18n')

const StaffService = {

  serialize: entity => {
    const result = {...entity}

    if (result.user)
      delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Staff()

    return await StaffService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(
      _merge(entity.toObject(), content)
    )

    if (entity.isModified('user.email')) {

      const match = await Staff.findOne({
        _id: {$not: {$eq: entity._id}},
        'user.email': entity.user.email
      }).select('_id user.email').lean()
      if (match) {
        throw {
          code: 400,
          message: i18n.t('staff.duplicate_email'),
        }
      }

    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('staff.validation_failed'),
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Staff.deleteOne({_id: id})
  },

}

module.exports = StaffService