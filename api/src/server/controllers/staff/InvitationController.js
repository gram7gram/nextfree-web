const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const StaffService = require('../../services/StaffService');
const Staff = require('../../../database/model/Staff').Staff;
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/invitation/:token/accept', async (req, res) => {

  try {

    const entity = await Staff.findOne({
      'user.invitationToken': req.params.token
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await StaffService.update(entity, {
      ...req.body
    })

    await Staff.updateOne({'_id': result._id}, {'user.invitationToken': null})

    res.status(200).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/invitation/:token', async (req, res) => {

  try {

    const entity = await Staff.findOne({
      'user.invitationToken': req.params.token
    }).lean()
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

