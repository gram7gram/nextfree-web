const express = require('express');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Owner = require('../../../database/model/Owner').Owner
const isOwner = require('../../services/AuthService').isOwner
const OwnerService = require('../../services/OwnerService')

const router = new express.Router({mergeParams: true});

router.post('/security', isOwner, async (req, res) => {

  try {

    const owner = req.currentUser.user

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Owner.findById(owner._id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    if (!bcrypt.compareSync(currentPassword, entity.user.password)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    entity.user.password = bcrypt.hashSync(newPassword, 10);

    await entity.save()

    res.status(201).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

