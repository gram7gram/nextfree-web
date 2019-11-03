const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isStaff = require('../../services/AuthService').isStaff;
const checkId = require('../../services/RequestParamsValidator').checkId;

const PurchaseService = require('../../services/PurchaseService');
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const StoreRepository = require('../../../database/repository/StoreRepository');

const router = new express.Router({mergeParams: true});

router.post('/customers/:id/purchases', isStaff, checkId, async (req, res) => {

  try {

    const staff = {...req.currentUser.user}

    const customer = await CustomerRepository.findOneByFilter({
      _id: req.params.id,
      isEnabled: true,
    })
    if (!staff) {
      throw {
        code: 404,
        message: 'No customer found'
      }
    }

    if (!(staff.companyId && staff.storeId)) {
      throw {
        code: 400,
        message: 'Staff is not assigned to a store'
      }
    }

    const company = await CompanyRepository.findOneByFilter({
      _id: staff.companyId,
      isEnabled: true,
    })
    if (!company) {
      throw {
        code: 404,
        message: 'No company found'
      }
    }

    const store = await StoreRepository.findOneByFilter({
      _id: staff.storeId,
      isEnabled: true,
    })
    if (!store) {
      throw {
        code: 404,
        message: 'No store found'
      }
    }

    const item = await PurchaseService.create({
      company,
      store,
      staff,
      customer,
      bonusCondition: store.bonusCondition,
    })

    res.status(201).json(PurchaseService.serialize(item))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

