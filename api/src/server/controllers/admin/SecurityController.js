const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Customer = require('../../../database/model/Customer').Customer
const Staff = require('../../../database/model/Staff').Staff
const Owner = require('../../../database/model/Owner').Owner
const checkId = require('../../services/RequestParamsValidator').checkId
const isAdmin = require('../../services/AuthService').isAdmin
const CustomerService = require('../../services/CustomerService')
const StaffService = require('../../services/StaffService')
const OwnerService = require('../../services/OwnerService')

const router = new express.Router({mergeParams: true});

router.put('/customers/:id/security', checkId, isAdmin, async (req, res) => {

  try {

    const entity = await Customer.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    if (!entity.user.comparePassword(currentPassword)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    entity.user.password = newPassword;

    await entity.save()

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/staff/:id/security', checkId, isAdmin, async (req, res) => {

  try {

    const entity = await Staff.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    if (!entity.user.comparePassword(currentPassword)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    entity.user.password = newPassword;

    await entity.save()

    res.status(201).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/owners/:id/security', checkId, isAdmin, async (req, res) => {

  try {

    const entity = await Owner.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    if (!entity.user.comparePassword(currentPassword)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    entity.user.password = newPassword;

    await entity.save()

    res.status(201).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

