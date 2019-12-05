const express = require('express');
const uuid = require('uuid');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Customer = require('../../../database/model/Customer').Customer
const CustomerService = require('../../services/CustomerService')
const CustomerEmailService = require('../../services/CustomerEmailService')

const router = new express.Router({mergeParams: true});

router.post('/customer-password-reset', async (req, res) => {

  try {

    if (!req.body.email) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Customer.findOne({
      'user.email': req.body.email
    })

    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('reset_password.not_found')
      }
    }

    if (!entity.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('reset_password.customer_inactive')
      }
    }

    entity.user.emailResetToken = uuid()

    entity = await entity.save()

    entity = entity.toObject()

    await CustomerEmailService.onPasswordReset(entity)

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/customer-password-set/:token', async (req, res) => {

  try {

    if (!req.params.token) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const count = await Customer.countDocuments({
      'user.emailResetToken': req.params.token
    })

    if (count === 0) {
      throw {
        code: 404,
        message: i18n.t('reset_password.not_found')
      }
    }

    res.status(200).json({
      valid: true
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/customer-password-set/:token', async (req, res) => {

  try {

    if (!(req.params.token && req.body.password)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Customer.findOne({
      'user.emailResetToken': req.params.token
    })

    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('reset_password.not_found')
      }
    }

    if (!entity.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('reset_password.customer_inactive')
      }
    }

    entity.user.emailResetToken = null
    entity.user.password = req.body.password

    entity = await entity.save()

    entity = entity.toObject()

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

