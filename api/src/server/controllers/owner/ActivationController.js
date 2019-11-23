const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const Owner = require('../../../database/model/Owner').Owner;
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/owner-activation/:token', async (req, res) => {

  try {

    const entity = await Owner.findOne({
      'user.activationToken': req.params.token
    }).lean()
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    await Owner.updateOne({
      'user.activationToken': req.params.token
    }, {
      'isEnabled': true,
      'user.activationToken': null,
      'user.isEmailVerified': true,
    })

    res.status(204).json()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

