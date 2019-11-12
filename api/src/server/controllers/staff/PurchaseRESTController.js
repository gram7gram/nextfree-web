const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const i18n = require('../../../i18n').i18n;
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

    if (!(staff.companyId && staff.storeId)) {
      throw {
        code: 400,
        message: i18n.t('purchase.staff_not_assigned_to_store')
      }
    }

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
      _id: staff.companyId,
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
      _id: staff.storeId,
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

