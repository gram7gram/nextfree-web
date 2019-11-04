const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const PurchaseService = require('../../services/PurchaseService');
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');

const router = new express.Router({mergeParams: true});

router.post('/customers/:id/purchases', isOwner, checkId, async (req, res) => {

  try {

    const owner = {...req.currentUser.user}

    const customer = await CustomerRepository.findOneByFilter({
      _id: req.params.id,
      isEnabled: true,
    })
    if (!customer) {
      throw {
        code: 404,
        message: 'No customer found'
      }
    }

    const company = await CompanyRepository.findOneByFilter({
      ownerId: owner._id,
      isEnabled: true,
    })
    if (!company) {
      throw {
        code: 404,
        message: 'No company found'
      }
    }

    const item = await PurchaseService.create({
      company,
      customer,
      bonusCondition: company.bonusCondition,
      staff: {
        ...owner
      },
    })

    res.status(201).json(PurchaseService.serialize(item))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

