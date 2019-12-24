const Staff = require('../../database/model/Staff').Staff
const {getNextSequence} = require('../../database/mongo')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const _merge = require('lodash/merge')
const i18n = require('../../i18n').i18n

const StaffService = {

  serialize: entity => {
    const result = {...entity}

    if (result.user)
      delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Staff({
      isEnabled: true,
      user: {
        displayId: await getNextSequence('user_seq'),
        activationToken: uuid()
      }
    })

    console.log('create', JSON.stringify(entity.toObject()));

    return await StaffService.update(entity, content)
  },

  changePassword: async (entity, newPassword, currentPassword = null) => {

    if (currentPassword) {
      if (!bcrypt.compareSync(currentPassword, entity.user.password || '')) {
        throw {
          code: 403,
          message: i18n.t('reset_password.mismatch')
        }
      }
    }

    await Staff.updateOne({_id: entity._id}, {
      $set: {
        'user.password': bcrypt.hashSync(newPassword, 10)
      }
    })
  },

  update: async (entity, content) => {

    delete entity.user.password;
    if (content.user)
      delete content.user.password;

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

    const result = await entity.save()

    return result.toObject()
  },

  remove: async id => {
    await Staff.deleteOne({_id: id})
  },

}

module.exports = StaffService