const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const i18n = require('../../../i18n').i18n;
const isStaff = require('../../services/AuthService').isStaff;
const checkId = require('../../services/RequestParamsValidator').checkId;

const PurchaseService = require('../../services/PurchaseService');
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const StoreRepository = require('../../../database/repository/StoreRepository');
const OwnerRepository = require('../../../database/repository/OwnerRepository');
const StaffRepository = require('../../../database/repository/StaffRepository');

const router = new express.Router({mergeParams: true});

router.post('/users/:id/purchases', isStaff, checkId, async (req, res) => {

  try {

    const staff = {...req.currentUser.user}

    if (!(staff.companyId && staff.storeId)) {
      throw {
        code: 400,
        message: i18n.t('purchase.staff_not_assigned_to_store')
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

    const isBuyerCustomer = new Promise((resolve, reject) => {
      (async () => {
        const buyer = await CustomerRepository.findOneByFilter({
          'user._id': req.params.id,
        })

        if (!buyer) {
          resolve(null)
          return
        }

        if (!buyer.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.customer_is_disabled')
          })
          return
        }

        resolve(buyer)

      })()
    })

    const isBuyerStaff = new Promise((resolve, reject) => {
      (async () => {
        const buyer = await StaffRepository.findOneByFilter({
          'user._id': req.params.id,
        })

        if (!buyer) {
          resolve(null)
          return
        }

        if (!buyer.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.staff_is_disabled')
          })
          return
        }

        resolve(buyer)

      })()
    })

    const isBuyerOwner = new Promise((resolve, reject) => {
      (async () => {
        const buyer = await OwnerRepository.findOneByFilter({
          'user._id': req.params.id,
        })

        if (!buyer) {
          resolve(null)
          return
        }

        if (!buyer.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.owner_is_disabled')
          })
          return
        }

        resolve(buyer)

      })()
    })

    Promise.all([
      isBuyerCustomer,
      isBuyerOwner,
      isBuyerStaff
    ]).then(async results => {

      const buyer = results.find(result => !!result)
      if (!buyer) {
        res.status(404).json({
          message: i18n.t('purchase.customer_not_found')
        })
      }

      const item = await PurchaseService.create({
        company,
        store,
        seller: staff,
        buyer,
        bonusCondition: company.bonusCondition,
      })

      res.status(201).json(PurchaseService.serialize(item))

    }).catch(e => {
      ErrorHandler.handle(res, e)
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

