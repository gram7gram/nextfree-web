const Store = require('../../database/model/Store').Store
const _merge = require('lodash/merge')
const i18n = require('../../i18n').i18n

const StoreService = {

  serialize: entity => {

    let query = [entity.city, entity.address].filter(item => !!item)
      .join(',').replace(/\s/g, '+')

    return {
      ...entity,
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(query)}`
    }
  },

  create: async (content) => {
    const entity = new Store()

    return await StoreService.update(entity, content)
  },

  update: async (entity, content) => {

    entity.set(
      _merge(entity.toObject(), content)
    )

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: i18n.t('store.validation_failed'),
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },

  remove: async id => {
    await Store.deleteOne({_id: id})
  },

}

module.exports = StoreService