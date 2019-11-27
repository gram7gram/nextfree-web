const Purchase = require('../../database/model/Purchase').Purchase
const i18n = require('../../i18n').i18n
const Conditions = require('../../BonusCondition');
const CustomerEmailService = require('./CustomerEmailService');

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
        message: i18n.t('purchase.validation_failed'),
        errors: validator.errors
      }
    }

    await PurchaseService.checkBonusCondition(entity)

    await entity.save()

    const result = entity.toObject();

    if (result.isBonus) {
      await CustomerEmailService.onBonusPurchase(result)
    }

    return result
  },

  checkBonusCondition: async purchase => {

    const bonusCondition = purchase.store
      ? purchase.store.bonusCondition
      : purchase.company.bonusCondition

    if (bonusCondition === Conditions.BC_4_PLUS_1) {
      await PurchaseService.check4Plus1Condition(purchase)
    } else {

      if (purchase.store) {
        throw {
          code: 501,
          message: i18n.t('unknown_store_condition')
            .replace('_CONDITION_', bonusCondition)
            .replace('_STORE_', purchase.store.address)
        }
      }

      if (purchase.company) {
        throw {
          code: 501,
          message: i18n.t('unknown_company_condition')
            .replace('_CONDITION_', bonusCondition)
            .replace('_COMPANY_', purchase.company.name)
        }
      }
    }

  },

  check4Plus1Condition: async (purchase) => {

    const bonusCondition = Conditions.BC_4_PLUS_1

    const previousBonus = await Purchase.findOne({
      'buyer._id': purchase.buyer._id,
      'company._id': purchase.company._id,
      'bonusCondition': bonusCondition,
      'isBonus': true
    }).sort({createdAt: 'desc'}).select('_id createdAt').lean()

    const bonusQuery = {
      'buyer._id': purchase.buyer._id,
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