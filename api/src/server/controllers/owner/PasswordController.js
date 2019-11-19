const express = require('express');
const uuid = require('uuid');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Owner = require('../../../database/model/Owner').Owner
const OwnerService = require('../../services/OwnerService')
const OwnerEmailService = require('../../services/OwnerEmailService')

const router = new express.Router({mergeParams: true});

router.post('/owner-password-reset', async (req, res) => {

  try {

    if (!req.body.email) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Owner.findOne({
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
        message: i18n.t('reset_password.owner_inactive')
      }
    }

    entity.user.accessToken = uuid()

    entity = await entity.save()

    entity = entity.toObject()

    await OwnerEmailService.onPasswordReset(entity)

    res.status(201).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/owner-password-set/:token', async (req, res) => {

  try {

    if (!(req.params.token && req.body.password)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    let entity = await Owner.findOne({
      'user.accessToken': req.params.token
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
        message: i18n.t('reset_password.owner_inactive')
      }
    }

    entity.user.accessToken = null
    entity.user.password = req.body.password

    entity = await entity.save()

    entity = entity.toObject()

    res.status(201).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

