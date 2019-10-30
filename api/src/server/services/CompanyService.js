const Company = require('../../database/model/Company').Company

const CompanyService = {

  serialize: entity => {
    return {...entity}
  },

  create: async (content) => {
    const entity = new Company()

    return await CompanyService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(content)

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check company information for errors',
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Company.deleteOne({_id: id})
  },

}

module.exports = CompanyService