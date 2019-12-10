const express = require('express');
const bcrypt = require('bcryptjs');
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

    const {newPassword} = req.body

    if (!newPassword) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Customer.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    entity.user.password = bcrypt.hashSync(newPassword, 10);

    await entity.save()

    res.status(201).json(CustomerService.serialize(entity.toObject()))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/staff/:id/security', checkId, isAdmin, async (req, res) => {

  try {

    const {newPassword} = req.body

    if (!newPassword) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Staff.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    entity.user.password = bcrypt.hashSync(newPassword, 10);

    await entity.save()

    res.status(201).json(StaffService.serialize(entity.toObject()))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/owners/:id/security', checkId, isAdmin, async (req, res) => {

  try {

    const {newPassword} = req.body

    if (!newPassword) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Owner.findById(req.params.id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    entity.user.password = bcrypt.hashSync(newPassword, 10);

    await entity.save()

    res.status(201).json(OwnerService.serialize(entity.toObject()))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

