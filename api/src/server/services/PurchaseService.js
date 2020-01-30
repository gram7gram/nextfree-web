const {Purchase} = require('../../database/model/Purchase')
const {Company} = require('../../database/model/Company')
const i18n = require('../../i18n').i18n
const Conditions = require('../../BonusCondition');
const CustomerEmailService = require('./CustomerEmailService');

const serialize = entity => {
  return {...entity}
}

const create = async (content) => {
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

  await checkBonusCondition(entity)

  await entity.save()

  const result = entity.toObject();

  if (result.isBonus) {
    await CustomerEmailService.onBonusPurchase(result)
  }

  return result
}

const checkBonusCondition = async purchase => {

  const bonusCondition = purchase.bonusCondition

  switch (bonusCondition) {
    case Conditions.BC_4_PLUS_1:
      await check4Plus1Condition(purchase)
      break;
    case Conditions.BC_5_PLUS_1:
      await check5Plus1Condition(purchase)
      break;
    case Conditions.BC_6_PLUS_1:
      await check6Plus1Condition(purchase)
      break;
    case Conditions.BC_7_PLUS_1:
      await check7Plus1Condition(purchase)
      break;
    case Conditions.BC_9_PLUS_1:
      await check9Plus1Condition(purchase)
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

}

const check4Plus1Condition = async (purchase) => {
  const count = await countPreviousPurchases(purchase.buyer._id, purchase.company._id)
  if (count > 0 && count % 4 === 0) {
    purchase.isBonus = true
  }
}

const check5Plus1Condition = async (purchase) => {
  const count = await countPreviousPurchases(purchase.buyer._id, purchase.company._id)
  if (count > 0 && count % 5 === 0) {
    purchase.isBonus = true
  }
}

const check6Plus1Condition = async (purchase) => {
  const count = await countPreviousPurchases(purchase.buyer._id, purchase.company._id)
  if (count > 0 && count % 6 === 0) {
    purchase.isBonus = true
  }
}

const check7Plus1Condition = async (purchase) => {
  const count = await countPreviousPurchases(purchase.buyer._id, purchase.company._id)
  if (count > 0 && count % 7 === 0) {
    purchase.isBonus = true
  }
}

const check9Plus1Condition = async (purchase) => {
  const count = await countPreviousPurchases(purchase.buyer._id, purchase.company._id)
  if (count > 0 && count % 9 === 0) {
    purchase.isBonus = true
  }
}

const countPreviousPurchases = async (buyer, company) => {

  const previousBonus = await Purchase.findOne({
    'buyer._id': buyer,
    'company._id': company,
    'isBonus': true
  }).sort({createdAt: 'desc'}).select('_id createdAt').lean()

  const bonusQuery = {
    'buyer._id': buyer,
    'company._id': company,
    'isBonus': false,
  }

  if (previousBonus) {
    bonusQuery.createdAt = {
      $gt: previousBonus.createdAt
    }
  }

  return Purchase.countDocuments(bonusQuery)
}

const groupByCompany = async (buyer) => {

  const companyIds = await Purchase.distinct('company._id', {
    'buyer._id': {$eq: buyer}
  }).lean()

  const companies = await Company.find({
    _id: {$in: companyIds}
  }).select('_id bonusCondition name').lean()

  const result = await Promise.all(companies.map(company =>
    new Promise((resolve, reject) => {

      countPreviousPurchases(buyer, company._id)
        .then(result => {

            let nextBonusIn = 0

            switch (company.bonusCondition) {
              case Conditions.BC_4_PLUS_1:
                nextBonusIn = 4 - result + 1
                break;
              case Conditions.BC_5_PLUS_1:
                nextBonusIn = 5 - result + 1
                break;
              case Conditions.BC_6_PLUS_1:
                nextBonusIn = 6 - result + 1
                break;
              case Conditions.BC_7_PLUS_1:
                nextBonusIn = 7 - result + 1
                break;
              case Conditions.BC_9_PLUS_1:
                nextBonusIn = 9 - result + 1
                break;
            }

            resolve({
              company,
              nextBonusIn
            })

          }
        ).catch(reject)

    })
  ))

  result.sort((a, b) => {
    if (a.nextBonusIn < b.nextBonusIn) return -1
    if (a.nextBonusIn > b.nextBonusIn) return 1
    return 0
  })

  return result
}

module.exports = {
  create,
  serialize,
  groupByCompany,
}
