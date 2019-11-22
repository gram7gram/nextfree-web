const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const Owner = require('../../../database/model/Owner').Owner;

const router = new express.Router({mergeParams: true});

router.post('/owner-activation/:token', async (req, res) => {

  try {

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

