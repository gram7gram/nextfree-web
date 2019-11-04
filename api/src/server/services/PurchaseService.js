const Purchase = require('../../database/model/Purchase').Purchase

const Conditions = require('../../BonusCondition');

const PurchaseService = {

  serialize: entity => {
    return {...entity}
  },

  create: async (content) => {
    const entity = new Purchase({
      ...content,
      isBonus: false
    })

    const validator = await entity.validate();
    if (validator) {
      throw {
        code: 400,
        message: 'Please, re-check purchase information for errors',
        errors: validator.errors
      }
    }

    await PurchaseService.checkBonusCondition(entity)

    await entity.save()

    return entity.toObject()
  },

  checkBonusCondition: async purchase => {

    const bonusCondition = purchase.store ? purchase.store.bonusCondition : purchase.company.bonusCondition

    if (bonusCondition === Conditions.BC_4_PLUS_1) {
      await PurchaseService.check4Plus1Condition(purchase)
    } else {
      throw {
        code: 501,
        message: `Unknown bonus condition "${bonusCondition}" in store "${purchase.store._id}"`
      }
    }

  },

  check4Plus1Condition: async (purchase) => {

    const bonusCondition = Conditions.BC_4_PLUS_1

    const previousBonus = await Purchase.findOne({
      'customer._id': purchase.customer._id,
      'company._id': purchase.company._id,
      'bonusCondition': bonusCondition,
      'isBonus': true
    }, {createdAt: 'desc'}).select('_id createdAt').lean()

    const bonusQuery = {
      'customer._id': purchase.customer._id,
      'company._id': purchase.company._id,
      'bonusCondition': bonusCondition,
      'isBonus': false,
    }

    if (previousBonus) {
      bonusQuery.createdAt = {
        $gt: previousBonus.createdAt
      }
    }

    const purchasesAfterBonus = await Purchase.countDocuments(bonusQuery)

    if (purchasesAfterBonus >= 4) {
      purchase.isBonus = true
    }
  }
}

module.exports = PurchaseService