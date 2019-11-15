const Company = require('../../database/model/Company').Company
const Store = require('../../database/model/Store').Store
const i18n = require('../../i18n')
const _merge = require('lodash/merge')

const CompanyService = {

  serialize: entity => {
    return {...entity}
  },

  create: async (content) => {
    const entity = new Company()

    return await CompanyService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(
      _merge(entity.toObject(), content)
    )

    if (entity.isModified('name')) {

      const match = await Company.findOne({
        '_id': {$not: {$eq: entity._id}},
        'name': entity.name,
        'ownerId': entity.ownerId,
      }).select('_id').lean()
      if (match) {
        throw {
          code: 400,
          message: i18n.t('company.duplicate_name'),
        }
      }

    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('company.validation_failed'),
        errors: validator.errors
      }
    }

    if (entity._id && entity.isModified('bonusCondition')) {

      await Store.updateMany(
        {companyId: entity._id},
        {bonusCondition: entity.bonusCondition}
      )

    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Company.deleteOne({_id: id})
  },

}

module.exports = CompanyService