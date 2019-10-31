const express = require('express');
const isCustomer = require('../../services/AuthService').isCustomer;
const ErrorHandler = require('../../services/ErrorHandler');
const CustomerService = require('../../services/CustomerService');
const Customer = require('../../../database/model/Customer').Customer;

const router = new express.Router({mergeParams: true});

router.post('/profile', isCustomer, async (req, res) => {

  try {

    const entity = await Customer.findById(req.currentUser.user._id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await CustomerService.update(entity, req.body)

    res.status(200).json(CustomerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/profile', isCustomer, async (req, res) => {

  try {

    res.status(200).json(CustomerService.serialize(req.currentUser))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

