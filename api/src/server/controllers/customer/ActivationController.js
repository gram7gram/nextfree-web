const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const Customer = require('../../../database/model/Customer').Customer;

const router = new express.Router({mergeParams: true});

router.post('/customer-activation/:token', async (req, res) => {

  try {

    await Customer.updateOne({
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

