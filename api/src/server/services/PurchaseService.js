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

    const bonusCondition = purchase.bonusCondition

    switch (bonusCondition) {
      case Conditions.BC_4_PLUS_1:
        await PurchaseService.check4Plus1Condition(purchase)
        break;
      case Conditions.BC_5_PLUS_1:
        await PurchaseService.check5Plus1Condition(purchase)
        break;
      case Conditions.BC_6_PLUS_1:
        await PurchaseService.check6Plus1Condition(purchase)
        break;
      case Conditions.BC_7_PLUS_1:
        await PurchaseService.check7Plus1Condition(purchase)
        break;
      case Conditions.BC_9_PLUS_1:
        await PurchaseService.check9Plus1Condition(purchase)
        break;
      default:

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
    const count = await PurchaseService.countPreviousPurchases(purchase)
    if (count > 0 && count % 4 === 0) {
      purchase.isBonus = true
    }
  },

  check5Plus1Condition: async (purchase) => {
    const count = await PurchaseService.countPreviousPurchases(purchase)
    if (count > 0 && count % 5 === 0) {
      purchase.isBonus = true
    }
  },

  check6Plus1Condition: async (purchase) => {
    const count = await PurchaseService.countPreviousPurchases(purchase)
    if (count > 0 && count % 6 === 0) {
      purchase.isBonus = true
    }
  },

  check7Plus1Condition: async (purchase) => {
    const count = await PurchaseService.countPreviousPurchases(purchase)
    if (count > 0 && count % 7 === 0) {
      purchase.isBonus = true
    }
  },

  check9Plus1Condition: async (purchase) => {
    const count = await PurchaseService.countPreviousPurchases(purchase)
    if (count > 0 && count % 9 === 0) {
      purchase.isBonus = true
    }
  },

  countPreviousPurchases: async (purchase) => {
    return Purchase.countDocuments({
      'buyer._id': purchase.buyer._id,
      'company._id': purchase.company._id,
      'isBonus': false,
    });
  }
}

module.exports = PurchaseService