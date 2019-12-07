const express = require('express');
const i18n = require('../../i18n').i18n;

const ErrorHandler = require('../services/ErrorHandler');
const isAuthenticated = require('../services/AuthService').isAuthenticated;
const checkId = require('../services/RequestParamsValidator').checkId;
const CustomerService = require('../services/CustomerService');
const OwnerService = require('../services/OwnerService');
const StaffService = require('../services/StaffService');

const CustomerRepository = require('../../database/repository/CustomerRepository');
const OwnerRepository = require('../../database/repository/OwnerRepository');
const StaffRepository = require('../../database/repository/StaffRepository');


const router = new express.Router({mergeParams: true});

router.get('/users/:id', checkId, isAuthenticated, async (req, res) => {

  try {

    const id = req.params.id

    const isCustomer = new Promise((resolve, reject) => {
      (async () => {
        const match = await CustomerRepository.findOneByFilter({
          'user._id': id,
        })

        if (!match) {
          resolve(null)
          return
        }

        if (!match.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.customer_is_disabled')
          })
          return
        }

        resolve(CustomerService.serialize(match))

      })()
    })

    const isStaff = new Promise((resolve, reject) => {
      (async () => {
        const match = await StaffRepository.findOneByFilter({
          'user._id': id,
        })

        if (!match) {
          resolve(null)
          return
        }

        if (!match.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.staff_is_disabled')
          })
          return
        }

        resolve(StaffService.serialize(match))

      })()
    })

    const isOwner = new Promise((resolve, reject) => {
      (async () => {
        const match = await OwnerRepository.findOneByFilter({
          'user._id': id,
        })

        if (!match) {
          resolve(null)
          return
        }

        if (!match.isEnabled) {
          reject({
            code: 404,
            message: i18n.t('purchase.owner_is_disabled')
          })
          return
        }

        resolve(OwnerService.serialize(match))

      })()
    })

    Promise.all([
      isCustomer,
      isOwner,
      isStaff
    ]).then(async results => {

      const match = results.find(result => !!result)
      if (!match) {
        res.status(404).json({
          message: i18n.t('purchase.customer_not_found')
        })
      }

      res.status(200).json(match.user)

    }).catch(e => {
      ErrorHandler.handle(res, e)
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

