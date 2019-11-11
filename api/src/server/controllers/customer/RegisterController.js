const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')

const CustomerService = require('../../services/CustomerService')

const router = new express.Router({mergeParams: true});

router.post('/customer-register', async (req, res) => {

  try {

    const entity = await CustomerService.create({
      ...req.body,
      isEnabled: true
    })

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

