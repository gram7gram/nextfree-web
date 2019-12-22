const express = require('express');
const i18n = require('../../../i18n').i18n;

const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const PurchaseService = require('../../services/PurchaseService');
const StoreRepository = require('../../../database/repository/StoreRepository');
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const OwnerRepository = require('../../../database/repository/OwnerRepository');
const StaffRepository = require('../../../database/repository/StaffRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');

const router = new express.Router({mergeParams: true});

router.post('/users/:id/purchases', checkId, isOwner, async (req, res) => {

  try {

    const owner = {...req.currentUser.user}

    let company
    if (req.body.companyId) {
      company = await CompanyRepository.findOneByFilter({
        _id: req.body.companyId,
        ownerId: owner._id,
      })
    } else {
      company = await CompanyRepository.findOneByFilter({
        ownerId: owner._id,
      })
    }

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

    let store
    if (req.body.storeId) {
      store = await StoreRepository.findOneByFilter({
        _id: req.body.storeId,
        companyId: company._id,
      })
    } else {
      store = await StoreRepository.findOneByFilter({
        companyId: company._id,
      })
    }

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
        seller: owner,
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

