const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')
const Condition = require('../../../BonusCondition')

const CompanyService = require('../../services/CompanyService')
const OwnerService = require('../../services/OwnerService')
const OwnerEmailService = require('../../services/OwnerEmailService')

const router = new express.Router({mergeParams: true});

router.post('/owner-register', async (req, res) => {

  try {

    const {owner, company} = req.body

    const {password} = owner.user

    const entity = await OwnerService.create({
      ...owner,
      isEnabled: false
    })

    await OwnerService.changePassword(entity, password)

    const companyEntity = await CompanyService.create({
      ownerId: entity._id,
      isEnabled: false,
      name: company.name,
      bonusCondition: Condition.BC_4_PLUS_1
    })

    await OwnerEmailService.onAccountActivation(entity)

    res.status(201).json({
      owner: OwnerService.serialize(entity),
      company: CompanyService.serialize(companyEntity),
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

