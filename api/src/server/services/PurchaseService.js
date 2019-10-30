const Purchase = require('../../database/model/Purchase').Purchase

const PurchaseService = {

  serialize: entity => {
    return {...entity}
  },

  create: async (content) => {
    const entity = new Purchase(content)

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check purchase information for errors',
        errors: validator.errors
      }
    }

    await entity.save()

    return entity.toObject()
  },
}

module.exports = PurchaseService