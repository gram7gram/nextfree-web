const express = require('express');
const isCustomer = require('../../services/AuthService').isCustomer;
const ErrorHandler = require('../../services/ErrorHandler');
const CustomerService = require('../../services/CustomerService');
const Customer = require('../../../database/model/Customer').Customer;
const i18n = require('../../../i18n');

const router = new express.Router({mergeParams: true});

router.post('/profile', isCustomer, async (req, res) => {

  try {

    const entity = await Customer.findById(req.currentUser.user._id)
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
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

    const entity = await Customer.findById(req.currentUser.user._id).lean()
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

