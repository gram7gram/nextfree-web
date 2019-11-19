const express = require('express');
const uuid = require('uuid');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Staff = require('../../../database/model/Staff').Staff
const StaffService = require('../../services/StaffService')
const StaffEmailService = require('../../services/StaffEmailService')

const router = new express.Router({mergeParams: true});

router.post('/staff-password-reset', async (req, res) => {

  try {

    if (!req.body.email) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Staff.findOne({
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
        message: i18n.t('reset_password.staff_inactive')
      }
    }

    entity.user.emailResetToken = uuid()

    entity = await entity.save()

    entity = entity.toObject()

    await StaffEmailService.onPasswordReset(entity)

    res.status(201).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/staff-password-set/:token', async (req, res) => {

  try {

    if (!(req.params.token && req.body.password)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Staff.findOne({
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
        message: i18n.t('reset_password.staff_inactive')
      }
    }

    entity.user.emailResetToken = null
    entity.user.password = req.body.password

    entity = await entity.save()

    entity = entity.toObject()

    res.status(201).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

