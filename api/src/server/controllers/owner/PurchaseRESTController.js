const express = require('express');
const i18n = require('../../../i18n').i18n;

const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const PurchaseService = require('../../services/PurchaseService');
const StoreRepository = require('../../../database/repository/StoreRepository');
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');

const router = new express.Router({mergeParams: true});

router.post('/customers/:id/purchases', isOwner, checkId, async (req, res) => {

  try {

    const owner = {...req.currentUser.user}

    const customer = await CustomerRepository.findOneByFilter({
      _id: req.params.id,
    })
    if (!customer) {
      throw {
        code: 404,
        message: i18n.t('purchase.no_customer_found')
      }
    }

    if (!customer.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('purchase.customer_is_disabled')
      }
    }

    const company = await CompanyRepository.findOneByFilter({
      ownerId: owner._id,
    })
    if (!company) {
      throw {
        code: 404,
        message: i18n.t('purchase.company_not_found')
      }
    }

    if (!company.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('purchase.company_is_disabled')
      }
    }

    const store = await StoreRepository.findOneByFilter({
      companyId: company._id,
    })

    if (!store) {
      throw {
        code: 404,
        message: i18n.t('purchase.store_not_found')
      }
    }

    if (!store.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('purchase.store_is_disabled')
      }
    }

    const item = await PurchaseService.create({
      company,
      store,
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

