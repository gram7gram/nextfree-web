const CompanyPage = require('../../database/model/CompanyPage').CompanyPage
const i18n = require('../../i18n').i18n
const _merge = require('lodash/merge')

const CompanyPageService = {

  serialize: entity => {
    return {...entity}
  },

  create: async function (company, content) {
    const entity = new CompanyPage({
      ownerId: company.ownerId,
      companyId: company._id,
      isEnabled: true
    })

    return this.update(entity, content)
  },

  update: async function (entity, content) {

    entity.set(
      _merge(entity.toObject(), content)
    )

    //Admin should moderate pages
    if (entity.status === 'IN_REVIEW') {
      entity.status = 'PUBLISHED'
      entity.publishedAt = new Date()
    } else {
      entity.publishedAt = null
    }

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('company.validation_failed'),
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

}

module.exports = CompanyPageService