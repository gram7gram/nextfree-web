const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const Staff = require('../../../database/model/Staff').Staff;

const router = new express.Router({mergeParams: true});

router.post('/staff-activation/:token', async (req, res) => {

  try {

    await Staff.updateOne({
      'user.activationToken': req.params.token
    }, {
      'user.activationToken': null,
      'user.isEmailVerified': true,
    })

    res.status(204).json()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

