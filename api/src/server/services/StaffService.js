const Staff = require('../../database/model/Staff').Staff

const StaffService = {

  serialize: entity => {
    const result = {...entity}

    delete result.user.password

    return result
  },

  create: async (content) => {
    const entity = new Staff()

    return await StaffService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(content)

    const match = await Staff.findOne({
      _id: {$not: {$eq: entity._id}},
      user: {
        email: entity.email
      }
    }).select('_id email').lean()
    if (match) {
      throw {
        code: 400,
        message: `There is already staff with such email`,
      }
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check staff information for errors',
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