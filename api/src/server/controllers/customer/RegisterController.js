const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')

const CustomerService = require('../../services/CustomerService')
const CustomerEmailService = require('../../services/CustomerEmailService')

const router = new express.Router({mergeParams: true});

router.post('/customer-register', async (req, res) => {

  try {

    const {password} = req.body.user

    const entity = await CustomerService.create({
      ...req.body,
      isEnabled: false
    })

    await CustomerService.changePassword(entity, password)

    await CustomerEmailService.onAccountActivation(entity)

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

