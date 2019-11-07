const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')
const Condition = require('../../../BonusCondition')

const CompanyService = require('../../services/CompanyService')
const StoreService = require('../../services/StoreService')
const OwnerService = require('../../services/OwnerService')

const router = new express.Router({mergeParams: true});

router.post('/owner-register', async (req, res) => {

  try {

    const {owner, company} = req.body

    const entity = await OwnerService.create({
      ...owner,
      isEnabled: true
    })

    const companyEntity = await CompanyService.create({
      ownerId: entity._id,
      isEnabled: false,
      name: company.name,
      bonusCondition: Condition.BC_4_PLUS_1
    })

    const storeEntity = await StoreService.create({
      companyId: companyEntity._id,
      bonusCondition: companyEntity.bonusCondition,
      isEnabled: false,
    })

    res.status(201).json({
      owner: OwnerService.serialize(entity),
      company: CompanyService.serialize(companyEntity),
      store: StoreService.serialize(storeEntity),
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

