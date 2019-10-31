const Store = require('../../database/model/Store').Store
const _merge = require('lodash/merge')

const StoreService = {

  serialize: entity => {
    return {...entity}
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
        message: 'Please, re-check store information for errors',
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